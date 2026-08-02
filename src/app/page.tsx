import Link from "next/link";
import Image from "next/image";
import { getAllPosts, getFeaturedPost } from "@/lib/db/posts";
import { getAllCategories } from "@/lib/db/categories";
import EmailSignup from "@/components/EmailSignup";
import { Search, ArrowRight, Star } from "lucide-react";

export const revalidate = 60; // ISR: revalidate every 60s

export default async function Home() {
  const [categories, allPosts, featuredPostFromDB] = await Promise.all([
    getAllCategories(),
    getAllPosts(),
    getFeaturedPost(),
  ]);

  const featuredPost = featuredPostFromDB ?? allPosts[0] ?? null;
  const recentPosts = allPosts
    .filter((p) => p.id !== featuredPost?.id)
    .slice(0, 3);

  const featuredDate = featuredPost?.published_at
    ? new Date(featuredPost.published_at).toLocaleDateString("en-US", {
      month: "long", day: "numeric", year: "numeric",
    })
    : "";

  const featuredCatSlug = featuredPost?.categories?.slug ?? "";

  return (
    <div className="flex flex-col space-y-20 pb-20">
      {/* Hero */}
      <section className="relative bg-brand-warmwhite border-b border-brand-taupe-light pt-20 pb-24 md:py-32">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex justify-center items-center gap-1.5 text-[10px] md:text-xs font-semibold tracking-widest text-brand-taupe-dark uppercase bg-brand-cream border border-brand-taupe-light px-3 py-1 rounded-full w-max mx-auto">
            <Star className="w-3 h-3 fill-current" />
            <span>Living Beautifully, Curated Daily</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-brand-black leading-tight">
            Curated Inspiration for the{" "}
            <br className="hidden sm:inline" />
            <span className="text-brand-taupe-dark italic font-normal">Modern &amp; Organic</span> Home
          </h1>
          <p className="max-w-xl mx-auto text-sm md:text-base text-brand-charcoal/85 leading-relaxed">
            Discover styling secrets, organizing systems, and shop the exact pieces featured across our Pinterest collections.
          </p>
          {/* <div className="max-w-md mx-auto pt-4 relative">
            <input
              type="text"
              placeholder="Search design styles, laundry ideas, bathroom upgrades..."
              className="w-full pl-11 pr-4 py-3.5 bg-brand-cream border border-brand-taupe-light rounded-md text-brand-black placeholder-brand-charcoal/45 text-sm focus:outline-none focus:ring-1 focus:ring-brand-taupe focus:border-brand-taupe transition-all shadow-sm"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-charcoal/40" />
          </div> */}
        </div>
      </section>

      {/* Category Tiles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-8">
        <div className="text-center space-y-2">
          <h2 className="font-serif text-2xl md:text-3xl font-bold tracking-tight text-brand-black">
            Explore Curated Boards
          </h2>
          <p className="text-xs md:text-sm text-brand-charcoal/70 uppercase tracking-widest">
            Select a style board to browse archives
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/blog/${cat.slug}`}
              className="group relative aspect-[4/3] rounded-lg overflow-hidden border border-brand-taupe-light/50 bg-brand-cream flex flex-col justify-end p-6 shadow-sm hover:shadow-md transition-all duration-300"
            >
              {cat.image_url && (
                <Image
                  src={cat.image_url}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105 brightness-[0.85] group-hover:brightness-90"
                />
              )}
              <div className="relative bg-brand-warmwhite/90 backdrop-blur-sm border border-brand-taupe-light p-4 rounded-md text-left transition-all duration-300 group-hover:bg-brand-warmwhite">
                <h3 className="font-serif text-base md:text-lg font-bold text-brand-black">{cat.name}</h3>
                <p className="text-[11px] md:text-xs text-brand-charcoal/80 line-clamp-1 mt-1">{cat.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-8">
          <div className="flex justify-between items-end border-b border-brand-taupe-light/60 pb-3">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-brand-black">Featured Editorial</h2>
            <Link href="/blog" className="text-xs font-semibold uppercase tracking-wider text-brand-taupe-dark hover:text-brand-black flex items-center gap-1 group transition-colors">
              <span>View All Articles</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-brand-warmwhite border border-brand-taupe-light rounded-lg overflow-hidden p-6 md:p-8 shadow-sm">
            <Link href={`/blog/${featuredCatSlug}/${featuredPost.slug}`} className="block relative aspect-video lg:aspect-square rounded-md overflow-hidden bg-brand-cream border border-brand-taupe-light/50">
              {featuredPost.hero_image_url && (
                <Image src={featuredPost.hero_image_url} alt={featuredPost.title} fill sizes="(max-width: 1024px) 100vw, 500px" className="object-cover transition-transform duration-500 hover:scale-105" />
              )}
            </Link>
            <div className="space-y-4 md:px-4">
              <div className="flex items-center gap-2 text-[10px] md:text-xs font-semibold tracking-widest uppercase text-brand-taupe-dark">
                <span>Featured Post</span>
                <span className="h-1 w-1 rounded-full bg-brand-taupe" />
                <time>{featuredDate}</time>
              </div>
              <h3 className="font-serif text-2xl md:text-4xl font-extrabold text-brand-black leading-tight hover:text-brand-taupe-dark transition-colors">
                <Link href={`/blog/${featuredCatSlug}/${featuredPost.slug}`}>{featuredPost.title}</Link>
              </h3>
              <p className="text-sm md:text-base text-brand-charcoal/80 leading-relaxed">{featuredPost.meta_description}</p>
              <div className="pt-4 border-t border-brand-taupe-light/40">
                <Link href={`/blog/${featuredCatSlug}/${featuredPost.slug}`} className="inline-flex items-center justify-center px-5 py-3 bg-brand-black text-brand-cream uppercase text-xs font-semibold tracking-wider rounded-md hover:bg-brand-taupe-dark transition duration-300">
                  Read Full Article
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-8">
          <div className="text-left border-b border-brand-taupe-light/60 pb-3">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-brand-black">Latest from the Blog</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* Newsletter */}
      {/* <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <EmailSignup
          title="Download Our Organic Mood Board Template Guide"
          description="Looking to plan your next home update? Subscribe below to receive our exclusive Pinterest Design Pack containing 10 pre-styled color palettes, furniture layouts, and shopping worksheets for free."
          buttonText="Send Me the Guide"
          leadMagnetName="Organic Mood Board Guide"
        />
      </section> */}
    </div>
  );
}

// Inline card to avoid circular imports — same design as BlogPostCard but data-shape agnostic
function BlogPostCard({ post }: { post: any }) {
  const cat = post.categories;
  const catSlug = cat?.slug ?? "";
  const catName = cat?.name ?? catSlug;
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
          <Link href={`/blog/${catSlug}/${post.slug}`} className="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-brand-black group-hover:underline flex items-center gap-1">
            Read Article &rarr;
          </Link>
        </div>
      </div>
    </article>
  );
}
