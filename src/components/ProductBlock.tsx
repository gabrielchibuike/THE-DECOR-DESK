import Image from "next/image";
import { getProductById } from "@/lib/db/products";
import { ExternalLink } from "lucide-react";

interface ProductBlockProps {
  id: string;
}

export default async function ProductBlock({ id }: ProductBlockProps) {
  const product = await getProductById(id);

  if (!product) {
    return (
      <div className="p-4 bg-brand-warmwhite border border-brand-taupe-light text-brand-charcoal text-xs rounded-md">
        Product not found for ID: &quot;{id}&quot;.
      </div>
    );
  }

  return (
    <div className="my-10 bg-brand-warmwhite border border-brand-taupe-light rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="bg-brand-taupe-light/20 px-6 py-3 border-b border-brand-taupe-light flex justify-between items-center">
        <span className="font-serif text-sm font-semibold tracking-wide uppercase text-brand-black">
          Shop the Look
        </span>
        <span className="text-[10px] uppercase font-sans tracking-widest text-brand-taupe-dark bg-brand-warmwhite px-2 py-0.5 rounded border border-brand-taupe-light">
          Affiliate Recommendation
        </span>
      </div>

      <div className="p-6 flex flex-col md:flex-row gap-6 items-center md:items-stretch">
        {/* Product Image */}
        {product.image_url && (
          <div className="w-full md:w-1/3 min-h-[200px] relative rounded-md overflow-hidden bg-brand-cream border border-brand-taupe-light flex-shrink-0">
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 300px"
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        )}

        {/* Product Info & Actions */}
        <div className="w-full md:w-2/3 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <h4 className="font-serif text-xl font-bold text-brand-black leading-tight">
              {product.name}
            </h4>
            {product.description && (
              <p className="text-sm text-brand-charcoal/80 leading-relaxed">
                {product.description}
              </p>
            )}
          </div>

          {/* Call to Actions (Supports multiple networks/retailers) */}
          <div className="space-y-3 pt-2">
            <span className="text-xs font-semibold text-brand-taupe-dark uppercase tracking-widest block">
              Available Retailers:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(product.retailers ?? []).map((link) => {
                const redirectUrl = `/go/${product.id}?r=${encodeURIComponent(link.retailerName)}`;
                return (
                  <a
                    key={link.retailerName}
                    href={redirectUrl}
                    target="_blank"
                    rel="nofollow sponsored noopener"
                    className="flex justify-between items-center px-4 py-3 bg-brand-cream hover:bg-brand-taupe-light/50 border border-brand-taupe rounded-md text-brand-black text-xs font-semibold uppercase tracking-wider transition-colors duration-200"
                  >
                    <span>Buy on {link.retailerName}</span>
                    <span className="flex items-center gap-1 text-brand-taupe-dark font-sans font-medium text-xs normal-case">
                      {link.price && <span>{link.price}</span>}
                      <ExternalLink className="w-3.5 h-3.5" />
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
