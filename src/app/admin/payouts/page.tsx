"use client";

import { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import type { AdminPayoutQueueView } from "@/types/database.types";

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-amber-100 text-amber-800",
  sent: "bg-green-100 text-green-800",
  confirmed: "bg-green-100 text-green-800",
};

export default function AdminPayoutsPage() {
  const [payouts, setPayouts] = useState<AdminPayoutQueueView[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const supabase = createSupabaseBrowserClient();
    supabase
      .from("admin_payout_queue")
      .select("*")
      .order("case_created_at", { ascending: false })
      .then(({ data }: { data: AdminPayoutQueueView[] | null }) => {
        if (!cancelled) {
          setPayouts(data ?? []);
          setLoading(false);
        }
      });
    return () => { cancelled = true; };
  }, [refreshKey]);

  const markSent = async (caseId: string) => {
    const supabase = createSupabaseBrowserClient();
    const { data: existing } = await supabase
      .from("payouts")
      .select("id")
      .eq("case_id", caseId)
      .single();

    if (existing) {
      await supabase
        .from("payouts")
        .update({ status: "sent", sent_at: new Date().toISOString() })
        .eq("case_id", caseId);
    } else {
      const payout = payouts.find((p) => p.case_id === caseId);
      if (payout) {
        await supabase.from("payouts").insert({
          case_id: caseId,
          amount_cents: payout.provider_gross_cents,
          status: "sent",
          sent_at: new Date().toISOString(),
        });
      }
    }
    setRefreshKey((k) => k + 1);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-900 mb-4">Payouts</h1>

      {loading ? (
        <p className="text-brand-500">Loading...</p>
      ) : (
        <div className="rounded-xl border border-brand-500/20 bg-white shadow-sm overflow-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-brand-500/10 bg-brand-100">
                <th className="text-left p-3 font-semibold text-brand-900">Case ID</th>
                <th className="text-left p-3 font-semibold text-brand-900">County</th>
                <th className="text-left p-3 font-semibold text-brand-900">Service</th>
                <th className="text-left p-3 font-semibold text-brand-900">Provider Status</th>
                <th className="text-left p-3 font-semibold text-brand-900">Provider Gross</th>
                <th className="text-left p-3 font-semibold text-brand-900">Platform Fee</th>
                <th className="text-left p-3 font-semibold text-brand-900">Payout Status</th>
                <th className="text-left p-3 font-semibold text-brand-900">Action</th>
              </tr>
            </thead>
            <tbody>
              {payouts.map((p) => (
                <tr key={p.case_id} className="border-b border-brand-500/5 hover:bg-brand-100/50">
                  <td className="p-3 text-brand-900 font-mono text-xs">{p.case_id.slice(0, 8)}</td>
                  <td className="p-3 text-brand-700">{p.county_slug}</td>
                  <td className="p-3 text-brand-700">{p.service_slug}</td>
                  <td className="p-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_COLORS[p.provider_status] ?? "bg-gray-100 text-gray-800"}`}>
                      {p.provider_status}
                    </span>
                  </td>
                  <td className="p-3 text-brand-700">${(p.provider_gross_cents / 100).toFixed(2)}</td>
                  <td className="p-3 text-brand-700">${(p.platform_fee_cents / 100).toFixed(2)}</td>
                  <td className="p-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_COLORS[p.payout_status ?? "pending"] ?? "bg-gray-100 text-gray-800"}`}>
                      {p.payout_status ?? "not created"}
                    </span>
                  </td>
                  <td className="p-3">
                    {(!p.payout_status || p.payout_status === "pending") && (
                      <button
                        onClick={() => markSent(p.case_id)}
                        className="rounded-lg bg-accent-600 px-3 py-1 text-xs font-semibold text-white hover:bg-accent-500 transition-colors"
                      >
                        Mark Sent
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {payouts.length === 0 && (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-brand-500">No payouts found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
