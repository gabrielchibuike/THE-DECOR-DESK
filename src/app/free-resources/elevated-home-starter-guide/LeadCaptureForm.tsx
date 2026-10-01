"use client";

import { useState } from "react";
import { CheckCircle, AlertCircle, ArrowRight, Download } from "lucide-react";

export default function LeadCaptureForm() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation
    if (!firstName.trim()) {
      setStatus("error");
      setErrorMessage("Please enter your first name.");
      return;
    }

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/lead-capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName.trim(),
          email: email.trim(),
          honeypot,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      if (data.downloadUrl) {
        setDownloadUrl(data.downloadUrl);
      }

      // Track Analytics event if available
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "lead_capture_submitted", {
          lead_magnet: "elevated-home-starter-guide",
        });
      }
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || "Something went wrong. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="space-y-6 text-center py-4 animate-in fade-in zoom-in duration-300">
        <div className="w-12 h-12 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="w-6 h-6" />
        </div>

        <div className="space-y-2">
          <h4 className="font-serif text-2xl font-bold text-brand-black">You're in! 🎉</h4>
          <p className="text-sm font-medium text-brand-black">
            Your guide is on its way to your inbox.
          </p>
          <p className="text-xs text-brand-charcoal/80 leading-relaxed">
            Check your email for the download link.
          </p>
        </div>

        <div className="bg-brand-cream border border-brand-taupe-light p-3.5 rounded-lg text-xs text-brand-charcoal/70">
          Didn't receive it? Check your spam or promotions folder.
        </div>

        {downloadUrl && (
          <div className="pt-2 border-t border-brand-taupe-light/50">
            <a
              href={downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-black text-brand-cream text-xs font-semibold uppercase tracking-wider rounded-md hover:bg-brand-taupe-dark transition duration-200"
            >
              <Download className="w-4 h-4" />
              <span>Download Guide Directly</span>
            </a>
          </div>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Honeypot field for bot spam protection */}
      <div className="hidden" aria-hidden="true">
        <input
          type="text"
          name="website_url"
          tabIndex={-1}
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          autoComplete="off"
        />
      </div>

      <div className="space-y-1.5 text-left">
        <label htmlFor="firstName" className="block text-xs font-semibold uppercase tracking-wider text-brand-black">
          First Name
        </label>
        <input
          id="firstName"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Your first name"
          disabled={status === "loading"}
          required
          className="w-full px-4 py-3 bg-brand-cream border border-brand-taupe-light rounded-md text-brand-black placeholder-brand-charcoal/40 text-sm focus:outline-none focus:ring-1 focus:ring-brand-taupe focus:border-brand-taupe transition duration-200 disabled:opacity-50"
        />
      </div>

      <div className="space-y-1.5 text-left">
        <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-brand-black">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your.email@example.com"
          disabled={status === "loading"}
          required
          className="w-full px-4 py-3 bg-brand-cream border border-brand-taupe-light rounded-md text-brand-black placeholder-brand-charcoal/40 text-sm focus:outline-none focus:ring-1 focus:ring-brand-taupe focus:border-brand-taupe transition duration-200 disabled:opacity-50"
        />
      </div>

      {status === "error" && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md flex items-center gap-2 text-xs text-red-700 animate-in fade-in duration-200">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full py-3.5 px-6 bg-brand-black text-brand-cream text-xs font-semibold uppercase tracking-wider rounded-md hover:bg-brand-taupe-dark transition duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
      >
        {status === "loading" ? (
          <span>Sending Your Guide...</span>
        ) : (
          <>
            <span>GET THE FREE GUIDE</span>
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>

      <p className="text-[11px] text-center text-brand-charcoal/70 italic pt-1">
        Your guide will be delivered to your email.
      </p>
    </form>
  );
}
