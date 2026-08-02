import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { PlusCircle, Edit, Eye, Trash2 } from "lucide-react";

export default async function AdminPostsPage() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from("posts")
    .select("id, title, slug, status, featured, updated_at, categories(name, slug)")
    .order("updated_at", { ascending: false });

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-brand-black">Posts</h1>
          <p className="text-sm text-brand-charcoal/60 mt-1">{posts?.length ?? 0} total posts</p>
        </div>
        <Link href="/admin/posts/new" className="flex items-center gap-2 px-4 py-2.5 bg-brand-black text-brand-cream text-xs font-semibold uppercase tracking-wider rounded-md hover:bg-brand-taupe-dark transition">
          <PlusCircle className="w-4 h-4" /> New Post
        </Link>
      </div>

      <div className="bg-brand-warmwhite border border-brand-taupe-light rounded-lg overflow-hidden">
        <div className="grid grid-cols-12 px-6 py-3 border-b border-brand-taupe-light bg-brand-cream/50 text-[10px] font-semibold uppercase tracking-widest text-brand-charcoal/60">
          <span className="col-span-5">Title</span>
          <span className="col-span-2">Category</span>
          <span className="col-span-2">Status</span>
          <span className="col-span-2">Updated</span>
          <span className="col-span-1 text-right">Actions</span>
        </div>
        <div className="divide-y divide-brand-taupe-light/40">
          {(posts ?? []).map((post: any) => (
            <div key={post.id} className="grid grid-cols-12 px-6 py-4 items-center hover:bg-brand-cream/30 transition-colors">
              <div className="col-span-5 min-w-0 pr-4">
                <p className="text-sm font-medium text-brand-black truncate">{post.title}</p>
                <p className="text-[11px] text-brand-charcoal/50 font-mono mt-0.5 truncate">/blog/{post.categories?.slug}/{post.slug}</p>
              </div>
              <div className="col-span-2">
                <span className="text-xs text-brand-charcoal/70">{post.categories?.name ?? "—"}</span>
              </div>
              <div className="col-span-2">
                <span className={`inline-flex items-center text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                  post.status === "published" ? "border-green-200 text-green-700 bg-green-50" : "border-brand-taupe-light text-brand-charcoal/60 bg-brand-cream"
                }`}>
                  {post.status}
                  {post.featured && <span className="ml-1 text-amber-500">★</span>}
                </span>
              </div>
              <div className="col-span-2">
                <span className="text-xs text-brand-charcoal/60">{new Date(post.updated_at).toLocaleDateString()}</span>
              </div>
              <div className="col-span-1 flex items-center justify-end gap-2">
                <Link href={`/blog/${post.categories?.slug}/${post.slug}`} target="_blank" className="text-brand-charcoal/40 hover:text-brand-black transition-colors" title="View post">
                  <Eye className="w-3.5 h-3.5" />
                </Link>
                <Link href={`/admin/posts/${post.id}`} className="text-brand-charcoal/40 hover:text-brand-black transition-colors" title="Edit post">
                  <Edit className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
          {!posts?.length && (
            <div className="px-6 py-12 text-center">
              <p className="text-sm text-brand-charcoal/50">No posts yet.</p>
              <Link href="/admin/posts/new" className="text-xs text-brand-taupe-dark underline mt-2 inline-block">Create your first post →</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
