"use client";

import { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import type { AdminLeadSummaryView } from "@/types/database.types";

const STATUS_OPTIONS = ["all", "new", "contacted", "payment_pending", "paid", "accepted", "declined", "cancelled"];
const STATUS_COLORS: Record<string, string> = {
  new: "bg-blue-100 text-blue-800",
  contacted: "bg-blue-100 text-blue-800",
  payment_pending: "bg-amber-100 text-amber-800",
  paid: "bg-green-100 text-green-800",
  accepted: "bg-green-100 text-green-800",
  declined: "bg-red-100 text-red-800",
  cancelled: "bg-gray-100 text-gray-800",
};

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<AdminLeadSummaryView[]>([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const supabase = createSupabaseBrowserClient();
    let query = supabase
      .from("admin_lead_summary")
      .select("*")
      .order("created_at", { ascending: false });
    if (filter !== "all") {
      query = query.eq("status", filter);
    }
    query.then(({ data }: { data: AdminLeadSummaryView[] | null }) => {
      if (!cancelled) {
        setLeads(data ?? []);
        setLoading(false);
      }
    });
    return () => { cancelled = true; };
  }, [filter, refreshKey]);

  const updateStatus = async (leadId: string, status: string) => {
    const supabase = createSupabaseBrowserClient();
    await supabase.from("leads").update({ status }).eq("id", leadId);
    await supabase.from("event_log").insert({
      entity_type: "lead",
      entity_id: leadId,
      event_name: "status_changed",
      payload: { new_status: status },
    });
    setRefreshKey((k) => k + 1);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-heading mb-4">Leads</h1>

      <div className="mb-4 flex gap-2 flex-wrap">
        {STATUS_OPTIONS.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
              filter === s ? "bg-accent-600 text-white" : "bg-surface-card text-text-body border border-border-default"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-text-muted">Loading...</p>
      ) : (
        <div className="rounded-xl border border-border-default bg-surface-card shadow-sm overflow-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border-default bg-surface-muted">
                <th className="text-left p-3 font-semibold text-text-heading">Name</th>
                <th className="text-left p-3 font-semibold text-text-heading">County</th>
                <th className="text-left p-3 font-semibold text-text-heading">Service</th>
                <th className="text-left p-3 font-semibold text-text-heading">Email</th>
                <th className="text-left p-3 font-semibold text-text-heading">Status</th>
                <th className="text-left p-3 font-semibold text-text-heading">Payment</th>
                <th className="text-left p-3 font-semibold text-text-heading">Date</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-b border-border-default hover:bg-surface-muted/50">
                  <td className="p-3 text-text-heading">{lead.petitioner_first} {lead.petitioner_last}</td>
                  <td className="p-3 text-text-body">{lead.county_slug}</td>
                  <td className="p-3 text-text-body">{lead.service_slug}</td>
                  <td className="p-3 text-text-body">{lead.email}</td>
                  <td className="p-3">
                    <select
                      value={lead.status}
                      onChange={(e) => updateStatus(lead.id, e.target.value)}
                      className={`rounded-full px-2 py-0.5 text-xs font-medium border-0 ${STATUS_COLORS[lead.status] ?? "bg-gray-100 text-gray-800"}`}
                    >
                      {STATUS_OPTIONS.filter((s) => s !== "all").map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                  <td className="p-3 text-text-body">
                    {lead.total_cents ? `$${(lead.total_cents / 100).toFixed(2)}` : "-"}
                  </td>
                  <td className="p-3 text-text-muted">{new Date(lead.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
              {leads.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-text-muted">No leads found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
