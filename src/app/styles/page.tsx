import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { stylesList } from "@/data/styles";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Explore Interior Design Styles",
  description: "Discover Japandi, Warm Luxury, French Country, Boho, Grandmillennial, and Vintage aesthetic guides.",
};

export default function StylesIndexPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-12">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="text-[10px] md:text-xs font-semibold tracking-widest uppercase text-brand-taupe-dark bg-brand-taupe-light/35 border border-brand-taupe-light px-3 py-1 rounded">
          Interior Aesthetics
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-black tracking-tight">
          Explore by Style
        </h1>
        <p className="text-sm md:text-base text-brand-charcoal/80 leading-relaxed">
          Find the aesthetic that speaks to your personality and discover how to style it seamlessly in your home.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {stylesList.map((style) => (
          <Link
            key={style.slug}
            href={`/styles/${style.slug}`}
            className="group flex flex-col bg-brand-warmwhite border border-brand-taupe-light/60 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="relative aspect-[16/10] bg-brand-cream border-b border-brand-taupe-light/50 overflow-hidden">
              <Image
                src={style.imageUrl}
                alt={style.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end p-5">
                <span className="font-serif text-2xl font-bold text-white drop-shadow">{style.name}</span>
              </div>
            </div>
            <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-taupe-dark">{style.tagline}</p>
                <p className="text-xs text-brand-charcoal/80 line-clamp-3 leading-relaxed">{style.description}</p>
              </div>
              <div className="pt-3 border-t border-brand-taupe-light/40 flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-brand-black group-hover:underline flex items-center gap-1">
                  Explore {style.name} Style <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
