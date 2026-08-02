import Link from "next/link";
import EmailSignup from "./EmailSignup";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-taupe-light/30 border-t border-brand-taupe-light mt-auto">
      {/* Newsletter Block */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* <EmailSignup
          title="Elevate Your Inbox"
          description="Sign up for our newsletter to receive the latest home decor inspiration, layout guides, and exclusive shopping collections directly in your inbox."
          buttonText="Subscribe"
          layout="inline"
        /> */}

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-12 md:mt-16 pt-12 border-t border-brand-taupe-light/50">
          {/* Brand Col */}
          <div className="space-y-4 col-span-1 md:col-span-2">
            <span className="font-serif text-xl font-bold tracking-tight text-brand-black">
              THE DECOR <span className="text-brand-taupe font-normal font-sans text-xs tracking-widest uppercase ml-1">DESK</span>
            </span>
            <p className="text-xs md:text-sm text-brand-charcoal/70 leading-relaxed max-w-sm">
              We curate warm, organic, and elegant home decor inspiration and shopping recommendations to help you create a cozy and beautiful lifestyle retreat.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-black">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-xs text-brand-charcoal/70 hover:text-brand-black transition-colors duration-150">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-xs text-brand-charcoal/70 hover:text-brand-black transition-colors duration-150">
                  All Blog Posts
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-xs text-brand-charcoal/70 hover:text-brand-black transition-colors duration-150">
                  About the Brand
                </Link>
              </li>
              {/* <li>
                <Link href="/contact" className="text-xs text-brand-charcoal/70 hover:text-brand-black transition-colors duration-150">
                  Get in Touch
                </Link>
              </li> */}
            </ul>
          </div>

          {/* Legal Compliance */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-black">Compliance</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/disclosure" className="text-xs text-brand-charcoal/70 hover:text-brand-black transition-colors duration-150">
                  Affiliate Disclosure
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-xs text-brand-charcoal/70 hover:text-brand-black transition-colors duration-150">
                  Privacy Policy
                </Link>
              </li>
              {/* <li className="pt-3 border-t border-brand-taupe-light/40">
                <Link href="/admin/new-post" className="text-xs text-brand-taupe-dark hover:text-brand-black transition-colors duration-150 font-medium">
                  ✦ New Blog Post
                </Link>
              </li> */}
            </ul>
          </div>
        </div>

        {/* Affiliate Notice Block */}
        <div className="mt-12 pt-8 border-t border-brand-taupe-light/50 text-left">
          <p className="text-[10px] md:text-xs text-brand-charcoal/60 leading-relaxed">
            <strong>Affiliate Disclosure:</strong> The Decor Desk is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com. We also link to other curated home styling platforms. When you buy through our links, we may earn an affiliate commission at no extra cost to you.
          </p>
          <div className="flex flex-col sm:flex-row justify-between items-center mt-6 text-[10px] md:text-xs text-brand-charcoal/60 gap-4">
            <span>&copy; {currentYear} The Decor Desk. All rights reserved.</span>
            <span>Designed for beautiful living spaces.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
