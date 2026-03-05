import { createSupabaseServerClient } from "./server";
import type { PublicRateCardView } from "@/types/database.types";
import { FALLBACK_RATES } from "@/lib/site-config";

export async function getPublicRates(): Promise<PublicRateCardView[]> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("public_rate_cards")
    .select("*");
  return data ?? [];
}

export async function getRatesForCounty(countySlug: string): Promise<PublicRateCardView[]> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("public_rate_cards")
    .select("*")
    .eq("county_slug", countySlug);
  return data ?? [];
}

export async function getRateForCountyService(
  countySlug: string,
  serviceSlug: string
): Promise<PublicRateCardView | null> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("public_rate_cards")
    .select("*")
    .eq("county_slug", countySlug)
    .eq("service_slug", serviceSlug)
    .single();
  return data;
}

export function calcStarterPrice(
  rate: PublicRateCardView | null,
  adultsCount: number,
  serviceSlug: string
): { intake: number; service: number; platform: number; total: number } {
  const r = rate ?? {
    intake_per_adult_cents: FALLBACK_RATES.intake_per_adult_cents,
    hourly_rate_cents: FALLBACK_RATES.hourly_rate_cents,
    exchange_fee_cents: FALLBACK_RATES.exchange_fee_cents,
    platform_fee_cents: FALLBACK_RATES.platform_fee_cents,
  };

  const intake = r.intake_per_adult_cents * adultsCount;
  const service =
    serviceSlug === "supervised-visitation"
      ? r.hourly_rate_cents * 2 // 2-hour minimum
      : r.exchange_fee_cents;
  const platform = r.platform_fee_cents;
  const total = intake + service + platform;

  return { intake, service, platform, total };
}

export function centsToUSD(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}
