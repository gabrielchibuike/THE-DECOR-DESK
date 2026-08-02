import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Star, ShieldCheck, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "About Our Brand",
  description: "Learn about the design story, editorial guidelines, and organic styling philosophy behind The Decor Desk.",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 space-y-16">
      {/* Editorial Title */}
      <div className="text-center space-y-4">
        <span className="text-[10px] md:text-xs font-semibold tracking-widest uppercase text-brand-taupe-dark">
          Our Design Philosophy
        </span>
        <h1 className="font-serif text-3xl md:text-5xl font-extrabold text-brand-black tracking-tight leading-tight">
          Welcome to The Decor Desk
        </h1>
        <div className="h-0.5 w-16 bg-brand-taupe mx-auto mt-4" />
      </div>

      {/* Brand Story block */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-7 space-y-4 text-brand-charcoal/90 text-sm md:text-base leading-relaxed">
          <p className="font-serif text-lg text-brand-black leading-relaxed font-semibold italic">
            &ldquo;We believe that a beautiful, refined home should be a serene retreat, not an unattainable luxury.&rdquo;
          </p>
          <p>
            The Decor Desk was founded in 2026 as a dedicated lifestyle media brand designed to bridge the gap between high-end interior design editorials (like Architectural Digest and Studio McGee) and practical, everyday living solutions.
          </p>
          <p>
            Whether you are arranging a small rental apartment living room, sorting a busy laundry room, or organizing a tranquil bedroom retreat, we provide the blueprints, palette selections, and curated shopping recommendations you need to style your space with ease.
          </p>
        </div>
        <div className="md:col-span-5 relative aspect-square rounded-md overflow-hidden bg-brand-cream border border-brand-taupe-light/50">
          <Image
            src="/images/categories/living-room.jpg"
            alt="Warm styled living room design"
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover"
          />
        </div>
      </section>

      {/* Trust & Credibility Columns */}
      <section className="border-t border-brand-taupe-light/50 pt-12 space-y-8">
        <h2 className="font-serif text-2xl font-bold text-brand-black text-center">
          Our Editorial Commitment
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-brand-warmwhite p-6 border border-brand-taupe-light rounded-md text-center space-y-3">
            <div className="w-10 h-10 rounded-full bg-brand-cream border border-brand-taupe flex items-center justify-center mx-auto text-brand-taupe-dark">
              <Star className="w-5 h-5 fill-current" />
            </div>
            <h3 className="font-serif text-base font-bold text-brand-black">Aesthetic Standard</h3>
            <p className="text-xs text-brand-charcoal/80 leading-relaxed">
              We vet every product Recommendation to match our warm neutral, organic modern aesthetic. No cluttered styling, just pure visual harmony.
            </p>
          </div>

          <div className="bg-brand-warmwhite p-6 border border-brand-taupe-light rounded-md text-center space-y-3">
            <div className="w-10 h-10 rounded-full bg-brand-cream border border-brand-taupe flex items-center justify-center mx-auto text-brand-taupe-dark">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base font-bold text-brand-black">Trustworthy Links</h3>
            <p className="text-xs text-brand-charcoal/80 leading-relaxed">
              We link only to reputable, verified retailers like Amazon, Wayfair, and Target. Every recommended item is curated for quality and durability.
            </p>
          </div>

          <div className="bg-brand-warmwhite p-6 border border-brand-taupe-light rounded-md text-center space-y-3">
            <div className="w-10 h-10 rounded-full bg-brand-cream border border-brand-taupe flex items-center justify-center mx-auto text-brand-taupe-dark">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base font-bold text-brand-black">Community First</h3>
            <p className="text-xs text-brand-charcoal/80 leading-relaxed">
              We comply strictly with FTC guidelines and value our readers. We never recommend products just for commissions; we select pieces we genuinely love.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      {/* <section className="bg-brand-warmwhite border border-brand-taupe-light p-8 rounded-lg text-center space-y-4">
        <h2 className="font-serif text-xl md:text-2xl font-bold text-brand-black">
          Join Our Weekly Design Journal
        </h2>
        <p className="text-xs md:text-sm text-brand-charcoal/80 max-w-lg mx-auto leading-relaxed">
          Sign up to receive our organic palettes, budget design checkmarks, and shopping summaries directly.
        </p>
        <div>
          <Link
            href="/newsletter"
            className="inline-block px-6 py-3 bg-brand-black text-brand-cream uppercase text-xs font-semibold tracking-wider rounded-md hover:bg-brand-taupe-dark transition duration-300"
          >
            Go to Newsletter Page
          </Link>
        </div>
      </section> */}
    </div>
  );
}
