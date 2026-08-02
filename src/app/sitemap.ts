import { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://thedecordesk.com";
  const supabase = await createClient();

  const [{ data: posts }, { data: categories }] = await Promise.all([
    supabase.from("posts").select("slug, category_id, updated_at, categories(slug)").eq("status", "published"),
    supabase.from("categories").select("slug"),
  ]);

  const staticUrls: MetadataRoute.Sitemap = [
    "", "/blog", "/about", "/contact", "/privacy-policy", "/disclosure", "/newsletter",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "" ? 1.0 : 0.8,
  }));

  const categoryUrls: MetadataRoute.Sitemap = (categories ?? []).map((cat: any) => ({
    url: `${baseUrl}/blog/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const postUrls: MetadataRoute.Sitemap = (posts ?? []).map((post: any) => ({
    url: `${baseUrl}/blog/${post.categories?.slug ?? "uncategorized"}/${post.slug}`,
    lastModified: new Date(post.updated_at),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticUrls, ...categoryUrls, ...postUrls];
}
