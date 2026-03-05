import { createSupabaseServerClient } from "@/lib/supabase/server";

async function getCount(table: string, column: string, value: string) {
  const supabase = await createSupabaseServerClient();
  const { count } = await supabase
    .from(table)
    .select("*", { count: "exact", head: true })
    .eq(column, value);
  return count ?? 0;
}


export default async function AdminDashboardPage() {
  const [newLeads, pendingPayment, paidLeads, activeCases, pendingPayouts] = await Promise.all([
    getCount("leads", "status", "new"),
    getCount("leads", "status", "payment_pending"),
    getCount("leads", "status", "paid"),
    getCount("cases", "provider_status", "accepted"),
    getCount("payouts", "status", "pending"),
  ]);

  const tiles = [
    { label: "New Leads", value: newLeads, color: "bg-blue-100 text-blue-800" },
    { label: "Pending Payment", value: pendingPayment, color: "bg-amber-100 text-amber-800" },
    { label: "Paid", value: paidLeads, color: "bg-green-100 text-green-800" },
    { label: "Active Cases", value: activeCases, color: "bg-green-100 text-green-800" },
    { label: "Pending Payouts", value: pendingPayouts, color: "bg-amber-100 text-amber-800" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-900 mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {tiles.map((tile) => (
          <div
            key={tile.label}
            className="rounded-xl border border-brand-500/20 bg-white p-6 shadow-sm"
          >
            <p className="text-sm text-brand-500">{tile.label}</p>
            <p className="mt-2 text-3xl font-bold text-brand-900">{tile.value}</p>
            <span className={`mt-2 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${tile.color}`}>
              {tile.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
