import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Shop My Finds",
  description: "Curated home decor pieces, furniture, and styling accents.",
};

const shopCategories = [
  { name: "Bedroom Finds", slug: "bedroom-finds", img: "/images/categories/bedroom.jpg" },
  { name: "Living Room Finds", slug: "living-room-finds", img: "/images/categories/living-room.jpg" },
  { name: "Bathroom Finds", slug: "bathroom-finds", img: "/images/categories/bathroom.jpg" },
  { name: "Kitchen Finds", slug: "kitchen-finds", img: "/images/categories/kitchen.jpg" },
  { name: "Lighting", slug: "lighting", img: "/images/categories/apartment-living-room.jpg" },
  { name: "Organization", slug: "organization", img: "/images/categories/laundry-room.jpg" },
];

export default function ShopMyFindsIndex() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="font-serif text-4xl md:text-5xl font-extrabold text-brand-black tracking-tight">
          Shop My Finds
        </h1>
        <p className="text-sm md:text-base text-brand-charcoal/80 max-w-xl mx-auto leading-relaxed">
          Shop the exact pieces featured across our design collections and Pinterest boards.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {shopCategories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/shop-my-finds/${cat.slug}`}
            className="group relative aspect-square rounded-lg overflow-hidden border border-brand-taupe-light bg-brand-cream shadow-sm hover:shadow-md transition-all duration-300"
          >
            <Image
              src={cat.img}
              alt={cat.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105 brightness-[0.85] group-hover:brightness-90"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-brand-warmwhite/90 backdrop-blur-sm border border-brand-taupe-light px-6 py-3 rounded-md transition-all duration-300 group-hover:bg-brand-warmwhite">
                <h3 className="font-serif text-lg font-bold text-brand-black">{cat.name}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
