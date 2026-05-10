import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { getAdminAnalytics } from "@/lib/supabase";

// Simple header-based auth for admin
async function checkAdminAuth() {
  const headersList = await headers();
  const adminKey = headersList.get("x-admin-key");
  // In production, use a proper session-based admin system
  return adminKey === process.env.ADMIN_SECRET;
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>;
}) {
  const { key } = await searchParams;

  if (key !== process.env.ADMIN_SECRET) {
    redirect("/");
  }

  let analytics = {
    totalDefinitions: 0,
    trendingTones: [],
    topNames: [],
    recentOrders: [],
  };

  try {
    analytics = await getAdminAnalytics() as any;
  } catch {
    // DB not configured yet
  }

  const statCards = [
    {
      label: "Total Definitions",
      value: analytics.totalDefinitions?.toLocaleString() || "0",
      emoji: "📖",
      sub: "Generated all time",
    },
    {
      label: "Recent Orders",
      value: (analytics.recentOrders as any[])?.length?.toString() || "0",
      emoji: "📦",
      sub: "Last 20 orders",
    },
    {
      label: "Trending Tone",
      value: (analytics.trendingTones as any[])?.[0]?.tone || "—",
      emoji: "🔥",
      sub: "Most popular right now",
    },
    {
      label: "Top Name",
      value: (analytics.topNames as any[])?.[0]?.name || "—",
      emoji: "👑",
      sub: "Most defined name",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold font-display mb-1">
            Defined · Admin Dashboard
          </h1>
          <p className="text-gray-400 text-sm">
            The chaos, quantified.
          </p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {statCards.map((stat) => (
            <div
              key={stat.label}
              className="bg-gray-900 rounded-2xl p-6 border border-gray-800"
            >
              <div className="text-3xl mb-3">{stat.emoji}</div>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm font-semibold text-gray-300 mb-0.5">
                {stat.label}
              </div>
              <div className="text-xs text-gray-500">{stat.sub}</div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Trending tones */}
          <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
            <h2 className="font-bold text-lg mb-4">Trending Tones</h2>
            {(analytics.trendingTones as any[])?.length ? (
              <div className="space-y-3">
                {(analytics.trendingTones as any[]).map((t: any, i) => (
                  <div
                    key={t.tone}
                    className="flex items-center justify-between"
                  >
                    <span className="text-gray-300 text-sm">
                      #{i + 1} {t.tone}
                    </span>
                    <span className="text-gray-500 text-sm">{t.count}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No data yet</p>
            )}
          </div>

          {/* Top names */}
          <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
            <h2 className="font-bold text-lg mb-4">Top Names</h2>
            {(analytics.topNames as any[])?.length ? (
              <div className="space-y-3">
                {(analytics.topNames as any[]).map((n: any, i) => (
                  <div
                    key={n.name}
                    className="flex items-center justify-between"
                  >
                    <span className="text-gray-300 text-sm font-display font-bold">
                      #{i + 1} {n.name}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {n.count} definitions
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No data yet</p>
            )}
          </div>

          {/* Recent orders */}
          <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 md:col-span-2">
            <h2 className="font-bold text-lg mb-4">Recent Orders</h2>
            {(analytics.recentOrders as any[])?.length ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-gray-500 border-b border-gray-800">
                      <th className="text-left pb-3">ID</th>
                      <th className="text-left pb-3">Status</th>
                      <th className="text-left pb-3">Total</th>
                      <th className="text-left pb-3">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {(analytics.recentOrders as any[]).map((order: any) => (
                      <tr key={order.id}>
                        <td className="py-3 text-gray-400 font-mono text-xs">
                          {String(order.id).slice(-8)}
                        </td>
                        <td className="py-3">
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                              order.status === "delivered"
                                ? "bg-green-900 text-green-300"
                                : order.status === "shipped"
                                ? "bg-blue-900 text-blue-300"
                                : "bg-yellow-900 text-yellow-300"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="py-3 text-gray-300">
                          ${Number(order.total || 0).toFixed(2)}
                        </td>
                        <td className="py-3 text-gray-500 text-xs">
                          {order.created_at
                            ? new Date(order.created_at).toLocaleDateString()
                            : "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No orders yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
