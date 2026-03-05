export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://safeprovider.org";
export const SITE_NAME = "SafeProvider";
export const SITE_DESCRIPTION =
  "Court-compliant supervised visitation and exchange intake. Start online, pay securely, SafePair handles the rest.";
export const PHONE = "(408) 418-7474";
export const EMAIL = "gg@oog.life";

export const COUNTIES = [
  { slug: "santa-clara", name: "Santa Clara County", status: "live" as const, noindex: false, sortOrder: 1 },
  { slug: "alameda", name: "Alameda County", status: "live" as const, noindex: false, sortOrder: 2 },
  { slug: "contra-costa", name: "Contra Costa County", status: "live" as const, noindex: false, sortOrder: 3 },
  { slug: "san-francisco", name: "San Francisco County", status: "live" as const, noindex: false, sortOrder: 4 },
  { slug: "marin", name: "Marin County", status: "draft" as const, noindex: true, sortOrder: 5 },
] as const;

export const SERVICES = [
  { slug: "supervised-visitation", name: "Supervised Visitation", minHours: 2 },
  { slug: "supervised-exchange", name: "Supervised Exchange", minHours: 0 },
] as const;

export const FALLBACK_RATES = {
  intake_per_adult_cents: 5000,
  hourly_rate_cents: 7000,
  exchange_fee_cents: 7000,
  platform_fee_cents: 9900,
};
