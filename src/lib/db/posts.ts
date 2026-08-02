import { createPublicClient, createClient } from "@/lib/supabase/server";

export type ContentBlockType =
  | { type: "paragraph"; text: string }
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "image"; url: string; alt: string; caption?: string }
  | { type: "product_block"; productId: string }
  | { type: "divider" };

export interface Post {
  id: string;
  title: string;
  slug: string;
  category_id: string | null;
  meta_description: string | null;
  keywords: string[] | null;
  hero_image_url: string | null;
  content: ContentBlockType[];
  status: "draft" | "published";
  featured: boolean;
  published_at: string | null;
  updated_at: string;
  created_at: string;
  // Joined
  categories?: { id: string; name: string; slug: string } | null;
}

const POST_SELECT = `
  id, title, slug, category_id, meta_description, keywords,
  hero_image_url, content, status, featured, published_at,
  updated_at, created_at,
  categories(id, name, slug)
`;

export async function getAllPosts(): Promise<Post[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("posts")
    .select(POST_SELECT)
    .eq("status", "published")
    .order("published_at", { ascending: false });
  if (error) { console.error("getAllPosts:", error.message); return []; }
  return (data as Post[]) ?? [];
}

export async function getFeaturedPost(): Promise<Post | null> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("posts")
    .select(POST_SELECT)
    .eq("status", "published")
    .eq("featured", true)
    .order("published_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error) return null;
  return data as Post | null;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("posts")
    .select(POST_SELECT)
    .eq("slug", slug)
    .eq("status", "published")
    .single();
  if (error) return null;
  return data as Post | null;
}

export async function getPostsByCategory(categoryId: string): Promise<Post[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("posts")
    .select(POST_SELECT)
    .eq("status", "published")
    .eq("category_id", categoryId)
    .order("published_at", { ascending: false });
  if (error) { console.error("getPostsByCategory:", error.message); return []; }
  return (data as Post[]) ?? [];
}

export async function getAllPostsAdmin(): Promise<Post[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select(POST_SELECT)
    .order("updated_at", { ascending: false });
  if (error) { console.error("getAllPostsAdmin:", error.message); return []; }
  return (data as Post[]) ?? [];
}

// Extract H2/H3 headings from content blocks for Table of Contents
export function extractHeadings(content: ContentBlockType[]): { text: string; id: string; level: number }[] {
  return content
    .filter((b): b is Extract<ContentBlockType, { type: "heading" }> => b.type === "heading")
    .map((b) => ({
      text: b.text,
      level: b.level,
      id: b.text.toLowerCase().replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-"),
    }));
}
