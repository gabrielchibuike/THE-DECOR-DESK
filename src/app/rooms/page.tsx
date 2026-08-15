import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Explore by Room",
  description: "Browse room-by-room home decor inspiration, layout guides, and styling ideas.",
};

const roomCategories = [
  { name: "Bathroom", slug: "bathroom-ideas", img: "/images/categories/bathroom.jpg", description: "Refresh your bathroom with beautiful, spa-inspired styling ideas and vanity updates." },
  { name: "Bedroom", slug: "bedroom-ideas", img: "/images/categories/bedroom.jpg", description: "Create a cozy, restful sanctuary with curated bedding, lighting, and bedroom layouts." },
  { name: "Living Room", slug: "living-room-ideas", img: "/images/categories/living-room.jpg", description: "Style a warm, inviting living room with comfortable seating and organic decor." },
  { name: "Kitchen", slug: "kitchen-ideas", img: "/images/categories/kitchen.jpg", description: "Elevate your kitchen with warm wood tones, hardware upgrades, and functional decor." },
  { name: "Laundry", slug: "laundry-room-ideas", img: "/images/categories/laundry-room.jpg", description: "Make laundry day beautiful with smart organization and charming utility styling." },
  { name: "Apartment & Small Spaces", slug: "apartment-living-room-ideas", img: "/images/categories/apartment-living-room.jpg", description: "Maximize small square footage with multi-functional furniture and renter-friendly decor." },
];

export default function RoomsIndexPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-12">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="text-[10px] md:text-xs font-semibold tracking-widest uppercase text-brand-taupe-dark bg-brand-taupe-light/35 border border-brand-taupe-light px-3 py-1 rounded">
          Room-by-Room Guide
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-black tracking-tight">
          Explore by Room
        </h1>
        <p className="text-sm md:text-base text-brand-charcoal/80 leading-relaxed">
          Curated inspiration, layout guides, and practical styling tips for every space in your home.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {roomCategories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/blog/${cat.slug}`}
            className="group relative aspect-[4/3] rounded-lg overflow-hidden border border-brand-taupe-light/50 bg-brand-cream flex flex-col justify-end p-6 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <Image
              src={cat.img}
              alt={cat.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105 brightness-[0.85] group-hover:brightness-90"
            />
            <div className="relative bg-brand-warmwhite/95 backdrop-blur-sm border border-brand-taupe-light p-4 rounded-md text-left transition-all duration-300 group-hover:bg-brand-warmwhite">
              <h2 className="font-serif text-lg font-bold text-brand-black">{cat.name}</h2>
              <p className="text-xs text-brand-charcoal/80 line-clamp-2 mt-1 mb-3">{cat.description}</p>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-brand-taupe-dark flex items-center gap-1 group-hover:text-brand-black transition-colors">
                Explore Room Ideas <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
