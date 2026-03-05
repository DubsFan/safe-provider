import { createSupabaseAdmin } from "./server";
import type { LeadInsert } from "@/types/database.types";

export async function createLead(data: LeadInsert): Promise<{ id: string }> {
  const supabase = createSupabaseAdmin();
  const { data: lead, error } = await supabase
    .from("leads")
    .insert(data)
    .select("id")
    .single();
  if (error) throw new Error(`Failed to create lead: ${error.message}`);
  return { id: lead.id };
}

export async function updateLeadStatus(leadId: string, status: string) {
  const supabase = createSupabaseAdmin();
  const { error } = await supabase
    .from("leads")
    .update({ status })
    .eq("id", leadId);
  if (error) throw new Error(`Failed to update lead status: ${error.message}`);
}

export async function logEvent(
  entityType: string,
  entityId: string,
  eventName: string,
  payload: Record<string, unknown>
) {
  const supabase = createSupabaseAdmin();
  // Strip PII from payload
  const safePayload = { ...payload };
  delete safePayload.email;
  delete safePayload.phone;
  delete safePayload.petitioner_first;
  delete safePayload.petitioner_last;
  delete safePayload.respondent_first;
  delete safePayload.respondent_last;

  await supabase.from("event_log").insert({
    entity_type: entityType,
    entity_id: entityId,
    event_name: eventName,
    payload: safePayload,
  });
}
