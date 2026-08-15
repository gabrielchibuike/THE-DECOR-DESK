import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllPosts, extractHeadings, ContentBlockType } from "@/lib/db/posts";
import { getProductById } from "@/lib/db/products";
import { ArrowLeft, Bookmark, Calendar, Pin } from "lucide-react";
import EmailSignup from "@/components/EmailSignup";
import TableOfContents from "@/components/TableOfContents";
import ArticleCTA from "@/components/ArticleCTA";

export const revalidate = 60;

interface GuidePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post || post.post_type !== "shopping_guide") return { title: "Guide Not Found" };
  return {
    title: post.title,
    description: post.meta_description ?? undefined,
    keywords: post.keywords ?? undefined,
    openGraph: {
      title: post.title,
      description: post.meta_description ?? undefined,
      images: post.hero_image_url ? [{ url: post.hero_image_url }] : [],
      type: "article",
      publishedTime: post.published_at ?? undefined,
      modifiedTime: post.updated_at,
    },
  };
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts
    .filter((p) => p.post_type === "shopping_guide")
    .map((p) => ({ slug: p.slug }));
}

export default async function ShoppingGuideDetail({ params }: GuidePageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post || post.post_type !== "shopping_guide") notFound();

  const formattedDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    : "";

  const headings = extractHeadings(post.content);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.meta_description,
    image: post.hero_image_url ? `https://thedecordesk.com${post.hero_image_url}` : undefined,
    datePublished: post.published_at,
    dateModified: post.updated_at,
    author: { "@type": "Organization", name: "The Decor Desk Editor", url: "https://thedecordesk.com/about" },
    publisher: { "@type": "Organization", name: "The Decor Desk", logo: { "@type": "ImageObject", url: "https://thedecordesk.com/images/logo.png" } },
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://thedecordesk.com/shopping-guides/${slug}` },
  };

  const pinterestShareUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(`https://thedecordesk.com/shopping-guides/${slug}`)}&media=${encodeURIComponent(`https://thedecordesk.com${post.hero_image_url ?? ""}`)}&description=${encodeURIComponent(post.title)}`;

  return (
    <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="mb-8">
        <Link href={`/shopping-guides`} className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-brand-charcoal/70 hover:text-brand-black transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Shopping Guides</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-8 space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <span className="inline-block text-[10px] md:text-xs font-bold tracking-widest uppercase text-brand-taupe-dark bg-brand-taupe-light/35 border border-brand-taupe-light px-3 py-1 rounded">
              Shopping Guide
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-black leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs text-brand-charcoal/75 border-y border-brand-taupe-light/50 py-3 mt-4">
              <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-brand-taupe" /><time>{formattedDate}</time></span>
            </div>
          </div>

          {/* Hero Image */}
          {post.hero_image_url && (
            <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-brand-cream border border-brand-taupe-light/60">
              <Image src={post.hero_image_url} alt={post.title} fill priority sizes="(max-width: 1024px) 100vw, 800px" className="object-cover" />
            </div>
          )}

          {/* Affiliate Disclosure */}
          <div className="bg-brand-taupe-light/20 border border-brand-taupe-light p-4 rounded-md text-xs text-brand-charcoal/80 leading-relaxed">
            <p><strong>Affiliate Disclosure:</strong> This post contains affiliate links. If you click and purchase, we may receive a small commission at no extra cost to you. Read our full{" "}
              <Link href="/disclosure" className="underline hover:text-brand-black">FTC Affiliate Disclosure</Link> here.
            </p>
          </div>

          {/* Mobile TOC */}
          <div className="block lg:hidden">
            <TableOfContents headings={headings} />
          </div>

          {/* Content Blocks */}
          <div className="space-y-0">
            {post.content.map((block, idx) => (
              <ContentBlockRenderer key={idx} block={block} />
            ))}
          </div>

          <ArticleCTA categorySlug="shopping_guide" />

          {/* Footer CTA */}
          <div className="border-t border-brand-taupe-light/60 pt-8 mt-12 flex flex-col sm:flex-row justify-between items-center gap-6">
            <a href={pinterestShareUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-3 bg-[#bd081c] hover:bg-[#ad071a] text-white rounded-md text-xs font-semibold uppercase tracking-wider transition-colors duration-200">
              <Pin className="w-4 h-4 fill-current" />
              <span>Save this guide to Pinterest</span>
            </a>
            <div className="flex items-center gap-2 text-xs text-brand-charcoal/60">
              <Bookmark className="w-4 h-4 text-brand-taupe" />
              <span>Bookmark for shopping later</span>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="hidden lg:block lg:col-span-4 space-y-8 lg:sticky lg:top-28 lg:self-start">
          <TableOfContents headings={headings} />
          <div className="bg-brand-taupe-light/20 border border-brand-taupe-light p-6 rounded-lg text-center space-y-4">
            <h4 className="font-serif text-lg font-bold text-brand-black">About The Decor Desk</h4>
            <p className="text-xs text-brand-charcoal/80 leading-relaxed">
              We translate luxury home editorial concepts into attainable, renter-friendly, and organic lifestyle ideas for daily living.
            </p>
            <Link href="/about" className="text-[10px] font-semibold tracking-wider uppercase text-brand-taupe-dark hover:underline block">
              Our Story &rarr;
            </Link>
          </div>
        </aside>
      </div>
    </article>
  );
}

// ── Block Renderer ───────────────────────────────────────────
async function ContentBlockRenderer({ block }: { block: ContentBlockType }) {
  switch (block.type) {
    case "paragraph":
      return <p className="text-brand-charcoal/90 text-sm md:text-base leading-relaxed mb-6">{block.text}</p>;

    case "heading":
      const HeadingTag = `h${block.level}` as "h2" | "h3";
      const headingId = block.text.toLowerCase().replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-");
      const headingClass = block.level === 2
        ? "scroll-mt-24 font-serif text-2xl font-semibold mt-10 mb-4 text-brand-black"
        : "scroll-mt-24 font-serif text-xl font-semibold mt-8 mb-3 text-brand-black";
      return <HeadingTag id={headingId} className={headingClass}>{block.text}</HeadingTag>;

    case "image":
      return (
        <figure className="my-8">
          <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-brand-cream border border-brand-taupe-light/60">
            <Image src={block.url} alt={block.alt} fill sizes="(max-width: 1024px) 100vw, 700px" className="object-cover" />
          </div>
          {block.caption && <figcaption className="text-center text-xs text-brand-charcoal/60 mt-2 italic">{block.caption}</figcaption>}
        </figure>
      );

    case "product_block":
      return <InlineProductBlock block={block} />;

    case "divider":
      return <hr className="my-8 border-brand-taupe-light" />;

    default:
      return null;
  }
}

async function InlineProductBlock({ block }: { block: Extract<ContentBlockType, { type: "product_block" }> }) {
  if (block.productName || block.productImage || block.affiliateUrl) {
    return (
      <div className="my-10 bg-brand-warmwhite border border-brand-taupe-light rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="bg-brand-taupe-light/20 px-6 py-3 border-b border-brand-taupe-light flex justify-between items-center">
          <span className="font-serif text-sm font-semibold tracking-wide uppercase text-brand-black">{block.productCategory || "Shop the Look"}</span>
          <span className="text-[10px] uppercase font-sans tracking-widest text-brand-taupe-dark bg-brand-warmwhite px-2 py-0.5 rounded border border-brand-taupe-light">Affiliate Recommendation</span>
        </div>
        <div className="p-6 flex flex-col md:flex-row gap-6 items-center md:items-stretch">
          {block.productImage && (
            <div className="w-full md:w-1/3 min-h-[200px] relative rounded-md overflow-hidden bg-brand-cream border border-brand-taupe-light flex-shrink-0">
              <Image src={block.productImage} alt={block.productName ?? ""} fill sizes="(max-width: 768px) 100vw, 300px" className="object-cover transition-transform duration-500 hover:scale-105" />
            </div>
          )}
          <div className="w-full md:w-2/3 flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h4 className="font-serif text-xl font-bold text-brand-black leading-tight">{block.productName}</h4>
            </div>
            {block.affiliateUrl && (
              <div className="space-y-3 pt-2">
                <span className="text-xs font-semibold text-brand-taupe-dark uppercase tracking-widest block">Available Retailers:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href={block.affiliateUrl}
                    target="_blank"
                    rel="nofollow sponsored noopener"
                    className="flex justify-between items-center px-4 py-3 bg-brand-cream hover:bg-brand-taupe-light/50 border border-brand-taupe rounded-md text-brand-black text-xs font-semibold uppercase tracking-wider transition-colors duration-200"
                  >
                    <span>Buy on {block.retailerName || "Retailer"}</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Legacy fallback
  if (!block.productId) return null;
  const product = await getProductById(block.productId);
  if (!product) return null;

  return (
    <div className="my-10 bg-brand-warmwhite border border-brand-taupe-light rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="bg-brand-taupe-light/20 px-6 py-3 border-b border-brand-taupe-light flex justify-between items-center">
        <span className="font-serif text-sm font-semibold tracking-wide uppercase text-brand-black">Shop the Look</span>
        <span className="text-[10px] uppercase font-sans tracking-widest text-brand-taupe-dark bg-brand-warmwhite px-2 py-0.5 rounded border border-brand-taupe-light">Affiliate Recommendation</span>
      </div>
      <div className="p-6 flex flex-col md:flex-row gap-6 items-center md:items-stretch">
        {product.image_url && (
          <div className="w-full md:w-1/3 min-h-[200px] relative rounded-md overflow-hidden bg-brand-cream border border-brand-taupe-light flex-shrink-0">
            <Image src={product.image_url} alt={product.name} fill sizes="(max-width: 768px) 100vw, 300px" className="object-cover transition-transform duration-500 hover:scale-105" />
          </div>
        )}
        <div className="w-full md:w-2/3 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <h4 className="font-serif text-xl font-bold text-brand-black leading-tight">{product.name}</h4>
            {product.description && <p className="text-sm text-brand-charcoal/80 leading-relaxed">{product.description}</p>}
          </div>
          <div className="space-y-3 pt-2">
            <span className="text-xs font-semibold text-brand-taupe-dark uppercase tracking-widest block">Available Retailers:</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(product.retailers ?? []).map((link) => (
                <a
                  key={link.retailerName}
                  href={`/go/${product.id}?r=${encodeURIComponent(link.retailerName)}`}
                  target="_blank"
                  rel="nofollow sponsored noopener"
                  className="flex justify-between items-center px-4 py-3 bg-brand-cream hover:bg-brand-taupe-light/50 border border-brand-taupe rounded-md text-brand-black text-xs font-semibold uppercase tracking-wider transition-colors duration-200"
                >
                  <span>Buy on {link.retailerName}</span>
                  {link.price && <span className="text-brand-taupe-dark font-medium normal-case">{link.price}</span>}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
