import { createSupabaseAdmin } from "./server";
import type { CheckoutInsert, CaseInsert } from "@/types/database.types";

export async function createCheckout(data: CheckoutInsert): Promise<{ id: string }> {
  const supabase = createSupabaseAdmin();
  const { data: checkout, error } = await supabase
    .from("checkouts")
    .insert(data)
    .select("id")
    .single();
  if (error) throw new Error(`Failed to create checkout: ${error.message}`);
  return { id: checkout.id };
}

export async function markCheckoutComplete(
  stripeSessionId: string,
  paymentIntentId: string
) {
  const supabase = createSupabaseAdmin();
  // Idempotent: only update if payment_status is 'created'
  const { data, error } = await supabase
    .from("checkouts")
    .update({
      payment_status: "completed",
      stripe_payment_intent_id: paymentIntentId,
    })
    .eq("stripe_session_id", stripeSessionId)
    .eq("payment_status", "created")
    .select("id, lead_id, total_cents, platform_fee_cents")
    .single();

  if (error && error.code !== "PGRST116") {
    throw new Error(`Failed to mark checkout complete: ${error.message}`);
  }

  return data;
}

export async function createCase(
  leadId: string,
  data: Omit<CaseInsert, "lead_id">
): Promise<{ id: string }> {
  const supabase = createSupabaseAdmin();
  const { data: caseRow, error } = await supabase
    .from("cases")
    .insert({ ...data, lead_id: leadId })
    .select("id")
    .single();
  if (error) throw new Error(`Failed to create case: ${error.message}`);
  return { id: caseRow.id };
}
