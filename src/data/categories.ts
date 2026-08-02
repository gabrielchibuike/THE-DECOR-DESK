export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
}

export const categories: Category[] = [
  {
    id: "living-room-ideas",
    name: "Living Room Ideas",
    slug: "living-room-ideas",
    description: "Inspiration, styling guides, and cozy layouts for your main living area.",
    image: "/images/categories/living-room.jpg"
  },
  {
    id: "bathroom-ideas",
    name: "Bathroom Ideas",
    slug: "bathroom-ideas",
    description: "Spa-like updates, smart storage solutions, and stylish vanity setups.",
    image: "/images/categories/bathroom.jpg"
  },
  {
    id: "bedroom-ideas",
    name: "Bedroom Ideas",
    slug: "bedroom-ideas",
    description: "Cozy layering tips, lighting design, and restful neutral color palettes.",
    image: "/images/categories/bedroom.jpg"
  },
  {
    id: "laundry-room-ideas",
    name: "Laundry Room Ideas",
    slug: "laundry-room-ideas",
    description: "Smart organization, beautiful shelving, and functional folding stations.",
    image: "/images/categories/laundry-room.jpg"
  },
  {
    id: "apartment-living-room-ideas",
    name: "Apartment Living Room Ideas",
    slug: "apartment-living-room-ideas",
    description: "Small-space layouts, double-duty furniture, and renter-friendly styling.",
    image: "/images/categories/apartment-living-room.jpg"
  },
  {
    id: "apartment-bathroom-ideas",
    name: "Apartment Bathroom Ideas",
    slug: "apartment-bathroom-ideas",
    description: "Renter-friendly vanity upgrades, space-saving organizers, and styling tips.",
    image: "/images/categories/apartment-bathroom.jpg"
  }
];

export function getCategoryBySlug(slug: string): Category | null {
  return categories.find(c => c.slug === slug) || null;
}
