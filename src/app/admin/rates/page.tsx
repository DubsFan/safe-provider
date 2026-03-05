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
      <h1 className="text-2xl font-bold text-text-heading mb-4">Rate Cards</h1>
      <p className="text-sm text-text-muted mb-6">Edit rates in dollars. Values are saved in cents.</p>

      {loading ? (
        <p className="text-text-muted">Loading...</p>
      ) : (
        <div className="rounded-xl border border-border-default bg-surface-card shadow-sm overflow-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border-default bg-surface-muted">
                <th className="text-left p-3 font-semibold text-text-heading">County</th>
                <th className="text-left p-3 font-semibold text-text-heading">Service</th>
                <th className="text-left p-3 font-semibold text-text-heading">Intake/Person</th>
                <th className="text-left p-3 font-semibold text-text-heading">Hourly</th>
                <th className="text-left p-3 font-semibold text-text-heading">Exchange</th>
                <th className="text-left p-3 font-semibold text-text-heading">Platform Fee</th>
              </tr>
            </thead>
            <tbody>
              {rates.map((rate) => (
                <tr key={`${rate.county_slug}-${rate.service_slug}`} className="border-b border-border-default">
                  <td className="p-3 text-text-heading">{rate.county_name}</td>
                  <td className="p-3 text-text-body">{rate.service_name}</td>
                  {["intake_per_adult_cents", "hourly_rate_cents", "exchange_fee_cents", "platform_fee_cents"].map((field) => (
                    <td key={field} className="p-3">
                      <div className="flex items-center gap-1">
                        <span className="text-text-muted">$</span>
                        <input
                          type="number"
                          step="0.01"
                          defaultValue={(rate[field as keyof PublicRateCardView] as number / 100).toFixed(2)}
                          onBlur={(e) => rate.id && updateRate(rate.id, field, e.target.value)}
                          className="w-20 rounded border border-border-default px-2 py-1 text-sm text-text-heading"
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
