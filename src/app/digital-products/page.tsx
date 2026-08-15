import { Metadata } from "next";
import Link from "next/link";
import { digitalProducts } from "@/data/digitalProducts";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Digital Products",
  description: "Shop our collection of home decor guides, planners, and templates.",
};

export default function DigitalProductsIndex() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="font-serif text-4xl md:text-5xl font-extrabold text-brand-black tracking-tight">
          Shop Our Guides
        </h1>
        <p className="text-sm md:text-base text-brand-charcoal/80 max-w-xl mx-auto leading-relaxed">
          Step-by-step systems, planning worksheets, and room-by-room blueprints to help you style your home with confidence.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {digitalProducts.map((product) => (
          <Link key={product.id} href={`/digital-products/${product.slug}`} className="group flex flex-col bg-brand-warmwhite border border-brand-taupe-light rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
            <div className="relative aspect-square bg-brand-cream border-b border-brand-taupe-light flex items-center justify-center p-8 group-hover:bg-brand-taupe-light/30 transition-colors">
              {product.imageUrl ? (
                <Image src={product.imageUrl} alt={product.name} fill className="object-cover" />
              ) : (
                <div className="text-center space-y-2">
                  <span className="font-serif text-xl font-bold text-brand-black">{product.name}</span>
                  <p className="text-xs uppercase tracking-widest text-brand-taupe-dark">PDF Guide</p>
                </div>
              )}
            </div>
            <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
              <div className="space-y-2">
                <h3 className="font-serif text-xl font-bold text-brand-black group-hover:text-brand-taupe-dark transition-colors">{product.name}</h3>
                <p className="text-sm text-brand-charcoal/80 line-clamp-2">{product.description}</p>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-brand-taupe-light/50">
                <span className="font-sans font-bold text-brand-black">${product.price.toFixed(2)}</span>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-brand-taupe-dark group-hover:underline">View Details &rarr;</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
