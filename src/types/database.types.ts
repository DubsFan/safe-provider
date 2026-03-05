// Row types for all 8 tables

export type CountyRow = {
  id: string;
  slug: string;
  name: string;
  courthouse_name: string | null;
  courthouse_address: string | null;
  court_source_url: string | null;
  local_note: string | null;
  launch_status: "live" | "draft" | "archived";
  noindex: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type ServiceRow = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  min_hours: number;
  active: boolean;
  created_at: string;
  updated_at: string;
};

export type RateCardRow = {
  id: string;
  county_id: string;
  service_id: string;
  intake_per_adult_cents: number;
  hourly_rate_cents: number;
  exchange_fee_cents: number;
  platform_fee_cents: number;
  effective_date: string;
  created_at: string;
  updated_at: string;
};

export type LeadRow = {
  id: string;
  county_slug: string;
  service_slug: string;
  petitioner_first: string;
  petitioner_last: string;
  respondent_first: string | null;
  respondent_last: string | null;
  email: string;
  phone: string;
  adults_count: number;
  has_court_order: boolean;
  court_order_notes: string | null;
  preferred_schedule: string | null;
  status: "new" | "contacted" | "payment_pending" | "paid" | "accepted" | "declined" | "cancelled";
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  created_at: string;
  updated_at: string;
};

export type CheckoutRow = {
  id: string;
  lead_id: string;
  stripe_session_id: string;
  stripe_payment_intent_id: string | null;
  intake_cents: number;
  service_cents: number;
  platform_fee_cents: number;
  total_cents: number;
  payment_status: "created" | "completed" | "failed" | "refunded";
  created_at: string;
  updated_at: string;
};

export type CaseRow = {
  id: string;
  lead_id: string;
  checkout_id: string | null;
  county_slug: string;
  service_slug: string;
  provider_status: "pending" | "accepted" | "declined" | "scheduled" | "completed" | "cancelled";
  provider_share_policy: "full_provider_amount" | "eighty_twenty_share";
  provider_gross_cents: number;
  platform_fee_cents: number;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export type PayoutRow = {
  id: string;
  case_id: string;
  amount_cents: number;
  status: "pending" | "sent" | "confirmed";
  sent_at: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export type EventLogRow = {
  id: string;
  entity_type: string;
  entity_id: string;
  event_name: string;
  payload: Record<string, unknown>;
  created_at: string;
};

// Insert types (omit auto-generated fields)
export type LeadInsert = Omit<LeadRow, "id" | "created_at" | "updated_at" | "status" | "respondent_first" | "respondent_last" | "court_order_notes" | "preferred_schedule" | "utm_source" | "utm_medium" | "utm_campaign" | "utm_content" | "utm_term"> & {
  status?: LeadRow["status"];
  respondent_first?: string | null;
  respondent_last?: string | null;
  court_order_notes?: string | null;
  preferred_schedule?: string | null;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  utm_content?: string | null;
  utm_term?: string | null;
};
export type CheckoutInsert = Omit<CheckoutRow, "id" | "created_at" | "updated_at">;
export type CaseInsert = Omit<CaseRow, "id" | "created_at" | "updated_at">;
export type PayoutInsert = Omit<PayoutRow, "id" | "created_at" | "updated_at">;

// Update types
export type LeadUpdate = Partial<Omit<LeadRow, "id" | "created_at">>;
export type CheckoutUpdate = Partial<Omit<CheckoutRow, "id" | "created_at">>;
export type CaseUpdate = Partial<Omit<CaseRow, "id" | "created_at">>;
export type PayoutUpdate = Partial<Omit<PayoutRow, "id" | "created_at">>;

// View types
export type PublicRateCardView = {
  county_slug: string;
  county_name: string;
  service_slug: string;
  service_name: string;
  intake_per_adult_cents: number;
  hourly_rate_cents: number;
  exchange_fee_cents: number;
  platform_fee_cents: number;
};

export type AdminLeadSummaryView = {
  id: string;
  county_slug: string;
  service_slug: string;
  petitioner_first: string;
  petitioner_last: string;
  email: string;
  phone: string;
  status: LeadRow["status"];
  total_cents: number | null;
  payment_status: CheckoutRow["payment_status"] | null;
  created_at: string;
};

export type AdminPayoutQueueView = {
  case_id: string;
  county_slug: string;
  service_slug: string;
  provider_status: CaseRow["provider_status"];
  provider_gross_cents: number;
  platform_fee_cents: number;
  payout_status: PayoutRow["status"] | null;
  payout_amount_cents: number | null;
  case_created_at: string;
};
