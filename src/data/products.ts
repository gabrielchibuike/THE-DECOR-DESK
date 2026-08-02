export interface RetailerLink {
  retailerName: string;
  affiliateUrl: string;
  price?: string;
}

export interface Product {
  id: string;
  name: string;
  image: string;
  description: string;
  links: RetailerLink[];
}

export const products: Record<string, Product> = {
  "boucle-accent-chair": {
    id: "boucle-accent-chair",
    name: "Aesthetic Bouclé Accent Chair",
    image: "/images/products/boucle-chair.jpg",
    description: "A gorgeous, cozy bouclé chair with solid oak legs. Perfect for creating a warm, organic modern reading nook.",
    links: [
      { retailerName: "Amazon", affiliateUrl: "https://www.amazon.com", price: "$249.99" },
      { retailerName: "Wayfair", affiliateUrl: "https://www.wayfair.com", price: "$279.00" }
    ]
  },
  "oak-laundry-hamper": {
    id: "oak-laundry-hamper",
    name: "Solid Oak Double Laundry Hamper",
    image: "/images/products/laundry-hamper.jpg",
    description: "Elevate your laundry room with this beautiful double laundry hamper featuring a removable linen liner and soft-close lid.",
    links: [
      { retailerName: "Amazon", affiliateUrl: "https://www.amazon.com", price: "$129.99" },
      { retailerName: "Target", affiliateUrl: "https://www.target.com", price: "$119.50" }
    ]
  },
  "brass-vanity-mirror": {
    id: "brass-vanity-mirror",
    name: "Arched Thin Brass Vanity Mirror",
    image: "/images/products/brass-mirror.jpg",
    description: "A premium arched mirror with a thin brass frame. Ideal for adding a touch of elegance to any bathroom or entryway.",
    links: [
      { retailerName: "Amazon", affiliateUrl: "https://www.amazon.com", price: "$89.50" }
    ]
  },
  "linen-duvet-set": {
    id: "linen-duvet-set",
    name: "Pure French Flax Linen Duvet Cover Set",
    image: "/images/products/linen-bedding.jpg",
    description: "Breathable, pre-washed linen bedding set in a warm sand tone. Becomes softer with every single wash.",
    links: [
      { retailerName: "Amazon", affiliateUrl: "https://www.amazon.com", price: "$159.00" },
      { retailerName: "Target", affiliateUrl: "https://www.target.com", price: "$149.00" }
    ]
  },
  "ceramic-votive-set": {
    id: "ceramic-votive-set",
    name: "Handmade Textured Ceramic Vases (Set of 3)",
    image: "/images/products/ceramic-vases.jpg",
    description: "A set of three matte textured ceramic vases in graduating sizes. Perfect for styling built-ins, shelves, or console tables.",
    links: [
      { retailerName: "Amazon", affiliateUrl: "https://www.amazon.com", price: "$34.99" }
    ]
  }
};
