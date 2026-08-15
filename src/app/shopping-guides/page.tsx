import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getPostsByType, Post } from "@/lib/db/posts";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Shopping Guides",
  description: "Curated roundups, buying guides, and top finds to elevate your home.",
};

export default async function ShoppingGuidesIndex() {
  const posts = await getPostsByType("shopping_guide");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12">
      <div className="text-center space-y-3">
        <h1 className="font-serif text-3xl md:text-5xl font-extrabold text-brand-black tracking-tight">
          Shopping Guides
        </h1>
        <p className="text-sm text-brand-charcoal/70 uppercase tracking-widest max-w-md mx-auto">
          Expert recommendations, affordable finds, and curated roundups.
        </p>
      </div>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <GuideCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-brand-warmwhite border border-brand-taupe-light/50 rounded-lg">
          <p className="font-serif text-lg text-brand-charcoal/80">No shopping guides available yet.</p>
        </div>
      )}
    </div>
  );
}

function GuideCard({ post }: { post: Post }) {
  const date = post.published_at
    ? new Date(post.published_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    : "";
  return (
    <article className="group flex flex-col space-y-3 bg-brand-warmwhite border border-brand-taupe-light/40 rounded-lg overflow-hidden p-4 shadow-sm hover:shadow-md transition-all duration-300">
      <Link href={`/shopping-guides/${post.slug}`} className="block overflow-hidden rounded-md relative aspect-video bg-brand-cream border border-brand-taupe-light/50">
        {post.hero_image_url && (
          <Image src={post.hero_image_url} alt={post.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
        )}
      </Link>
      <div className="flex flex-col space-y-2 flex-grow justify-between pt-2">
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-[10px] md:text-xs font-semibold tracking-wider uppercase">
            <span className="text-brand-taupe-dark">Shopping Guide</span>
            <span className="h-1 w-1 rounded-full bg-brand-taupe" />
            <time className="text-brand-charcoal/60">{date}</time>
          </div>
          <h3 className="font-serif text-lg md:text-xl font-bold text-brand-black leading-snug group-hover:text-brand-taupe-dark transition-colors duration-200">
            <Link href={`/shopping-guides/${post.slug}`}>{post.title}</Link>
          </h3>
          <p className="text-xs md:text-sm text-brand-charcoal/70 line-clamp-3 leading-relaxed">{post.meta_description}</p>
        </div>
        <div className="pt-4 border-t border-brand-taupe-light/30">
          <Link href={`/shopping-guides/${post.slug}`} className="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-brand-black group-hover:underline">
            View Guide &rarr;
          </Link>
        </div>
      </div>
    </article>
  );
}
