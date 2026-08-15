export interface DigitalProduct {
  id: string;
  slug: string;
  name: string;
  price: number;
  description: string;
  benefits: string[];
  includes: string[];
  whoIsItFor: string;
  imageUrl?: string;
  checkoutUrl?: string; // e.g. Stripe Payment Link
}

export const digitalProducts: DigitalProduct[] = [
  {
    id: "dp_blueprint_001",
    slug: "elevated-home-decor-blueprint",
    name: "The Elevated Home Decor Blueprint",
    price: 15.00,
    description: "A practical room-by-room system for creating a beautiful, elevated home without wasting money on decor that doesn't work together.",
    benefits: [
      "Stop wasting money on pieces that don't match",
      "Learn how to mix high and low decor seamlessly",
      "Discover your true interior aesthetic",
      "Gain confidence in furniture placement and layout"
    ],
    includes: [
      "50+ page Room-by-Room Guide (PDF)",
      "Budget Planning Worksheets",
      "Color Palette Cheat Sheets",
      "Exclusive curated shopping lists"
    ],
    whoIsItFor: "Anyone who feels overwhelmed by decorating and wants a step-by-step system to make their home look cohesive and expensive on a budget.",
    checkoutUrl: "#", // Placeholder for actual payment link
  }
];

export function getDigitalProductBySlug(slug: string): DigitalProduct | null {
  return digitalProducts.find(p => p.slug === slug) || null;
}
