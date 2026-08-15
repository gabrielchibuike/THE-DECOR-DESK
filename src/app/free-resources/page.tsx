import { Metadata } from "next";
import EmailSignup from "@/components/EmailSignup";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Free Resources",
  description: "Download our free home decor guides, checklists, and room-by-room planning templates.",
};

export default function FreeResources() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 space-y-16">
      <div className="text-center space-y-4">
        <h1 className="font-serif text-4xl md:text-5xl font-extrabold text-brand-black tracking-tight">
          Free Resources
        </h1>
        <p className="text-sm md:text-base text-brand-charcoal/80 max-w-2xl mx-auto leading-relaxed">
          Start building your dream space with our curated collection of free guides, styling checklists, and room planners.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-brand-warmwhite border border-brand-taupe-light p-6 md:p-10 rounded-xl shadow-sm">
        <div className="order-2 md:order-1 space-y-6">
          <div className="space-y-2">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-brand-black">
              The Elevated Home Starter Guide
            </h2>
            <p className="text-sm text-brand-charcoal/80 leading-relaxed">
              A practical guide to creating a beautiful, elevated home without overspending. 
              Learn how to discover your style, create a cohesive color palette, and avoid common decorating mistakes.
            </p>
          </div>
          
          <ul className="space-y-2 text-sm text-brand-charcoal/80 list-disc list-inside">
            <li>Style discovery & vision boards</li>
            <li>Room planning & furniture placement</li>
            <li>Budget planning & shopping tips</li>
            <li>Lighting & color palette guidance</li>
          </ul>

          <div className="pt-4">
            <EmailSignup
              title=""
              description=""
              buttonText="Send Me the Free Guide"
              layout="stacked"
              leadMagnetName="The Elevated Home Starter Guide"
            />
          </div>
        </div>
        <div className="order-1 md:order-2 relative aspect-[4/5] bg-brand-cream border border-brand-taupe-light rounded-lg overflow-hidden flex items-center justify-center p-8 text-center group">
          {/* Placeholder for the real mockup image */}
          <div className="space-y-4 transition-transform duration-500 group-hover:scale-105">
            <div className="w-32 h-40 bg-brand-warmwhite border-2 border-brand-taupe-light shadow-md mx-auto flex items-center justify-center">
              <span className="font-serif font-bold text-brand-taupe text-3xl">G</span>
            </div>
            <h3 className="font-serif font-bold text-xl text-brand-black">The Starter Guide</h3>
            <span className="text-[10px] font-sans uppercase tracking-widest text-brand-taupe-dark">PDF Download</span>
          </div>
        </div>
      </div>
    </div>
  );
}
