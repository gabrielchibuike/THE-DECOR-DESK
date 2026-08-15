import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getDigitalProductBySlug } from "@/data/digitalProducts";
import { Check } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const product = getDigitalProductBySlug(resolvedParams.slug);
  if (!product) return { title: "Not Found" };
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function DigitalProductPage({ params }: PageProps) {
  const resolvedParams = await params;
  const product = getDigitalProductBySlug(resolvedParams.slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start">
        {/* Left Col: Mockup */}
        <div className="relative aspect-square md:aspect-[4/5] bg-brand-cream border border-brand-taupe-light rounded-xl flex items-center justify-center p-8 sticky top-28">
          {product.imageUrl ? (
            <Image src={product.imageUrl} alt={product.name} fill className="object-cover" />
          ) : (
             <div className="text-center space-y-4">
               <div className="w-40 h-52 bg-brand-warmwhite border border-brand-taupe-light shadow-lg mx-auto flex items-center justify-center">
                 <span className="font-serif font-bold text-brand-taupe text-4xl">G</span>
               </div>
               <span className="font-serif text-2xl font-bold text-brand-black block">{product.name}</span>
               <span className="text-xs uppercase tracking-widest text-brand-taupe-dark">PDF Guide</span>
             </div>
          )}
        </div>

        {/* Right Col: Details */}
        <div className="space-y-8">
          <div className="space-y-4 border-b border-brand-taupe-light/60 pb-8">
            <h1 className="font-serif text-3xl md:text-5xl font-extrabold text-brand-black leading-tight">
              {product.name}
            </h1>
            <p className="text-xl font-sans text-brand-black font-semibold">
              ${product.price.toFixed(2)}
            </p>
            <p className="text-base text-brand-charcoal/80 leading-relaxed">
              {product.description}
            </p>
            <a 
              href={product.checkoutUrl}
              className="inline-block w-full text-center px-8 py-4 bg-brand-black text-brand-cream text-sm font-semibold uppercase tracking-wider rounded-md hover:bg-brand-taupe-dark transition duration-300 mt-4"
            >
              Buy Now — ${product.price.toFixed(2)}
            </a>
          </div>

          <div className="space-y-4">
            <h3 className="font-serif text-xl font-bold text-brand-black">What's Included</h3>
            <ul className="space-y-3">
              {product.includes.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-brand-taupe shrink-0 mt-0.5" />
                  <span className="text-sm text-brand-charcoal/80 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-serif text-xl font-bold text-brand-black">Key Benefits</h3>
            <ul className="space-y-3">
              {product.benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-taupe shrink-0 mt-2" />
                  <span className="text-sm text-brand-charcoal/80 leading-relaxed">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 bg-brand-taupe-light/20 border border-brand-taupe-light rounded-lg">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-brand-black mb-2">Who is this for?</h4>
            <p className="text-sm text-brand-charcoal/80 leading-relaxed">
              {product.whoIsItFor}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
