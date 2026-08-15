export interface StyleItem {
  name: string;
  slug: string;
  tagline: string;
  description: string;
  imageUrl: string;
  characteristics: string[];
}

export const stylesList: StyleItem[] = [
  {
    name: "Japandi",
    slug: "japandi",
    tagline: "Japanese Minimalism x Scandinavian Warmth",
    description: "The perfect fusion of Japanese Wabi-Sabi simplicity and Scandinavian cozy functionalism. Focuses on natural wood tones, organic textures, muted earth tones, and uncluttered serenity.",
    imageUrl: "/images/categories/living-room.jpg",
    characteristics: ["Light Oak & Cedar Woods", "Low-Profile Furniture", "Muted Neutral Palette", "Handmade Ceramics", "Textured Linens & Wool"]
  },
  {
    name: "Warm Luxury",
    slug: "warm-luxury",
    tagline: "Sophisticated Comfort & Elevated Neutrals",
    description: "Refined, understated elegance that feels plush yet deeply welcoming. Combines rich velvet, polished stone, subtle metallic accents, and tailored architectural silhouettes.",
    imageUrl: "/images/categories/bedroom.jpg",
    characteristics: ["Bouclé & Velvet Fabrics", "Warm Taupes & Alabasters", "Subtle Brass & Bronze Details", "Layered Architectural Lighting", "Sculptural Furniture"]
  },
  {
    name: "French Country",
    slug: "french-country",
    tagline: "Rustic European Charm & Timeless Romance",
    description: "Soft, romantic European aesthetic featuring weathered wood patinas, distressed whites, floral linens, and vintage ironwork.",
    imageUrl: "/images/categories/bathroom.jpg",
    characteristics: ["Distressed White & Reclaimed Wood", "Wrought Iron Hardware", "Soft Floral & Gingham Patterns", "Antiqued Mirrors", "Earthy Terracotta & Cream"]
  },
  {
    name: "Boho",
    slug: "boho",
    tagline: "Earthy, Layered & Globally Inspired",
    description: "Eclectic, organic living space enriched with woven rattan, macramé, lush indoor greenery, and rich warm-hued textiles.",
    imageUrl: "/images/categories/apartment-living-room.jpg",
    characteristics: ["Woven Rattan & Jute", "Layered Area Rugs", "Indoor Botanical Greenery", "Warm Terracotta & Mustard Tones", "Artisanal Wall Hangings"]
  },
  {
    name: "Grandmillennial",
    slug: "grandmillennial",
    tagline: "Traditional Nostalgia with a Fresh Modern Twist",
    description: "A playful, modern revival of classic design heritage — featuring scalloped trims, chintz prints, pleated lampshades, and heirloom accents.",
    imageUrl: "/images/categories/laundry-room.jpg",
    characteristics: ["Scalloped Edges & Pleated Shades", "Floral & Chintz Patterns", "Monogrammed Linens", "Classic Brass & Crystal", "Chinoiserie Accents"]
  },
  {
    name: "Vintage",
    slug: "vintage",
    tagline: "Curated Antiques & Storied Patina",
    description: "Character-driven spaces filled with authentic antique finds, weathered leather, mid-century treasures, and rich historical depth.",
    imageUrl: "/images/categories/apartment-bathroom.jpg",
    characteristics: ["Aged Leather & Dark Walnut", "Gilded Antique Frames", "Historical Gallery Walls", "Brass Vessel Accents", "Pre-loved Curiosities"]
  }
];

export function getStyleBySlug(slug: string): StyleItem | null {
  return stylesList.find((s) => s.slug === slug) || null;
}
