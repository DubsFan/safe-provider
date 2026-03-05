import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { createSupabaseAdmin } from "@/lib/supabase/server";
import { getRateForCountyService, calcStarterPrice } from "@/lib/supabase/rate-cards";
import { createCheckout } from "@/lib/supabase/checkouts";
import { updateLeadStatus } from "@/lib/supabase/leads";
import { env } from "@/lib/env";

export async function POST(request: Request) {
  try {
    const { leadId } = await request.json();
    if (!leadId) {
      return NextResponse.json({ error: "leadId required" }, { status: 400 });
    }

    // Read lead
    const supabase = createSupabaseAdmin();
    const { data: lead, error: leadError } = await supabase
      .from("leads")
      .select("*")
      .eq("id", leadId)
      .single();

    if (leadError || !lead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    // Get pricing — fail explicitly if rate card is missing
    const rate = await getRateForCountyService(lead.county_slug, lead.service_slug);
    if (!rate) {
      console.error(`No rate card for ${lead.county_slug}/${lead.service_slug}`);
      return NextResponse.json({ error: "Pricing unavailable" }, { status: 503 });
    }
    const pricing = calcStarterPrice(rate, lead.adults_count, lead.service_slug);

    const stripe = getStripe();
    const siteUrl = env("NEXT_PUBLIC_SITE_URL");

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: `Intake Fee (${lead.adults_count} adults)` },
            unit_amount: pricing.intake,
          },
          quantity: 1,
        },
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: lead.service_slug === "supervised-visitation"
                ? "First Visit (2 hours)"
                : "First Exchange",
            },
            unit_amount: pricing.service,
          },
          quantity: 1,
        },
        {
          price_data: {
            currency: "usd",
            product_data: { name: "Platform Scheduling Fee" },
            unit_amount: pricing.platform,
          },
          quantity: 1,
        },
      ],
      metadata: {
        lead_id: leadId,
        county_slug: lead.county_slug,
        service_slug: lead.service_slug,
      },
      customer_email: lead.email,
      success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/checkout/cancel`,
    });

    // Save checkout to DB (before redirect)
    await createCheckout({
      lead_id: leadId,
      stripe_session_id: session.id,
      stripe_payment_intent_id: null,
      intake_cents: pricing.intake,
      service_cents: pricing.service,
      platform_fee_cents: pricing.platform,
      total_cents: pricing.total,
      payment_status: "created",
    });

    // Update lead status
    await updateLeadStatus(leadId, "payment_pending");

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.json({ error: "Failed to create checkout" }, { status: 500 });
  }
}
