import { getPublicRates, centsToUSD } from "@/lib/supabase/rate-cards";
import { FALLBACK_RATES } from "@/lib/site-config";

export async function PricingTable() {
  const rates = await getPublicRates();

  // Group by service
  const visitationRates = rates.filter((r) => r.service_slug === "supervised-visitation");
  const exchangeRates = rates.filter((r) => r.service_slug === "supervised-exchange");

  // Use first rate or fallback
  const vRate = visitationRates[0] ?? null;
  const eRate = exchangeRates[0] ?? null;

  const intake = vRate?.intake_per_adult_cents ?? FALLBACK_RATES.intake_per_adult_cents;
  const hourly = vRate?.hourly_rate_cents ?? FALLBACK_RATES.hourly_rate_cents;
  const exchange = eRate?.exchange_fee_cents ?? FALLBACK_RATES.exchange_fee_cents;
  const platform = vRate?.platform_fee_cents ?? FALLBACK_RATES.platform_fee_cents;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Supervised Visitation */}
      <div className="rounded-xl border border-border-default bg-surface-card p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-text-heading mb-4">Supervised Visitation</h3>
        <ul className="space-y-3 text-text-body">
          <li className="flex justify-between">
            <span>Intake (per person)</span>
            <span className="font-semibold text-text-heading">{centsToUSD(intake)}</span>
          </li>
          <li className="flex justify-between">
            <span>Hourly rate</span>
            <span className="font-semibold text-text-heading">{centsToUSD(hourly)}</span>
          </li>
          <li className="flex justify-between text-sm text-text-muted">
            <span>Minimum 2 hours per visit</span>
            <span></span>
          </li>
          <li className="flex justify-between border-t border-border-default pt-3">
            <span>Platform fee (per case)</span>
            <span className="font-semibold text-text-heading">{centsToUSD(platform)}</span>
          </li>
        </ul>
      </div>

      {/* Supervised Exchange */}
      <div className="rounded-xl border border-border-default bg-surface-card p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-text-heading mb-4">Supervised Exchange</h3>
        <ul className="space-y-3 text-text-body">
          <li className="flex justify-between">
            <span>Intake (per person)</span>
            <span className="font-semibold text-text-heading">{centsToUSD(intake)}</span>
          </li>
          <li className="flex justify-between">
            <span>Per exchange</span>
            <span className="font-semibold text-text-heading">{centsToUSD(exchange)}</span>
          </li>
          <li className="flex justify-between border-t border-border-default pt-3">
            <span>Platform fee (per case)</span>
            <span className="font-semibold text-text-heading">{centsToUSD(platform)}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
