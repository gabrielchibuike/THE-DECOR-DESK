import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getStyleBySlug, stylesList } from "@/data/styles";
import { getAllPosts, Post } from "@/lib/db/posts";
import { getAllProducts, Product } from "@/lib/db/products";
import { ArrowLeft, Check, ArrowRight, ExternalLink } from "lucide-react";
import EmailSignup from "@/components/EmailSignup";

interface StylePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: StylePageProps): Promise<Metadata> {
  const { slug } = await params;
  const style = getStyleBySlug(slug);
  if (!style) return { title: "Style Not Found" };
  return {
    title: `${style.name} Style Guide | Interior Design & Shopping`,
    description: style.description,
  };
}

export async function generateStaticParams() {
  return stylesList.map((s) => ({ slug: s.slug }));
}

export default async function StyleDetailPage({ params }: StylePageProps) {
  const { slug } = await params;
  const style = getStyleBySlug(slug);

  if (!style) {
    notFound();
  }

  const [allPosts, allProducts] = await Promise.all([
    getAllPosts(),
    getAllProducts(),
  ]);

  // Related articles (filter posts that match keywords or description or default to first 3)
  const relatedPosts = allPosts.slice(0, 3);

  // Relevant products
  const products = allProducts.slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-16">
      {/* Back Link */}
      <div>
        <Link href="/styles" className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-brand-charcoal/70 hover:text-brand-black transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Styles</span>
        </Link>
      </div>

      {/* Header & Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-brand-warmwhite border border-brand-taupe-light p-6 md:p-10 rounded-xl shadow-sm">
        <div className="lg:col-span-7 space-y-5">
          <span className="inline-block text-[10px] md:text-xs font-bold tracking-widest uppercase text-brand-taupe-dark bg-brand-taupe-light/35 border border-brand-taupe-light px-3 py-1 rounded">
            Style Blueprint
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-black tracking-tight leading-tight">
            {style.name} Style Guide
          </h1>
          <p className="text-sm md:text-base font-medium text-brand-taupe-dark italic">
            {style.tagline}
          </p>
          <p className="text-sm md:text-base text-brand-charcoal/85 leading-relaxed">
            {style.description}
          </p>

          {/* Characteristics */}
          <div className="pt-4 border-t border-brand-taupe-light/50 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-black">Key Style Elements</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {style.characteristics.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-brand-charcoal/90">
                  <Check className="w-3.5 h-3.5 text-brand-taupe shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="lg:col-span-5 relative aspect-square rounded-lg overflow-hidden border border-brand-taupe-light/60 bg-brand-cream shadow-md">
          <Image
            src={style.imageUrl}
            alt={style.name}
            fill
            priority
            className="object-cover"
          />
        </div>
      </div>

      {/* Relevant Products / Shop My Finds for this Style */}
      <section className="space-y-8">
        <div className="flex justify-between items-end border-b border-brand-taupe-light/60 pb-3">
          <div className="space-y-1">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-brand-black">
              Shop My {style.name} Finds
            </h2>
            <p className="text-xs text-brand-charcoal/70 uppercase tracking-widest">
              Hand-picked furniture and accents in {style.name} aesthetic
            </p>
          </div>
          <Link href="/shop-my-finds" className="text-xs font-semibold uppercase tracking-wider text-brand-taupe-dark hover:text-brand-black flex items-center gap-1 group transition-colors">
            <span>View All Shop Finds</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="group flex flex-col bg-brand-warmwhite border border-brand-taupe-light/50 rounded-lg overflow-hidden p-4 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="relative aspect-square rounded-md overflow-hidden bg-brand-cream border border-brand-taupe-light/40 mb-3">
                  {product.image_url ? (
                    <Image src={product.image_url} alt={product.name} fill sizes="250px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-brand-charcoal/40">No Image</div>
                  )}
                </div>
                <div className="space-y-1.5 flex-grow">
                  <h3 className="font-serif text-sm font-bold text-brand-black line-clamp-1">{product.name}</h3>
                  {product.description && <p className="text-[11px] text-brand-charcoal/70 line-clamp-2">{product.description}</p>}
                </div>
                <div className="pt-3 mt-3 border-t border-brand-taupe-light/40 space-y-1">
                  {(product.retailers ?? []).map((link, idx) => (
                    <a
                      key={idx}
                      href={`/go/${product.id}?r=${encodeURIComponent(link.retailerName)}`}
                      target="_blank"
                      rel="nofollow sponsored noopener"
                      className="flex justify-between items-center w-full px-3 py-1.5 bg-brand-cream hover:bg-brand-taupe hover:text-brand-cream text-brand-black text-[10px] font-semibold uppercase tracking-wider rounded transition-colors duration-200"
                    >
                      <span>{link.retailerName}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-brand-charcoal/60">No products available in this style category yet.</p>
        )}
      </section>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="space-y-8">
          <div className="border-b border-brand-taupe-light/60 pb-3">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-brand-black">
              Articles Featuring {style.name} Inspiration
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((post) => {
              const catSlug = post.categories?.slug ?? "bathroom-ideas";
              return (
                <article key={post.id} className="group flex flex-col space-y-3 bg-brand-warmwhite border border-brand-taupe-light/40 rounded-lg overflow-hidden p-4 shadow-sm hover:shadow-md transition-all duration-300">
                  <Link href={`/blog/${catSlug}/${post.slug}`} className="block overflow-hidden rounded-md relative aspect-video bg-brand-cream border border-brand-taupe-light/50">
                    {post.hero_image_url && <Image src={post.hero_image_url} alt={post.title} fill sizes="33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />}
                  </Link>
                  <div className="space-y-2 pt-1 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif text-base font-bold text-brand-black leading-snug group-hover:text-brand-taupe-dark transition-colors">
                        <Link href={`/blog/${catSlug}/${post.slug}`}>{post.title}</Link>
                      </h3>
                      <p className="text-xs text-brand-charcoal/70 line-clamp-2 mt-1">{post.meta_description}</p>
                    </div>
                    <div className="pt-3 border-t border-brand-taupe-light/30">
                      <Link href={`/blog/${catSlug}/${post.slug}`} className="text-[10px] font-semibold uppercase tracking-wider text-brand-black group-hover:underline">
                        Read Article &rarr;
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}

      {/* Free Resource Lead Magnet */}
      <section>
        <EmailSignup
          title={`Download the ${style.name} Style Starter Sheet`}
          description="Get our free room-by-room breakdown, furniture pairing guide, and curated budget sources."
          buttonText="Get Free Style Sheet"
          leadMagnetName={`${style.name} Style Starter Sheet`}
        />
      </section>
    </div>
  );
}
