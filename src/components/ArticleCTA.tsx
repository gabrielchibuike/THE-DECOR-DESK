import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";

interface ArticleCTAProps {
  categorySlug?: string;
}

export default function ArticleCTA({ categorySlug }: ArticleCTAProps) {
  return (
    <div className="my-12 bg-brand-warmwhite border border-brand-taupe-light p-6 md:p-8 rounded-xl flex flex-col md:flex-row gap-8 items-center shadow-sm">
      <div className="flex-1 space-y-3.5 text-left">
        <span className="text-[10px] uppercase font-bold tracking-widest text-brand-taupe-dark bg-brand-cream border border-brand-taupe-light px-2.5 py-1 rounded inline-block">
          FREE GUIDE
        </span>
        <h3 className="font-serif text-2xl md:text-3xl font-bold text-brand-black">
          Planning Your Next Room Makeover?
        </h3>
        <p className="text-sm text-brand-charcoal/80 leading-relaxed">
          Get the free <strong>Elevated Home Starter Guide</strong> and learn how to choose your style, create a cohesive color palette, plan your budget, and decorate with intention.
        </p>
        <div className="pt-2">
          <Link
            href="/free-resources/elevated-home-starter-guide"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-brand-black text-brand-cream text-xs font-semibold uppercase tracking-wider rounded-md hover:bg-brand-taupe-dark transition-colors shadow-sm"
          >
            <span>GET THE FREE GUIDE</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      <div className="w-36 h-44 bg-brand-cream border border-brand-taupe-light flex-shrink-0 rounded-lg flex flex-col items-center justify-between p-4 shadow-md rotate-2 relative overflow-hidden group">
        <div className="w-full border-b border-brand-taupe-light/50 pb-1 text-center">
          <span className="font-serif text-[7px] font-bold tracking-widest text-brand-black">THE DECOR DESK</span>
        </div>
        <div className="my-auto text-center space-y-1">
          <span className="font-serif font-bold text-xs text-brand-black block">The Elevated Home</span>
          <span className="text-[8px] uppercase tracking-widest text-brand-taupe-dark block font-sans">Starter Guide</span>
        </div>
        <div className="w-full pt-1 border-t border-brand-taupe-light/50 flex items-center justify-between text-[7px] text-brand-charcoal/60 uppercase font-sans">
          <span>FREE PDF</span>
          <BookOpen className="w-2.5 h-2.5" />
        </div>
      </div>
    </div>
  );
}
