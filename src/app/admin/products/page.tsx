import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import Image from "next/image";
import { PlusCircle, Edit, ExternalLink } from "lucide-react";

export default async function AdminProductsPage() {
  const supabase = await createClient();
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .order("name");

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-brand-black">Products</h1>
          <p className="text-sm text-brand-charcoal/60 mt-1">{products?.length ?? 0} affiliate products</p>
        </div>
        <Link href="/admin/products/new" className="flex items-center gap-2 px-4 py-2.5 bg-brand-black text-brand-cream text-xs font-semibold uppercase tracking-wider rounded-md hover:bg-brand-taupe-dark transition">
          <PlusCircle className="w-4 h-4" /> Add Product
        </Link>
      </div>

      <div className="bg-brand-warmwhite border border-brand-taupe-light rounded-lg overflow-hidden">
        <div className="grid grid-cols-12 px-6 py-3 border-b border-brand-taupe-light bg-brand-cream/50 text-[10px] font-semibold uppercase tracking-widest text-brand-charcoal/60">
          <span className="col-span-1">Image</span>
          <span className="col-span-4">Name</span>
          <span className="col-span-3">Retailers</span>
          <span className="col-span-2 text-center">Clicks</span>
          <span className="col-span-2 text-right">Actions</span>
        </div>
        <div className="divide-y divide-brand-taupe-light/40">
          {(products ?? []).map((product: any) => {
            const retailers: any[] = product.retailers ?? [];
            return (
              <div key={product.id} className="grid grid-cols-12 px-6 py-4 items-center hover:bg-brand-cream/30 transition-colors">
                <div className="col-span-1">
                  {product.image_url ? (
                    <div className="relative w-10 h-10 rounded overflow-hidden bg-brand-cream border border-brand-taupe-light">
                      <Image src={product.image_url} alt={product.name} fill className="object-cover" />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded bg-brand-cream border border-brand-taupe-light" />
                  )}
                </div>
                <div className="col-span-4 min-w-0 px-3">
                  <p className="text-sm font-medium text-brand-black truncate">{product.name}</p>
                  {product.description && <p className="text-[11px] text-brand-charcoal/50 truncate mt-0.5">{product.description}</p>}
                </div>
                <div className="col-span-3">
                  <div className="flex flex-wrap gap-1">
                    {retailers.map((r) => (
                      <a key={r.retailerName} href={r.affiliateUrl} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1 text-[10px] px-2 py-0.5 bg-brand-cream border border-brand-taupe-light rounded text-brand-charcoal/70 hover:text-brand-black transition-colors">
                        {r.retailerName} {r.price && <span className="text-brand-taupe">({r.price})</span>}
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    ))}
                  </div>
                </div>
                <div className="col-span-2 text-center">
                  <span className="font-serif text-xl font-bold text-brand-black">{product.click_count ?? 0}</span>
                </div>
                <div className="col-span-2 flex justify-end gap-2">
                  <Link href={`/admin/products/${product.id}`} className="flex items-center gap-1 text-xs text-brand-taupe-dark hover:text-brand-black transition-colors">
                    <Edit className="w-3.5 h-3.5" /> Edit
                  </Link>
                </div>
              </div>
            );
          })}
          {!products?.length && (
            <div className="px-6 py-12 text-center">
              <p className="text-sm text-brand-charcoal/50">No products yet.</p>
              <Link href="/admin/products/new" className="text-xs text-brand-taupe-dark underline mt-2 inline-block">Add your first product →</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
