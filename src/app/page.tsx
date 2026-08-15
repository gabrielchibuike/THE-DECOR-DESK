import Link from "next/link";
import Image from "next/image";
import { getAllPosts, getFeaturedPost } from "@/lib/db/posts";
import { getAllCategories } from "@/lib/db/categories";
import EmailSignup from "@/components/EmailSignup";
import { ArrowRight, Star } from "lucide-react";
import { stylesList } from "@/data/styles";

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

  // Static room definitions — slugs match the actual Supabase categories table
  const roomCategories = [
    { name: "Bathroom", slug: "bathroom-ideas", img: "/images/categories/bathroom.jpg", description: "Refresh your bathroom with beautiful, spa-inspired styling ideas." },
    { name: "Bedroom", slug: "bedroom-ideas", img: "/images/categories/bedroom.jpg", description: "Create a cozy, restful sanctuary with curated bedroom inspiration." },
    { name: "Living Room", slug: "living-room-ideas", img: "/images/categories/living-room.jpg", description: "Style a warm, inviting living room you'll love coming home to." },
    { name: "Kitchen", slug: "kitchen-ideas", img: "/images/categories/kitchen.jpg", description: "Elevate your kitchen with warm tones, beautiful hardware, and practical styling." },
    { name: "Laundry", slug: "laundry-room-ideas", img: "/images/categories/laundry-room.jpg", description: "Make laundry day beautiful with clever, organized, and stylish spaces." },
    { name: "Apartment", slug: "apartment-living-room-ideas", img: "/images/categories/apartment-living-room.jpg", description: "Maximize small spaces with renter-friendly decor and clever layouts." },
  ];

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
            Create a Beautiful Home{" "}
            <br className="hidden sm:inline" />
            <span className="text-brand-taupe-dark italic font-normal">Without Overspending</span>
          </h1>
          <p className="max-w-xl mx-auto text-sm md:text-base text-brand-charcoal/85 leading-relaxed">
            Discover beautiful home decor ideas, affordable finds, styling tips, and practical inspiration to create a home you love—without the designer price tag.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
            <Link href="/rooms" className="px-8 py-3.5 bg-brand-black text-brand-cream text-xs font-semibold uppercase tracking-wider rounded-md hover:bg-brand-taupe-dark transition duration-300 w-full sm:w-auto">
              Explore Decor Ideas
            </Link>
            <Link href="/shop-my-finds" className="px-8 py-3.5 bg-brand-cream border border-brand-taupe text-brand-black text-xs font-semibold uppercase tracking-wider rounded-md hover:bg-brand-taupe-light/50 transition duration-300 w-full sm:w-auto">
              Shop My Finds
            </Link>
          </div>
        </div>
      </section>

      {/* Explore by Room */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-8">
        <div className="flex justify-between items-end border-b border-brand-taupe-light/60 pb-3">
          <div className="space-y-1">
            <h2 className="font-serif text-2xl md:text-3xl font-bold tracking-tight text-brand-black">
              Explore by Room
            </h2>
            <p className="text-xs text-brand-charcoal/70 uppercase tracking-widest">
              Find inspiration for every space in your home
            </p>
          </div>
          <Link href="/rooms" className="text-xs font-semibold uppercase tracking-wider text-brand-taupe-dark hover:text-brand-black flex items-center gap-1 group transition-colors">
            <span>View All Rooms</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
              <div className="relative bg-brand-warmwhite/90 backdrop-blur-sm border border-brand-taupe-light p-4 rounded-md text-left transition-all duration-300 group-hover:bg-brand-warmwhite">
                <h3 className="font-serif text-base md:text-lg font-bold text-brand-black">{cat.name}</h3>
                <p className="text-[11px] md:text-xs text-brand-charcoal/80 line-clamp-1 mt-1 mb-2">{cat.description}</p>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-brand-taupe-dark flex items-center gap-1 group-hover:text-brand-black transition-colors">
                  Explore Ideas <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Explore by Style */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-8">
        <div className="flex justify-between items-end border-b border-brand-taupe-light/60 pb-3">
          <div className="space-y-1">
            <h2 className="font-serif text-2xl md:text-3xl font-bold tracking-tight text-brand-black">
              Explore by Style
            </h2>
            <p className="text-xs text-brand-charcoal/70 uppercase tracking-widest">
              Discover your interior design aesthetic
            </p>
          </div>
          <Link href="/styles" className="text-xs font-semibold uppercase tracking-wider text-brand-taupe-dark hover:text-brand-black flex items-center gap-1 group transition-colors">
            <span>View All Styles</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stylesList.map((style) => (
            <Link key={style.slug} href={`/styles/${style.slug}`} className="group block text-center space-y-3">
              <div className="relative aspect-square rounded-full overflow-hidden border-2 border-brand-taupe-light/40 group-hover:border-brand-taupe transition-colors duration-300 mx-auto w-28 h-28 md:w-32 md:h-32">
                <Image src={style.imageUrl} alt={style.name} fill sizes="130px" className="object-cover transition-transform duration-500 group-hover:scale-110" />
              </div>
              <h3 className="font-serif text-sm font-bold text-brand-black group-hover:text-brand-taupe-dark transition-colors">{style.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Editorial */}
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
                <span>Featured Editorial</span>
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

      {/* Latest Articles */}
      {recentPosts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-8">
          <div className="text-left border-b border-brand-taupe-light/60 pb-3">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-brand-black">Latest Editorial Articles</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* Shop My Finds */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-8">
        <div className="flex justify-between items-end border-b border-brand-taupe-light/60 pb-3">
          <div className="space-y-1">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-brand-black">Shop My Finds</h2>
            <p className="text-xs text-brand-charcoal/70 uppercase tracking-widest">Curated products for every room</p>
          </div>
          <Link href="/shop-my-finds" className="text-xs font-semibold uppercase tracking-wider text-brand-taupe-dark hover:text-brand-black flex items-center gap-1 group transition-colors">
            <span>View All Finds</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { name: "Bedroom", slug: "bedroom-finds", img: "/images/categories/bedroom.jpg" },
            { name: "Living Room", slug: "living-room-finds", img: "/images/categories/living-room.jpg" },
            { name: "Bathroom", slug: "bathroom-finds", img: "/images/categories/bathroom.jpg" },
            { name: "Kitchen", slug: "kitchen-finds", img: "/images/categories/kitchen.jpg" },
            { name: "Lighting", slug: "lighting", img: "/images/categories/apartment-living-room.jpg" },
            { name: "Organization", slug: "organization", img: "/images/categories/laundry-room.jpg" }
          ].map((cat) => (
            <Link key={cat.slug} href={`/shop-my-finds/${cat.slug}`} className="group relative aspect-square rounded-lg overflow-hidden border border-brand-taupe-light bg-brand-cream shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center">
              <Image src={cat.img} alt={cat.name} fill sizes="200px" className="object-cover transition-transform duration-500 group-hover:scale-105 brightness-75 group-hover:brightness-50" />
              <h3 className="relative z-10 font-serif text-sm md:text-base font-bold text-brand-cream text-center px-2 drop-shadow-md">
                {cat.name}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Free Resource Lead Magnet */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <EmailSignup
          title="Get the Free Home Decor Guide"
          description="A practical guide to creating a beautiful, elevated home without overspending. Learn style discovery, color palettes, and budget planning."
          buttonText="Send Me the Free Guide"
          leadMagnetName="The Elevated Home Starter Guide"
        />
      </section>

      {/* Digital Product Promotion */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-8 pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-brand-taupe-light/20 border border-brand-taupe-light rounded-lg overflow-hidden p-6 md:p-10 shadow-sm">
          <div className="space-y-5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-taupe-dark">Digital Product</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-black">The Elevated Home Decor Blueprint</h2>
            <p className="text-sm md:text-base text-brand-charcoal/80 leading-relaxed">
              A practical room-by-room system for creating a beautiful, elevated home without wasting money on decor that doesn't work together.
            </p>
            <div className="pt-2">
              <Link href="/digital-products/elevated-home-decor-blueprint" className="inline-flex items-center justify-center px-6 py-3.5 bg-brand-black text-brand-cream uppercase text-xs font-semibold tracking-wider rounded-md hover:bg-brand-taupe-dark transition duration-300">
                Get the Blueprint — $15
              </Link>
            </div>
          </div>
          <Link href="/digital-products/elevated-home-decor-blueprint" className="block relative aspect-video md:aspect-[4/3] rounded-md overflow-hidden border border-brand-taupe-light/50 shadow-sm group">
            <div className="absolute inset-0 bg-brand-cream flex flex-col items-center justify-center space-y-2 p-6 text-center group-hover:bg-brand-warmwhite transition-colors duration-300">
              <span className="font-serif text-2xl font-bold text-brand-black">The Elevated Home</span>
              <span className="font-sans text-xs uppercase tracking-widest text-brand-taupe-dark">Decor Blueprint</span>
              <div className="mt-4 px-4 py-2 border-2 border-brand-taupe-light text-brand-charcoal/50 font-serif italic text-sm">
                50+ Page PDF Guide & Worksheets
              </div>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}

// Inline card component
function BlogPostCard({ post }: { post: any }) {
  const cat = post.categories;
  const catSlug = cat?.slug ?? "bathroom-ideas";
  const catName = cat?.name ?? "Decor";
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
