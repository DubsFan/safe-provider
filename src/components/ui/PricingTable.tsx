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
      <div className="rounded-xl border border-brand-500/20 bg-white p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-brand-900 mb-4">Supervised Visitation</h3>
        <ul className="space-y-3 text-brand-700">
          <li className="flex justify-between">
            <span>Intake (per person)</span>
            <span className="font-semibold text-brand-900">{centsToUSD(intake)}</span>
          </li>
          <li className="flex justify-between">
            <span>Hourly rate</span>
            <span className="font-semibold text-brand-900">{centsToUSD(hourly)}</span>
          </li>
          <li className="flex justify-between text-sm text-brand-500">
            <span>Minimum 2 hours per visit</span>
            <span></span>
          </li>
          <li className="flex justify-between border-t border-brand-500/20 pt-3">
            <span>Platform fee (per case)</span>
            <span className="font-semibold text-brand-900">{centsToUSD(platform)}</span>
          </li>
        </ul>
      </div>

      {/* Supervised Exchange */}
      <div className="rounded-xl border border-brand-500/20 bg-white p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-brand-900 mb-4">Supervised Exchange</h3>
        <ul className="space-y-3 text-brand-700">
          <li className="flex justify-between">
            <span>Intake (per person)</span>
            <span className="font-semibold text-brand-900">{centsToUSD(intake)}</span>
          </li>
          <li className="flex justify-between">
            <span>Per exchange</span>
            <span className="font-semibold text-brand-900">{centsToUSD(exchange)}</span>
          </li>
          <li className="flex justify-between border-t border-brand-500/20 pt-3">
            <span>Platform fee (per case)</span>
            <span className="font-semibold text-brand-900">{centsToUSD(platform)}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
