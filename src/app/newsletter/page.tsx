import { Metadata } from "next";
import EmailSignup from "@/components/EmailSignup";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Join Our Newsletter",
  description: "Subscribe to The Decor Desk newsletter and download our free Organic Mood Board Guide today.",
};

export default function NewsletterPage() {
  const benefits = [
    "Weekly styling guides for organic modern spaces",
    "First access to curated budget-friendly shopping collections",
    "Renter-friendly design checklists and layout templates",
    "Exclusive notifications about sales from Amazon, Wayfair, and Target",
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        {/* Info Column */}
        <div className="md:col-span-6 space-y-6">
          <div className="space-y-3">
            <span className="text-[10px] md:text-xs font-semibold tracking-widest uppercase text-brand-taupe-dark">
              Exclusive Lead Magnet
            </span>
            <h1 className="font-serif text-3xl md:text-4xl font-extrabold text-brand-black tracking-tight leading-tight">
              Get Our Free <span className="text-brand-taupe-dark italic font-normal">Organic Mood Board</span> Design Pack
            </h1>
            <p className="text-sm text-brand-charcoal/80 leading-relaxed">
              We translated professional interior styling guidelines into an easy-to-use template pack. When you subscribe, you will instantly receive:
            </p>
          </div>

          <ul className="space-y-3">
            {benefits.map((benefit, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-brand-charcoal/90">
                <div className="w-5 h-5 rounded-full bg-brand-taupe-light/50 flex items-center justify-center text-brand-taupe-dark mt-0.5 flex-shrink-0">
                  <Check className="w-3 h-3" />
                </div>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Signup Form Column */}
        <div className="md:col-span-6">
          <EmailSignup
            title="Download the Pack"
            description="Enter your email details below. We'll send the PDF design guide straight to your inbox. No spam, unsubscribe anytime."
            buttonText="Download Design Pack"
            leadMagnetName="Organic Mood Board Guide (Newsletter Page)"
          />
        </div>
      </div>
    </div>
  );
}
