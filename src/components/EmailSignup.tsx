"use client";

import { useState } from "react";

interface EmailSignupProps {
  title?: string;
  description?: string;
  buttonText?: string;
  layout?: "stacked" | "inline";
  leadMagnetName?: string;
}

export default function EmailSignup({
  title = "Subscribe to Our Newsletter",
  description = "Join our community of design enthusiasts. Receive weekly interior styling guides, curated shopping checklists, and renter-friendly decor ideas directly to your inbox.",
  buttonText = "Join the Club",
  layout = "stacked",
  leadMagnetName,
}: EmailSignupProps) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setMessage("");

    try {
      const sourcePage = typeof window !== "undefined" ? window.location.pathname : "";
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, consent, leadMagnetName, sourcePage }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to subscribe. Please try again.");
      }

      setStatus("success");
      setMessage(data.message || "Thank you for subscribing!");
      setEmail("");
      setConsent(false);
    } catch (error: any) {
      setStatus("error");
      setMessage(error.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="bg-brand-warmwhite border border-brand-taupe-light p-6 md:p-10 rounded-lg shadow-sm text-center md:text-left">
      <div className="max-w-2xl mx-auto">
        <h3 className="font-serif text-2xl md:text-3xl text-brand-black mb-3">
          {title}
        </h3>
        <p className="text-sm md:text-base text-brand-charcoal/80 mb-6 leading-relaxed">
          {description}
        </p>

        {status === "success" ? (
          <div className="p-4 bg-brand-taupe-light/50 border border-brand-taupe text-brand-charcoal text-center rounded-md font-medium animate-in fade-in zoom-in duration-300">
            {message}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className={layout === "inline" ? "flex flex-col sm:flex-row gap-3" : "space-y-3"}>
              <div className="flex-grow">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  required
                  disabled={status === "loading"}
                  className="w-full px-4 py-3 bg-brand-cream border border-brand-taupe-light rounded-md text-brand-black placeholder-brand-charcoal/40 text-sm focus:outline-none focus:ring-1 focus:ring-brand-taupe focus:border-brand-taupe transition duration-200 disabled:opacity-50"
                />
              </div>
              <div>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full sm:w-auto px-6 py-3 bg-brand-black text-brand-cream uppercase text-xs font-semibold tracking-wider rounded-md hover:bg-brand-taupe-dark transition duration-300 disabled:opacity-50 cursor-pointer"
                >
                  {status === "loading" ? "Subscribing..." : buttonText}
                </button>
              </div>
            </div>

            {/* GDPR Consent */}
            <div className="flex items-start justify-center md:justify-start gap-2 pt-2">
              <input
                type="checkbox"
                id="gdpr-consent"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                required
                disabled={status === "loading"}
                className="mt-1 h-4 w-4 border-brand-taupe-light rounded text-brand-taupe focus:ring-brand-taupe cursor-pointer"
              />
              <label htmlFor="gdpr-consent" className="text-xs text-brand-charcoal/70 select-none text-left cursor-pointer">
                I consent to receive occasional weekly styling newsletters. I can unsubscribe at any time.
              </label>
            </div>

            {status === "error" && (
              <p className="text-xs font-medium text-red-600 text-left animate-in fade-in duration-200">
                {message}
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
