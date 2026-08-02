import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { PlusCircle, Edit } from "lucide-react";
import CategoryForm from "@/components/admin/CategoryForm";

export default async function AdminCategoriesPage() {
  const supabase = await createClient();
  const [{ data: categories }, { data: posts }] = await Promise.all([
    supabase.from("categories").select("*").order("name"),
    supabase.from("posts").select("id, category_id"),
  ]);

  const postCountMap: Record<string, number> = {};
  (posts ?? []).forEach((p: any) => {
    if (p.category_id) postCountMap[p.category_id] = (postCountMap[p.category_id] ?? 0) + 1;
  });

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-10">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-3xl font-bold text-brand-black">Categories</h1>
      </div>

      {/* Create Form */}
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-widest text-brand-charcoal mb-4">Add New Category</h2>
        <CategoryForm />
      </div>

      {/* Existing Categories */}
      <div className="bg-brand-warmwhite border border-brand-taupe-light rounded-lg overflow-hidden">
        <div className="px-6 py-3 border-b border-brand-taupe-light bg-brand-cream/50 text-[10px] font-semibold uppercase tracking-widest text-brand-charcoal/60">
          Existing Categories ({categories?.length ?? 0})
        </div>
        <div className="divide-y divide-brand-taupe-light/40">
          {(categories ?? []).map((cat: any) => (
            <div key={cat.id} className="flex items-center justify-between px-6 py-4 hover:bg-brand-cream/30 transition-colors">
              <div>
                <p className="text-sm font-medium text-brand-black">{cat.name}</p>
                <p className="text-[11px] font-mono text-brand-charcoal/50 mt-0.5">/blog/{cat.slug} · {postCountMap[cat.id] ?? 0} posts</p>
              </div>
              <Link href={`/admin/categories/${cat.id}`} className="flex items-center gap-1 text-xs text-brand-taupe-dark hover:text-brand-black transition">
                <Edit className="w-3.5 h-3.5" /> Edit
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
