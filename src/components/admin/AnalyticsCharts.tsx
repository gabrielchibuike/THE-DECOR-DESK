"use client";

import Link from "next/link";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend,
} from "recharts";

interface ChartDataPoint { date: string; clicks: number; subscribers: number; }

export default function AnalyticsCharts({
  chartData,
  topProducts,
  topPosts,
}: {
  chartData: ChartDataPoint[];
  topProducts: any[];
  topPosts: any[];
}) {
  const totalClicks = chartData.reduce((s, d) => s + d.clicks, 0);
  const totalSubs = chartData.reduce((s, d) => s + d.subscribers, 0);

  return (
    <div className="space-y-10">
      {/* Stat Row */}
      <div className="grid grid-cols-2 gap-5">
        <div className="bg-brand-warmwhite border border-brand-taupe-light rounded-lg p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-charcoal/60">Clicks (30 days)</p>
          <p className="font-serif text-4xl font-bold text-brand-black mt-1">{totalClicks}</p>
        </div>
        <div className="bg-brand-warmwhite border border-brand-taupe-light rounded-lg p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-charcoal/60">New Subscribers (30 days)</p>
          <p className="font-serif text-4xl font-bold text-brand-black mt-1">{totalSubs}</p>
        </div>
      </div>

      {/* Clicks over time */}
      <div className="bg-brand-warmwhite border border-brand-taupe-light rounded-lg p-6 space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-brand-charcoal">Affiliate Clicks — Last 30 Days</h2>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="clickGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#a89880" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#a89880" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e8e0d6" />
            <XAxis dataKey="date" tick={{ fontSize: 9, fill: "#6b6560" }} tickFormatter={(v) => v.slice(5)} interval={4} />
            <YAxis tick={{ fontSize: 9, fill: "#6b6560" }} allowDecimals={false} />
            <Tooltip contentStyle={{ fontSize: 11, borderColor: "#d4c8bb" }} />
            <Area type="monotone" dataKey="clicks" stroke="#8c7b6a" fill="url(#clickGrad)" strokeWidth={2} dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Subscribers over time */}
      <div className="bg-brand-warmwhite border border-brand-taupe-light rounded-lg p-6 space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-brand-charcoal">New Subscribers — Last 30 Days</h2>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e8e0d6" />
            <XAxis dataKey="date" tick={{ fontSize: 9, fill: "#6b6560" }} tickFormatter={(v) => v.slice(5)} interval={4} />
            <YAxis tick={{ fontSize: 9, fill: "#6b6560" }} allowDecimals={false} />
            <Tooltip contentStyle={{ fontSize: 11, borderColor: "#d4c8bb" }} />
            <Bar dataKey="subscribers" fill="#c5b8a8" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Products */}
        <div className="bg-brand-warmwhite border border-brand-taupe-light rounded-lg overflow-hidden">
          <div className="px-5 py-3 border-b border-brand-taupe-light bg-brand-cream/50">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-brand-charcoal">Top Products by Clicks</h2>
          </div>
          <div className="divide-y divide-brand-taupe-light/40">
            {topProducts.map((p: any, idx) => (
              <div key={p.id} className="flex items-center justify-between px-5 py-3.5">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-brand-charcoal/40 w-4">{idx + 1}</span>
                  <span className="text-sm font-medium text-brand-black">{p.name}</span>
                </div>
                <span className="font-serif text-lg font-bold text-brand-taupe-dark">{p.click_count ?? 0}</span>
              </div>
            ))}
            {topProducts.length === 0 && <p className="px-5 py-8 text-sm text-center text-brand-charcoal/40">No clicks tracked yet.</p>}
          </div>
        </div>

        {/* Top Posts */}
        <div className="bg-brand-warmwhite border border-brand-taupe-light rounded-lg overflow-hidden">
          <div className="px-5 py-3 border-b border-brand-taupe-light bg-brand-cream/50">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-brand-charcoal">Published Posts</h2>
          </div>
          <div className="divide-y divide-brand-taupe-light/40">
            {topPosts.map((p: any, idx) => (
              <div key={p.slug} className="flex items-center justify-between px-5 py-3.5">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-xs font-mono text-brand-charcoal/40 w-4 shrink-0">{idx + 1}</span>
                  <Link href={`/blog/${p.categories?.slug}/${p.slug}`} target="_blank" className="text-sm font-medium text-brand-black hover:underline truncate">{p.title}</Link>
                </div>
                <span className="text-[10px] text-green-600 font-semibold uppercase tracking-wider shrink-0 ml-3">Live</span>
              </div>
            ))}
            {topPosts.length === 0 && <p className="px-5 py-8 text-sm text-center text-brand-charcoal/40">No published posts yet.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
