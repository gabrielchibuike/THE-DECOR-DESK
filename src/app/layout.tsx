import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { getAllCategories } from "@/lib/db/categories";
import "./globals.css";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "The Decor Desk | Warm & Organic Modern Home Inspiration",
    template: "%s | The Decor Desk",
  },
  description: "Discover curated shopping guides, organizing checklists, small space renter-friendly layouts, and beautiful design inspiration for your home.",
  keywords: ["home decor", "organic modern", "laundry room ideas", "living room ideas", "interior styling", "apartment decor"],
  authors: [{ name: "The Decor Desk Team" }],
  creator: "The Decor Desk",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://thedecordesk.com"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "The Decor Desk | Home & Lifestyle Media",
    description: "Curated shopping guides and cozy design inspiration for laundry rooms, bedrooms, and apartments.",
    url: "/",
    siteName: "The Decor Desk",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Decor Desk",
    description: "Curated shopping guides and cozy design inspiration.",
  },
  robots: { index: true, follow: true },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Fetch categories server-side for the Header dropdown
  const categories = await getAllCategories();

  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans bg-brand-cream text-brand-charcoal antialiased min-h-screen flex flex-col selection:bg-brand-taupe-light selection:text-brand-black">
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
        <Header categories={categories} />
        <main className="flex-grow flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
