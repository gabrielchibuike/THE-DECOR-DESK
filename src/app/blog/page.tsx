import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllPosts, Post } from "@/lib/db/posts";
import { getAllCategories } from "@/lib/db/categories";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "The Styling Journal",
  description: "Browse all our articles, design tips, and affiliate recommendations across laundry, living, bed, and bath ideas.",
};

const POSTS_PER_PAGE = 6;

interface PageProps {
  searchParams: Promise<{ category?: string; page?: string }>;
}

export default async function BlogIndex({ searchParams }: PageProps) {
  const params = await searchParams;
  const activeCategory = params.category || "";
  const currentPage = parseInt(params.page || "1", 10);

  const [allPosts, categories] = await Promise.all([
    getAllPosts(),
    getAllCategories(),
  ]);

  const posts = activeCategory
    ? allPosts.filter((p) => p.categories?.slug === activeCategory)
    : allPosts;

  const totalPosts = posts.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = posts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12">
      <div className="text-center space-y-3">
        <h1 className="font-serif text-3xl md:text-5xl font-extrabold text-brand-black tracking-tight">
          The Styling Journal
        </h1>
        <p className="text-sm text-brand-charcoal/70 uppercase tracking-widest max-w-md mx-auto">
          Explore our collection of interior styling secrets, checklists, and shop the look features.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap justify-center gap-2 border-b border-brand-taupe-light/50 pb-6">
        <Link
          href="/blog"
          className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition duration-150 border ${
            !activeCategory ? "bg-brand-black text-brand-cream border-brand-black" : "bg-brand-warmwhite border-brand-taupe-light text-brand-charcoal hover:bg-brand-cream"
          }`}
        >
          All Categories
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/blog?category=${cat.slug}`}
            className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition duration-150 border ${
              activeCategory === cat.slug ? "bg-brand-black text-brand-cream border-brand-black" : "bg-brand-warmwhite border-brand-taupe-light text-brand-charcoal hover:bg-brand-cream"
            }`}
          >
            {cat.name}
          </Link>
        ))}
      </div>

      {/* Post Grid */}
      {paginatedPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-brand-warmwhite border border-brand-taupe-light/50 rounded-lg">
          <p className="font-serif text-lg text-brand-charcoal/80">No articles found under this selection.</p>
          <Link href="/blog" className="text-xs font-semibold uppercase tracking-wider text-brand-taupe-dark hover:underline block mt-2">
            Clear Filters &rarr;
          </Link>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 border-t border-brand-taupe-light/50 pt-8 mt-12">
          {currentPage > 1 ? (
            <Link href={`/blog?page=${currentPage - 1}${activeCategory ? `&category=${activeCategory}` : ""}`} className="px-4 py-2 border border-brand-taupe-light bg-brand-warmwhite rounded-md text-xs font-semibold uppercase tracking-wider hover:bg-brand-cream transition duration-150">
              &larr; Previous
            </Link>
          ) : (
            <span className="px-4 py-2 border border-brand-taupe-light bg-brand-warmwhite/40 rounded-md text-xs font-semibold uppercase tracking-wider text-brand-charcoal/30 cursor-not-allowed">&larr; Previous</span>
          )}
          <span className="text-xs font-medium text-brand-charcoal/80">Page {currentPage} of {totalPages}</span>
          {currentPage < totalPages ? (
            <Link href={`/blog?page=${currentPage + 1}${activeCategory ? `&category=${activeCategory}` : ""}`} className="px-4 py-2 border border-brand-taupe-light bg-brand-warmwhite rounded-md text-xs font-semibold uppercase tracking-wider hover:bg-brand-cream transition duration-150">
              Next &rarr;
            </Link>
          ) : (
            <span className="px-4 py-2 border border-brand-taupe-light bg-brand-warmwhite/40 rounded-md text-xs font-semibold uppercase tracking-wider text-brand-charcoal/30 cursor-not-allowed">Next &rarr;</span>
          )}
        </div>
      )}
    </div>
  );
}

function PostCard({ post }: { post: Post }) {
  const catSlug = post.categories?.slug ?? "";
  const catName = post.categories?.name ?? catSlug;
  const date = post.published_at
    ? new Date(post.published_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    : "";
  return (
    <article className="group flex flex-col space-y-3 bg-brand-warmwhite border border-brand-taupe-light/40 rounded-lg overflow-hidden p-4 shadow-sm hover:shadow-md transition-all duration-300">
      <Link href={`/blog/${catSlug}/${post.slug}`} className="block overflow-hidden rounded-md relative aspect-video bg-brand-cream border border-brand-taupe-light/50">
        {post.hero_image_url && (
          <Image src={post.hero_image_url} alt={post.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
        )}
      </Link>
      <div className="flex flex-col space-y-2 flex-grow justify-between pt-2">
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-[10px] md:text-xs font-semibold tracking-wider uppercase">
            <Link href={`/blog/${catSlug}`} className="text-brand-taupe-dark hover:text-brand-black transition-colors">{catName}</Link>
            <span className="h-1 w-1 rounded-full bg-brand-taupe" />
            <time className="text-brand-charcoal/60">{date}</time>
          </div>
          <h3 className="font-serif text-lg md:text-xl font-bold text-brand-black leading-snug group-hover:text-brand-taupe-dark transition-colors duration-200">
            <Link href={`/blog/${catSlug}/${post.slug}`}>{post.title}</Link>
          </h3>
          <p className="text-xs md:text-sm text-brand-charcoal/70 line-clamp-3 leading-relaxed">{post.meta_description}</p>
        </div>
        <div className="pt-4 border-t border-brand-taupe-light/30">
          <Link href={`/blog/${catSlug}/${post.slug}`} className="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-brand-black group-hover:underline">
            Read Article &rarr;
          </Link>
        </div>
      </div>
    </article>
  );
}
