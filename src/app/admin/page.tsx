import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { FileText, Package, Users, BarChart3, PlusCircle, ArrowRight } from "lucide-react";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const [
    { count: totalPosts },
    { count: publishedPosts },
    { count: totalProducts },
    { count: totalSubscribers },
    { count: totalClicks },
    { data: recentPosts },
  ] = await Promise.all([
    supabase.from("posts").select("*", { count: "exact", head: true }),
    supabase.from("posts").select("*", { count: "exact", head: true }).eq("status", "published"),
    supabase.from("products").select("*", { count: "exact", head: true }),
    supabase.from("subscribers").select("*", { count: "exact", head: true }),
    supabase.from("clicks").select("*", { count: "exact", head: true }),
    supabase.from("posts").select("id, title, slug, status, updated_at, categories(name, slug)").order("updated_at", { ascending: false }).limit(5),
  ]);

  const stats = [
    { label: "Total Posts", value: totalPosts ?? 0, sub: `${publishedPosts ?? 0} published`, icon: FileText, href: "/admin/posts", color: "text-brand-taupe-dark" },
    { label: "Products", value: totalProducts ?? 0, sub: "affiliate items", icon: Package, href: "/admin/products", color: "text-brand-taupe-dark" },
    { label: "Subscribers", value: totalSubscribers ?? 0, sub: "email leads captured", icon: Users, href: "/admin/subscribers", color: "text-brand-taupe-dark" },
    { label: "Total Clicks", value: totalClicks ?? 0, sub: "affiliate link clicks", icon: BarChart3, href: "/admin/analytics", color: "text-brand-taupe-dark" },
  ];

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-brand-black">Dashboard</h1>
          <p className="text-sm text-brand-charcoal/60 mt-1">Welcome back. Here's what's happening.</p>
        </div>
        <Link href="/admin/posts/new" className="flex items-center gap-2 px-4 py-2.5 bg-brand-black text-brand-cream text-xs font-semibold uppercase tracking-wider rounded-md hover:bg-brand-taupe-dark transition">
          <PlusCircle className="w-4 h-4" /> New Post
        </Link>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map(({ label, value, sub, icon: Icon, href }) => (
          <Link key={label} href={href} className="bg-brand-warmwhite border border-brand-taupe-light rounded-lg p-5 hover:shadow-sm transition-shadow group">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-charcoal/60">{label}</p>
                <p className="font-serif text-3xl font-bold text-brand-black mt-1">{value.toLocaleString()}</p>
                <p className="text-[11px] text-brand-charcoal/50 mt-1">{sub}</p>
              </div>
              <Icon className="w-5 h-5 text-brand-taupe group-hover:text-brand-taupe-dark transition-colors" />
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Posts */}
      <div className="bg-brand-warmwhite border border-brand-taupe-light rounded-lg overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-brand-taupe-light">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-brand-charcoal">Recent Posts</h2>
          <Link href="/admin/posts" className="flex items-center gap-1 text-xs text-brand-taupe-dark hover:text-brand-black transition-colors">
            View all <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="divide-y divide-brand-taupe-light/50">
          {(recentPosts ?? []).map((post: any) => (
            <div key={post.id} className="flex items-center justify-between px-6 py-3.5 hover:bg-brand-cream/50 transition-colors">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-brand-black truncate">{post.title}</p>
                <p className="text-xs text-brand-charcoal/50 mt-0.5">{post.categories?.name} · {new Date(post.updated_at).toLocaleDateString()}</p>
              </div>
              <div className="flex items-center gap-3 ml-4 shrink-0">
                <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                  post.status === "published" ? "border-green-200 text-green-700 bg-green-50" : "border-brand-taupe-light text-brand-charcoal/60 bg-brand-cream"
                }`}>
                  {post.status}
                </span>
                <Link href={`/admin/posts/${post.id}`} className="text-xs text-brand-taupe-dark hover:underline">Edit</Link>
              </div>
            </div>
          ))}
          {!recentPosts?.length && (
            <p className="px-6 py-8 text-center text-sm text-brand-charcoal/50">No posts yet. <Link href="/admin/posts/new" className="text-brand-taupe-dark underline">Create your first post.</Link></p>
          )}
        </div>
      </div>
    </div>
  );
}
