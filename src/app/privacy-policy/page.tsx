import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Learn how The Decor Desk handles cookie tracking, newsletter subscriptions, and user privacy protection.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 space-y-8">
      <div className="space-y-3 text-center border-b border-brand-taupe-light/50 pb-8">
        <span className="text-[10px] md:text-xs font-semibold tracking-widest uppercase text-brand-taupe-dark">
          Legal &amp; Privacy
        </span>
        <h1 className="font-serif text-3xl md:text-5xl font-extrabold text-brand-black tracking-tight">
          Privacy Policy
        </h1>
      </div>

      <div className="prose prose-sm md:prose-base max-w-none text-brand-charcoal/90 leading-relaxed space-y-6">
        <p>
          At The Decor Desk, we value your privacy. This Privacy Policy documents the types of information we collect, how we use it, and your rights concerning data protection.
        </p>

        <h2 className="font-serif text-xl font-bold text-brand-black pt-4 border-t border-brand-taupe-light/40">
          Information We Collect
        </h2>
        <p>
          We collect personal information that you voluntarily provide to us when subscribing to our newsletter (such as your email address). We also automatically collect non-personal analytics data, such as IP address, browser type, and page view metrics via Google Analytics and internal link click monitors.
        </p>

        <h2 className="font-serif text-xl font-bold text-brand-black pt-4 border-t border-brand-taupe-light/40">
          How We Use Your Data
        </h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>To deliver weekly styling newsletters and lead magnet downloads.</li>
          <li>To analyze affiliate link traffic and optimize blog content.</li>
          <li>To maintain site security and prevent spam or malicious submissions.</li>
        </ul>

        <h2 className="font-serif text-xl font-bold text-brand-black pt-4 border-t border-brand-taupe-light/40">
          Cookies &amp; Tracking Technologies
        </h2>
        <p>
          We use cookies to store information about visitor preferences and pages accessed. Third-party vendors like Amazon Associates and Google Analytics may also place cookies on your browser to measure referral conversions and site traffic.
        </p>

        <h2 className="font-serif text-xl font-bold text-brand-black pt-4 border-t border-brand-taupe-light/40">
          Contact Us
        </h2>
        <p>
          If you have any questions or concerns regarding this policy, please reach out to us at: <strong>privacy@thedecordesk.com</strong>.
        </p>
      </div>
    </div>
  );
}
