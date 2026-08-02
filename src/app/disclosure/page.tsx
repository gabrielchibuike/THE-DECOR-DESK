import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FTC Affiliate Disclosure",
  description: "Learn how The Decor Desk monetizes through affiliate marketing channels like Amazon Associates and Wayfair.",
};

export default function DisclosurePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 space-y-8">
      <div className="space-y-3 text-center border-b border-brand-taupe-light/50 pb-8">
        <span className="text-[10px] md:text-xs font-semibold tracking-widest uppercase text-brand-taupe-dark">
          Compliance &amp; Transparency
        </span>
        <h1 className="font-serif text-3xl md:text-5xl font-extrabold text-brand-black tracking-tight">
          Affiliate Disclosure
        </h1>
      </div>

      <div className="prose prose-sm md:prose-base max-w-none text-brand-charcoal/90 leading-relaxed space-y-6">
        <p className="font-serif text-base md:text-lg font-semibold text-brand-black leading-relaxed">
          In compliance with the FTC Guidelines, please assume that any links, visual cards, or product blocks on The Decor Desk leading to third-party stores are affiliate links. If you click on these recommendations and complete a purchase, we may receive a small commission.
        </p>

        <h2 className="font-serif text-xl font-bold text-brand-black pt-4 border-t border-brand-taupe-light/40">
          What Is an Affiliate Link?
        </h2>
        <p>
          An affiliate link contains a special tracking parameter. When you click that link and purchase an item from the merchant (such as Amazon, Wayfair, or Target), the merchant pays us a small percentage of the sale as a referral fee. This happens at <strong>no extra cost to you</strong>—the price remains identical whether you use our link or search for the product directly.
        </p>

        <h2 className="font-serif text-xl font-bold text-brand-black pt-4 border-t border-brand-taupe-light/40">
          Amazon Associates Disclosure
        </h2>
        <p>
          The Decor Desk is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com. As an Amazon Associate, we earn from qualifying purchases.
        </p>

        <h2 className="font-serif text-xl font-bold text-brand-black pt-4 border-t border-brand-taupe-light/40">
          Our Editorial Integrity
        </h2>
        <p>
          We take enormous pride in curating elevated, beautiful home design recommendations. We do not accept payment to post positive reviews, nor do we recommend items solely for financial gain. Every product featured on our site is chosen based on aesthetic alignment, material quality, and real value for creating cozy living environments.
        </p>

        <div className="bg-brand-warmwhite border border-brand-taupe-light p-6 rounded-md text-xs md:text-sm text-brand-charcoal/80 mt-8">
          <p>
            Thank you for supporting The Decor Desk! The commissions we earn help us fund our web design hosting, content research, and curation efforts.
          </p>
        </div>
      </div>
    </div>
  );
}
