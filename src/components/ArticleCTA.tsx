import Link from "next/link";
import Image from "next/image";

interface ArticleCTAProps {
  categorySlug: string;
}

export default function ArticleCTA({ categorySlug }: ArticleCTAProps) {
  // We can vary the CTA based on category
  const isStyling = categorySlug.includes("style") || categorySlug === "minimalist";
  
  if (isStyling) {
    return (
      <div className="my-12 bg-brand-warmwhite border border-brand-taupe-light p-6 md:p-8 rounded-lg flex flex-col md:flex-row gap-8 items-center shadow-sm">
        <div className="flex-1 space-y-4">
          <span className="text-[10px] uppercase font-bold tracking-widest text-brand-taupe-dark">Free Resource</span>
          <h3 className="font-serif text-2xl font-bold text-brand-black">The Elevated Home Starter Guide</h3>
          <p className="text-sm text-brand-charcoal/80 leading-relaxed">
            Discover your aesthetic and learn how to create a cohesive home on a budget with our free starter guide.
          </p>
          <div className="pt-2">
            <Link href="/free-resources" className="inline-block px-6 py-3 bg-brand-black text-brand-cream text-xs font-semibold uppercase tracking-wider rounded hover:bg-brand-taupe-dark transition-colors">
              Download for Free
            </Link>
          </div>
        </div>
        <div className="w-32 h-40 bg-brand-cream border border-brand-taupe-light flex-shrink-0 flex items-center justify-center shadow-md rotate-3 relative overflow-hidden group">
           <div className="absolute inset-0 bg-brand-taupe-light/20 flex flex-col items-center justify-center space-y-2 p-2 text-center group-hover:bg-brand-taupe-light/30 transition-colors">
             <span className="font-serif text-sm font-bold text-brand-black">Starter Guide</span>
             <span className="text-[8px] uppercase tracking-widest text-brand-taupe-dark">PDF</span>
           </div>
        </div>
      </div>
    );
  }

  // Default CTA for Room categories
  return (
    <div className="my-12 bg-brand-taupe-light/20 border border-brand-taupe-light p-6 md:p-8 rounded-lg flex flex-col md:flex-row gap-8 items-center shadow-sm">
      <div className="flex-1 space-y-4">
        <span className="text-[10px] uppercase font-bold tracking-widest text-brand-taupe-dark">Featured Blueprint</span>
        <h3 className="font-serif text-2xl font-bold text-brand-black">Ready to decorate your space?</h3>
        <p className="text-sm text-brand-charcoal/80 leading-relaxed">
          Get our comprehensive room-by-room system for creating a beautiful, elevated home without wasting money on pieces that don't work together.
        </p>
        <div className="pt-2">
          <Link href="/digital-products/elevated-home-decor-blueprint" className="inline-block px-6 py-3 bg-brand-black text-brand-cream text-xs font-semibold uppercase tracking-wider rounded hover:bg-brand-taupe-dark transition-colors">
            Get the Blueprint — $15
          </Link>
        </div>
      </div>
      <div className="w-32 h-40 bg-brand-cream border border-brand-taupe-light flex-shrink-0 flex items-center justify-center shadow-md rotate-3 relative overflow-hidden group">
         <div className="absolute inset-0 bg-brand-warmwhite flex flex-col items-center justify-center space-y-2 p-2 text-center group-hover:bg-brand-cream transition-colors">
           <span className="font-serif text-sm font-bold text-brand-black">Blueprint</span>
           <span className="text-[8px] uppercase tracking-widest text-brand-taupe-dark">PDF</span>
         </div>
      </div>
    </div>
  );
}
