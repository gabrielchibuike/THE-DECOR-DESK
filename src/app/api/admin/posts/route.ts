import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*, categories(id, name, slug)")
    .order("updated_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { title, slug, category_id, meta_description, keywords, hero_image_url, content, status, featured, published_at } = body;

  if (!title || !slug) return NextResponse.json({ error: "title and slug are required" }, { status: 400 });

  const sanitizedSlug = slug.toLowerCase().replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-").replace(/-+/g, "-");

  const { data, error } = await supabase
    .from("posts")
    .insert({ title, slug: sanitizedSlug, category_id, meta_description, keywords, hero_image_url, content: content ?? [], status: status ?? "draft", featured: featured ?? false, published_at, updated_at: new Date().toISOString() })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
