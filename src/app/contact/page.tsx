"use client";

import { useState } from "react";
import { Mail, MapPin, Send } from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    // Simulate sending email inquiry
    setTimeout(() => {
      setStatus("success");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 space-y-12">
      {/* Title */}
      <div className="text-center space-y-4">
        <span className="text-[10px] md:text-xs font-semibold tracking-widest uppercase text-brand-taupe-dark">
          Get In Touch
        </span>
        <h1 className="font-serif text-3xl md:text-5xl font-extrabold text-brand-black tracking-tight leading-tight">
          Connect With Us
        </h1>
        <div className="h-0.5 w-16 bg-brand-taupe mx-auto mt-4" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pt-8">
        {/* Info Column */}
        <div className="md:col-span-4 space-y-6">
          <div className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-brand-black">Inquiries</h2>
            <p className="text-xs md:text-sm text-brand-charcoal/80 leading-relaxed">
              For brand sponsorships, affiliate collaborations, design questions, or editorial feedback, please use the form. We respond within 48 business hours.
            </p>
          </div>

          <div className="space-y-4 border-t border-brand-taupe-light/50 pt-6">
            <div className="flex items-center gap-3 text-xs md:text-sm text-brand-charcoal/80">
              <Mail className="w-4 h-4 text-brand-taupe" />
              <span>hello@thedecordesk.com</span>
            </div>
            <div className="flex items-center gap-3 text-xs md:text-sm text-brand-charcoal/80">
              <MapPin className="w-4 h-4 text-brand-taupe" />
              <span>Portland, OR 97201</span>
            </div>
          </div>
        </div>

        {/* Form Column */}
        <div className="md:col-span-8 bg-brand-warmwhite p-6 md:p-8 border border-brand-taupe-light rounded-lg shadow-sm">
          {status === "success" ? (
            <div className="p-8 text-center space-y-3 animate-in fade-in zoom-in duration-300">
              <div className="w-12 h-12 bg-brand-cream border border-brand-taupe rounded-full flex items-center justify-center mx-auto text-brand-taupe-dark">
                <Send className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-brand-black">Message Sent</h3>
              <p className="text-xs text-brand-charcoal/80">
                Thank you for reaching out! Your message has been received, and we will get back to you shortly.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-4 px-4 py-2 bg-brand-black text-brand-cream uppercase text-[10px] font-semibold tracking-wider rounded-md hover:bg-brand-taupe-dark transition duration-200"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-semibold text-brand-charcoal/80 uppercase tracking-wider mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    disabled={status === "loading"}
                    className="w-full px-4 py-3 bg-brand-cream border border-brand-taupe-light rounded-md text-brand-black text-xs focus:outline-none focus:ring-1 focus:ring-brand-taupe focus:border-brand-taupe transition duration-200 disabled:opacity-50"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-xs font-semibold text-brand-charcoal/80 uppercase tracking-wider mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={status === "loading"}
                    className="w-full px-4 py-3 bg-brand-cream border border-brand-taupe-light rounded-md text-brand-black text-xs focus:outline-none focus:ring-1 focus:ring-brand-taupe focus:border-brand-taupe transition duration-200 disabled:opacity-50"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-subject" className="block text-xs font-semibold text-brand-charcoal/80 uppercase tracking-wider mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="contact-subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                  disabled={status === "loading"}
                  className="w-full px-4 py-3 bg-brand-cream border border-brand-taupe-light rounded-md text-brand-black text-xs focus:outline-none focus:ring-1 focus:ring-brand-taupe focus:border-brand-taupe transition duration-200 disabled:opacity-50"
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs font-semibold text-brand-charcoal/80 uppercase tracking-wider mb-2">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={5}
                  disabled={status === "loading"}
                  className="w-full px-4 py-3 bg-brand-cream border border-brand-taupe-light rounded-md text-brand-black text-xs focus:outline-none focus:ring-1 focus:ring-brand-taupe focus:border-brand-taupe transition duration-200 disabled:opacity-50 resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full sm:w-auto px-6 py-3 bg-brand-black text-brand-cream uppercase text-xs font-semibold tracking-wider rounded-md hover:bg-brand-taupe-dark transition duration-300 disabled:opacity-50 cursor-pointer"
                >
                  {status === "loading" ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
