import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, BookOpen, Sparkles, ShieldCheck } from "lucide-react";
import LeadCaptureForm from "./LeadCaptureForm";

export const metadata: Metadata = {
  title: "The Elevated Home Starter Guide | The Decor Desk",
  description: "A free guide to creating a beautiful, cohesive home without overspending.",
  openGraph: {
    title: "The Elevated Home Starter Guide | The Decor Desk",
    description: "A free guide to creating a beautiful, cohesive home without overspending.",
    type: "website",
    url: "https://the-decor-desk.vercel.app/free-resources/elevated-home-starter-guide",
  },
};

export default function ElevatedHomeStarterGuidePage() {
  return (
    <main className="min-h-screen bg-brand-cream/40 py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Back Link */}
        <div>
          <Link
            href="/free-resources"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-charcoal/70 hover:text-brand-black transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Free Resources</span>
          </Link>
        </div>

        {/* Hero Section & Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Offer Details & Cover */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 text-[10px] md:text-xs font-bold uppercase tracking-widest text-brand-taupe-dark bg-brand-taupe-light/40 border border-brand-taupe-light px-3 py-1 rounded">
                <Sparkles className="w-3 h-3 text-brand-taupe" />
                <span>Free Digital Guide</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-black leading-tight tracking-tight">
                Create a Beautiful Home Without Overspending
              </h1>
              <p className="text-sm md:text-base text-brand-charcoal/85 leading-relaxed">
                Download <strong>The Elevated Home Starter Guide</strong> and learn how to define your interior style, create a cohesive color palette, decorate on a budget, and make confident decorating decisions.
              </p>
            </div>

            {/* PDF Cover Mockup Card */}
            <div className="bg-brand-warmwhite border border-brand-taupe-light p-6 md:p-8 rounded-xl shadow-sm flex flex-col sm:flex-row gap-6 items-center">
              <div className="w-40 h-52 bg-brand-cream border-2 border-brand-taupe-light/80 rounded-lg flex-shrink-0 flex flex-col items-center justify-between p-4 text-center shadow-md relative overflow-hidden group">
                <div className="w-full border-b border-brand-taupe-light/60 pb-2">
                  <span className="font-serif text-[10px] font-bold tracking-widest text-brand-black block">THE DECOR DESK</span>
                </div>
                <div className="my-auto space-y-1">
                  <span className="font-serif font-bold text-sm text-brand-black leading-tight block">The Elevated Home</span>
                  <span className="text-[9px] uppercase tracking-widest text-brand-taupe-dark block font-sans">Starter Guide</span>
                </div>
                <div className="w-full pt-2 border-t border-brand-taupe-light/60 flex items-center justify-between text-[8px] text-brand-charcoal/60 uppercase font-sans">
                  <span>Interior Blueprint</span>
                  <span>PDF</span>
                </div>
              </div>
              <div className="space-y-3 text-center sm:text-left">
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-taupe-dark">What's Inside</span>
                <h3 className="font-serif text-xl font-bold text-brand-black">The Elevated Home Starter Guide</h3>
                <p className="text-xs text-brand-charcoal/80 leading-relaxed">
                  A carefully curated blueprint packed with practical decorating advice, style guidance, color theory tips, and room-by-room planning strategies.
                </p>
                <div className="flex items-center justify-center sm:justify-start gap-2 text-[11px] text-brand-charcoal/70 pt-1">
                  <BookOpen className="w-3.5 h-3.5 text-brand-taupe" />
                  <span>Instant PDF Delivery to Email</span>
                </div>
              </div>
            </div>

            {/* Benefits Section */}
            <div className="space-y-4 pt-2">
              <h2 className="font-serif text-2xl font-bold text-brand-black">Inside the guide:</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {[
                  "Define your interior style",
                  "Build a cohesive color palette",
                  "Make your home look more elevated",
                  "Decorate without overspending",
                  "Learn a room-by-room decorating approach",
                  "Avoid common decorating mistakes",
                ].map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 bg-brand-warmwhite/60 border border-brand-taupe-light/50 p-3 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-brand-taupe-dark flex-shrink-0 mt-0.5" />
                    <span className="text-xs md:text-sm font-medium text-brand-black">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Email Capture Form */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="bg-brand-warmwhite border border-brand-taupe-light p-6 sm:p-8 rounded-xl shadow-md space-y-6">
              <div className="text-center space-y-2 border-b border-brand-taupe-light/50 pb-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-taupe-dark">Instant Access</span>
                <h3 className="font-serif text-2xl font-bold text-brand-black">Get Your Free Guide</h3>
                <p className="text-xs text-brand-charcoal/70">
                  Enter your name and email below to receive your free copy.
                </p>
              </div>

              <LeadCaptureForm />

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-brand-charcoal/60 pt-2 border-t border-brand-taupe-light/40">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-taupe" />
                <span>We respect your privacy. Unsubscribe anytime.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
