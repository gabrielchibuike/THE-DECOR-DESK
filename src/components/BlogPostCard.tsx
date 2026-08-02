import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/lib/markdown";
import { categories } from "@/data/categories";

interface BlogPostCardProps {
  post: BlogPost;
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  const { title, slug, category, metaDescription, heroImage, publishDate } = post.frontmatter;

  // Find category display name
  const catObj = categories.find((c) => c.slug === category);
  const categoryName = catObj ? catObj.name : category;

  const formattedDate = new Date(publishDate).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article className="group flex flex-col space-y-3 bg-brand-warmwhite border border-brand-taupe-light/40 rounded-lg overflow-hidden p-4 shadow-sm hover:shadow-md transition-all duration-300">
      {/* Image Wrap */}
      <Link href={`/blog/${category}/${slug}`} className="block overflow-hidden rounded-md relative aspect-video bg-brand-cream border border-brand-taupe-light/50">
        <Image
          src={heroImage}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      {/* Content */}
      <div className="flex flex-col space-y-2 flex-grow justify-between pt-2">
        <div className="space-y-2">
          {/* Metadata */}
          <div className="flex items-center gap-3 text-[10px] md:text-xs font-semibold tracking-wider uppercase">
            <Link
              href={`/blog/${category}`}
              className="text-brand-taupe-dark hover:text-brand-black transition-colors"
            >
              {categoryName}
            </Link>
            <span className="h-1 w-1 rounded-full bg-brand-taupe" />
            <time className="text-brand-charcoal/60">{formattedDate}</time>
          </div>

          {/* Title */}
          <h3 className="font-serif text-lg md:text-xl font-bold text-brand-black leading-snug group-hover:text-brand-taupe-dark transition-colors duration-200">
            <Link href={`/blog/${category}/${slug}`}>
              {title}
            </Link>
          </h3>

          {/* Excerpt */}
          <p className="text-xs md:text-sm text-brand-charcoal/70 line-clamp-3 leading-relaxed">
            {metaDescription}
          </p>
        </div>

        {/* Read More Anchor */}
        <div className="pt-4 border-t border-brand-taupe-light/30">
          <Link
            href={`/blog/${category}/${slug}`}
            className="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-brand-black group-hover:underline flex items-center gap-1"
          >
            Read Article &rarr;
          </Link>
        </div>
      </div>
    </article>
  );
}
