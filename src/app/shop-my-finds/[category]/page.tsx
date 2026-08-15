import { Metadata } from "next";
import { getProductsByCategory } from "@/lib/db/products";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const formattedCategory = resolvedParams.category.replace(/-/g, " ");
  return {
    title: `Shop ${formattedCategory}`,
    description: `Shop our curated collection of ${formattedCategory} for your home.`,
  };
}

export default async function ShopCategoryPage({ params }: PageProps) {
  const resolvedParams = await params;
  const products = await getProductsByCategory(resolvedParams.category);
  const formattedCategory = resolvedParams.category.replace(/-/g, " ");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="font-serif text-4xl md:text-5xl font-extrabold text-brand-black tracking-tight capitalize">
          {formattedCategory}
        </h1>
        <p className="text-sm md:text-base text-brand-charcoal/80 max-w-xl mx-auto leading-relaxed">
          Curated picks to elevate your space.
        </p>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group flex flex-col space-y-4">
              <div className="relative aspect-[4/5] bg-brand-cream border border-brand-taupe-light/50 rounded-lg overflow-hidden flex items-center justify-center p-6">
                {product.image_url ? (
                  <Image src={product.image_url} alt={product.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                ) : (
                  <span className="text-brand-taupe-dark">No Image</span>
                )}
              </div>
              <div className="space-y-2 flex-grow">
                <h3 className="font-serif text-lg font-bold text-brand-black leading-snug">
                  {product.name}
                </h3>
                {product.description && (
                  <p className="text-xs text-brand-charcoal/70 line-clamp-2">
                    {product.description}
                  </p>
                )}
              </div>
              
              <div className="pt-2 space-y-2">
                {(product.retailers ?? []).map((link, idx) => {
                  const redirectUrl = `/go/${product.id}?r=${encodeURIComponent(link.retailerName)}`;
                  return (
                    <a
                      key={idx}
                      href={redirectUrl}
                      target="_blank"
                      rel="nofollow sponsored noopener"
                      className="flex justify-between items-center w-full px-4 py-2 bg-brand-warmwhite border border-brand-taupe-light rounded text-xs font-semibold uppercase tracking-wider hover:bg-brand-taupe hover:text-brand-cream transition-colors duration-200 text-brand-black"
                    >
                      <span>{link.retailerName}</span>
                      <span className="flex items-center gap-1 font-sans font-medium text-xs normal-case">
                        {link.price && <span>{link.price}</span>}
                        <ExternalLink className="w-3.5 h-3.5" />
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-brand-warmwhite border border-brand-taupe-light rounded-lg">
          <p className="font-serif text-lg text-brand-charcoal/80">
            No products found for this category yet. Check back soon!
          </p>
        </div>
      )}
    </div>
  );
}
