import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { env } from "@/lib/env";
import { markCheckoutComplete, createCase } from "@/lib/supabase/checkouts";
import { updateLeadStatus, logEvent } from "@/lib/supabase/leads";
import { createSupabaseAdmin } from "@/lib/supabase/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    const stripe = getStripe();
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      env("STRIPE_WEBHOOK_SECRET")
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    // Validate metadata before processing
    const metadata = session.metadata ?? {};
    if (!metadata.county_slug || !metadata.service_slug || !metadata.lead_id) {
      console.error("Webhook missing required metadata", { sessionId: session.id });
      return NextResponse.json({ received: true });
    }

    // Idempotent: only processes if payment_status = 'created'
    const checkout = await markCheckoutComplete(
      session.id,
      typeof session.payment_intent === "string"
        ? session.payment_intent
        : session.payment_intent?.id ?? ""
    );

    // If checkout is null, it was already processed (idempotent guard)
    if (checkout) {
      const leadId = checkout.lead_id;
      const platformFee = checkout.platform_fee_cents ?? 9900;

      // Check if case already exists (crash recovery)
      const supabase = createSupabaseAdmin();
      const { data: existingCase } = await supabase
        .from("cases")
        .select("id")
        .eq("checkout_id", checkout.id)
        .maybeSingle();

      if (!existingCase) {
        await createCase(leadId, {
          checkout_id: checkout.id,
          county_slug: metadata.county_slug,
          service_slug: metadata.service_slug,
          provider_status: "pending",
          provider_share_policy: "full_provider_amount",
          provider_gross_cents: checkout.total_cents - platformFee,
          platform_fee_cents: platformFee,
          notes: null,
        });
      }

      // Update lead status AFTER case creation succeeds
      await updateLeadStatus(leadId, "paid");

      await logEvent("checkout", checkout.id, "checkout_completed", {
        total_cents: checkout.total_cents,
      });

      // Send email notification (non-blocking)
      try {
        const resend = new Resend(env("RESEND_API_KEY"));
        await resend.emails.send({
          from: "SafeProvider <notifications@safeprovider.org>",
          to: env("ADMIN_EMAIL"),
          subject: `ACTION REQUIRED: New Paid Intake - ${metadata.county_slug} ${metadata.service_slug}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px;">
              <div style="background: #1F9E9E; color: #ffffff; padding: 16px; text-align: center; font-weight: bold;">
                ACTION REQUIRED: New Paid Intake
              </div>
              <div style="padding: 24px; background: #ffffff;">
                <p><strong>Lead ID:</strong> ${leadId}</p>
                <p><strong>County:</strong> ${metadata.county_slug}</p>
                <p><strong>Service:</strong> ${metadata.service_slug}</p>
                <p><strong>Total Paid:</strong> $${(checkout.total_cents / 100).toFixed(2)}</p>
                <p style="margin-top: 16px;">Log in to the admin dashboard to review and accept or decline this case.</p>
              </div>
            </div>
          `,
        });
      } catch (emailErr) {
        // Email failure must not block payment capture
        console.error("Email notification failed:", emailErr);
      }
    }
  }

  return NextResponse.json({ received: true });
}
