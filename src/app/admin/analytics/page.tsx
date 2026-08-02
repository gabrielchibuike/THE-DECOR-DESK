import AnalyticsCharts from "@/components/admin/AnalyticsCharts";
import { createClient } from "@/lib/supabase/server";

export default async function AdminAnalyticsPage() {
  const supabase = await createClient();

  const [
    { data: topProducts },
    { data: recentClicks },
    { data: topPosts },
    { data: subscribersByDay },
  ] = await Promise.all([
    supabase.from("products").select("id, name, click_count").order("click_count", { ascending: false }).limit(10),
    supabase.from("clicks").select("clicked_at").gte("clicked_at", new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()),
    supabase.from("posts").select("title, slug, status, categories(slug)").eq("status", "published").order("published_at", { ascending: false }).limit(10),
    supabase.from("subscribers").select("created_at").gte("created_at", new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()),
  ]);

  // Build clicks per day for chart
  const clicksByDay: Record<string, number> = {};
  (recentClicks ?? []).forEach((c: any) => {
    const day = c.clicked_at.split("T")[0];
    clicksByDay[day] = (clicksByDay[day] ?? 0) + 1;
  });

  const subsByDay: Record<string, number> = {};
  (subscribersByDay ?? []).forEach((s: any) => {
    const day = s.created_at.split("T")[0];
    subsByDay[day] = (subsByDay[day] ?? 0) + 1;
  });

  // Fill last 30 days
  const last30Days = Array.from({ length: 30 }, (_, i) => {
    const d = new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000);
    const key = d.toISOString().split("T")[0];
    return { date: key, clicks: clicksByDay[key] ?? 0, subscribers: subsByDay[key] ?? 0 };
  });

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-10">
      <h1 className="font-serif text-3xl font-bold text-brand-black">Analytics</h1>

      <AnalyticsCharts
        chartData={last30Days}
        topProducts={topProducts ?? []}
        topPosts={topPosts ?? []}
      />
    </div>
  );
}
