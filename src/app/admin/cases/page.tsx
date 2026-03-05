"use client";

import { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import type { CaseRow } from "@/types/database.types";

const PROVIDER_STATUS_OPTIONS = ["pending", "accepted", "declined", "scheduled", "completed", "cancelled"];
const STATUS_COLORS: Record<string, string> = {
  pending: "bg-amber-100 text-amber-800",
  accepted: "bg-green-100 text-green-800",
  declined: "bg-red-100 text-red-800",
  scheduled: "bg-green-100 text-green-800",
  completed: "bg-gray-100 text-gray-800",
  cancelled: "bg-gray-100 text-gray-800",
};

export default function AdminCasesPage() {
  const [cases, setCases] = useState<CaseRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const supabase = createSupabaseBrowserClient();
    supabase
      .from("cases")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }: { data: CaseRow[] | null }) => {
        if (!cancelled) {
          setCases(data ?? []);
          setLoading(false);
        }
      });
    return () => { cancelled = true; };
  }, [refreshKey]);

  const updateProviderStatus = async (caseId: string, status: string) => {
    const supabase = createSupabaseBrowserClient();
    await supabase.from("cases").update({ provider_status: status }).eq("id", caseId);
    await supabase.from("event_log").insert({
      entity_type: "case",
      entity_id: caseId,
      event_name: "provider_status_changed",
      payload: { new_status: status },
    });
    setRefreshKey((k) => k + 1);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-900 mb-4">Cases</h1>

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
                <th className="text-left p-3 font-semibold text-brand-900">Date</th>
              </tr>
            </thead>
            <tbody>
              {cases.map((c) => (
                <tr key={c.id} className="border-b border-brand-500/5 hover:bg-brand-100/50">
                  <td className="p-3 text-brand-900 font-mono text-xs">{c.id.slice(0, 8)}</td>
                  <td className="p-3 text-brand-700">{c.county_slug}</td>
                  <td className="p-3 text-brand-700">{c.service_slug}</td>
                  <td className="p-3">
                    <select
                      value={c.provider_status}
                      onChange={(e) => updateProviderStatus(c.id, e.target.value)}
                      className={`rounded-full px-2 py-0.5 text-xs font-medium border-0 ${STATUS_COLORS[c.provider_status] ?? "bg-gray-100 text-gray-800"}`}
                    >
                      {PROVIDER_STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                  <td className="p-3 text-brand-700">${(c.provider_gross_cents / 100).toFixed(2)}</td>
                  <td className="p-3 text-brand-700">${(c.platform_fee_cents / 100).toFixed(2)}</td>
                  <td className="p-3 text-brand-500">{new Date(c.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
              {cases.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-brand-500">No cases found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
