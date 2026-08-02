import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getCategoryBySlug } from "@/lib/db/categories";
import { getPostsByCategory, Post } from "@/lib/db/posts";
import { ArrowLeft } from "lucide-react";

export const revalidate = 60;

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const catObj = await getCategoryBySlug(category);
  if (!catObj) return { title: "Category Not Found" };
  return {
    title: `${catObj.name} | Design Board Inspiration`,
    description: catObj.description ?? undefined,
  };
}

export default async function CategoryArchive({ params }: CategoryPageProps) {
  const { category } = await params;
  const catObj = await getCategoryBySlug(category);
  if (!catObj) notFound();

  const posts = await getPostsByCategory(catObj.id);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://thedecordesk.com" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://thedecordesk.com/blog" },
      { "@type": "ListItem", position: 3, name: catObj.name, item: `https://thedecordesk.com/blog/${category}` },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div>
        <Link href="/blog" className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-brand-charcoal/70 hover:text-brand-black transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Styling Journal</span>
        </Link>
      </div>

      <div className="space-y-4 max-w-3xl border-b border-brand-taupe-light/50 pb-8">
        <span className="text-[10px] md:text-xs font-semibold tracking-widest uppercase text-brand-taupe-dark">Design Board Archive</span>
        <h1 className="font-serif text-3xl md:text-5xl font-extrabold text-brand-black tracking-tight">{catObj.name}</h1>
        {catObj.description && <p className="text-sm md:text-base text-brand-charcoal/80 leading-relaxed">{catObj.description}</p>}
      </div>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => <PostCard key={post.id} post={post} catSlug={category} />)}
        </div>
      ) : (
        <div className="text-center py-16 bg-brand-warmwhite border border-brand-taupe-light/50 rounded-lg">
          <p className="font-serif text-lg text-brand-charcoal/80">No articles published under this design board yet.</p>
          <Link href="/blog" className="text-xs font-semibold uppercase tracking-wider text-brand-taupe-dark hover:underline block mt-2">
            Browse All Articles &rarr;
          </Link>
        </div>
      )}
    </div>
  );
}

function PostCard({ post, catSlug }: { post: Post; catSlug: string }) {
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
          <time className="text-[10px] font-semibold tracking-wider uppercase text-brand-charcoal/60">{date}</time>
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
