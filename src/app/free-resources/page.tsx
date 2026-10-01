import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, CheckCircle2, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Free Resources | The Decor Desk",
  description: "Download our free home decor guides, checklists, and room-by-room planning templates.",
};

export default function FreeResources() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 space-y-16">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-1.5 text-[10px] md:text-xs font-bold uppercase tracking-widest text-brand-taupe-dark bg-brand-taupe-light/35 border border-brand-taupe-light px-3 py-1 rounded">
          <Sparkles className="w-3 h-3 text-brand-taupe" />
          <span>Curated Decor Resources</span>
        </div>
        <h1 className="font-serif text-4xl md:text-5xl font-extrabold text-brand-black tracking-tight">
          Free Home Decor Guides
        </h1>
        <p className="text-sm md:text-base text-brand-charcoal/80 max-w-2xl mx-auto leading-relaxed">
          Start building your dream space with our curated collection of free guides, styling checklists, and room planners.
        </p>
      </div>

      {/* Featured Lead Magnet Card */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-brand-warmwhite border border-brand-taupe-light p-6 md:p-10 rounded-xl shadow-sm">
        <div className="md:col-span-7 space-y-6">
          <div className="space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-taupe-dark">
              Featured Free Guide
            </span>
            <h2 className="font-serif text-2xl md:text-4xl font-bold text-brand-black leading-tight">
              Create a Beautiful Home Without Overspending
            </h2>
            <p className="text-sm text-brand-charcoal/80 leading-relaxed">
              Download <strong>The Elevated Home Starter Guide</strong> and learn how to define your interior style, create a cohesive color palette, decorate on a budget, and make confident decorating decisions.
            </p>
          </div>

          <div className="space-y-2 pt-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-black block">What's Inside:</span>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-brand-charcoal/80">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-taupe" />
                <span>Define your interior style</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-taupe" />
                <span>Build a cohesive color palette</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-taupe" />
                <span>Decorate without overspending</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-taupe" />
                <span>Room-by-room planning</span>
              </li>
            </ul>
          </div>

          <div className="pt-4">
            <Link
              href="/free-resources/elevated-home-starter-guide"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-brand-black text-brand-cream text-xs font-semibold uppercase tracking-wider rounded-md hover:bg-brand-taupe-dark transition duration-300 shadow-sm"
            >
              <span>GET THE FREE GUIDE</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="md:col-span-5 relative aspect-[4/5] bg-brand-cream border border-brand-taupe-light rounded-lg overflow-hidden flex flex-col items-center justify-between p-8 text-center group shadow-sm">
          <div className="w-36 h-48 bg-brand-warmwhite border-2 border-brand-taupe-light shadow-md mx-auto flex flex-col justify-between p-4 transition-transform duration-500 group-hover:scale-105">
            <div className="border-b border-brand-taupe-light/50 pb-1">
              <span className="font-serif text-[8px] font-bold tracking-widest text-brand-black">THE DECOR DESK</span>
            </div>
            <div className="my-auto space-y-1">
              <span className="font-serif font-bold text-xs text-brand-black block">The Elevated Home</span>
              <span className="text-[8px] uppercase tracking-widest text-brand-taupe-dark block">Starter Guide</span>
            </div>
            <div className="border-t border-brand-taupe-light/50 pt-1 flex justify-between text-[7px] text-brand-charcoal/60">
              <span>PDF GUIDE</span>
              <span>FREE</span>
            </div>
          </div>
          <div className="space-y-1 pt-4">
            <h3 className="font-serif font-bold text-base text-brand-black">The Elevated Home Starter Guide</h3>
            <span className="text-[10px] font-sans uppercase tracking-widest text-brand-taupe-dark flex items-center justify-center gap-1">
              <BookOpen className="w-3 h-3" /> PDF Download
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
