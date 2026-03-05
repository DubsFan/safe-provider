"use client";

import { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import type { PublicRateCardView } from "@/types/database.types";

type RateWithId = PublicRateCardView & { id?: string };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapRate(r: any): RateWithId {
  return {
    id: r.id,
    county_slug: r.counties?.slug ?? "",
    county_name: r.counties?.name ?? "",
    service_slug: r.services?.slug ?? "",
    service_name: r.services?.name ?? "",
    intake_per_adult_cents: r.intake_per_adult_cents,
    hourly_rate_cents: r.hourly_rate_cents,
    exchange_fee_cents: r.exchange_fee_cents,
    platform_fee_cents: r.platform_fee_cents,
  };
}

export default function AdminRatesPage() {
  const [rates, setRates] = useState<RateWithId[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const supabase = createSupabaseBrowserClient();
    supabase
      .from("rate_cards")
      .select("id, county_id, service_id, intake_per_adult_cents, hourly_rate_cents, exchange_fee_cents, platform_fee_cents, counties(slug, name), services(slug, name)")
      .order("county_id")
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then(({ data }: { data: any[] | null }) => {
        if (!cancelled) {
          setRates(data ? data.map(mapRate) : []);
          setLoading(false);
        }
      });
    return () => { cancelled = true; };
  }, [refreshKey]);

  const updateRate = async (rateId: string, field: string, dollars: string) => {
    const cents = Math.round(parseFloat(dollars) * 100);
    if (isNaN(cents)) return;

    setSaving(rateId);
    const supabase = createSupabaseBrowserClient();
    await supabase.from("rate_cards").update({ [field]: cents }).eq("id", rateId);
    setRefreshKey((k) => k + 1);
    setSaving(null);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-900 mb-4">Rate Cards</h1>
      <p className="text-sm text-brand-500 mb-6">Edit rates in dollars. Values are saved in cents.</p>

      {loading ? (
        <p className="text-brand-500">Loading...</p>
      ) : (
        <div className="rounded-xl border border-brand-500/20 bg-white shadow-sm overflow-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-brand-500/10 bg-brand-100">
                <th className="text-left p-3 font-semibold text-brand-900">County</th>
                <th className="text-left p-3 font-semibold text-brand-900">Service</th>
                <th className="text-left p-3 font-semibold text-brand-900">Intake/Person</th>
                <th className="text-left p-3 font-semibold text-brand-900">Hourly</th>
                <th className="text-left p-3 font-semibold text-brand-900">Exchange</th>
                <th className="text-left p-3 font-semibold text-brand-900">Platform Fee</th>
              </tr>
            </thead>
            <tbody>
              {rates.map((rate) => (
                <tr key={`${rate.county_slug}-${rate.service_slug}`} className="border-b border-brand-500/5">
                  <td className="p-3 text-brand-900">{rate.county_name}</td>
                  <td className="p-3 text-brand-700">{rate.service_name}</td>
                  {["intake_per_adult_cents", "hourly_rate_cents", "exchange_fee_cents", "platform_fee_cents"].map((field) => (
                    <td key={field} className="p-3">
                      <div className="flex items-center gap-1">
                        <span className="text-brand-500">$</span>
                        <input
                          type="number"
                          step="0.01"
                          defaultValue={(rate[field as keyof PublicRateCardView] as number / 100).toFixed(2)}
                          onBlur={(e) => rate.id && updateRate(rate.id, field, e.target.value)}
                          className="w-20 rounded border border-brand-500/20 px-2 py-1 text-sm text-brand-900"
                          disabled={saving === rate.id}
                        />
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
