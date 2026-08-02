import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import PostEditor from "@/components/admin/PostEditor";

interface EditPostPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const [{ data: post }, { data: categories }, { data: products }] = await Promise.all([
    supabase.from("posts").select("*").eq("id", id).single(),
    supabase.from("categories").select("id, name, slug").order("name"),
    supabase.from("products").select("id, name, image_url").order("name"),
  ]);

  if (!post) notFound();

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="font-serif text-3xl font-bold text-brand-black mb-8">Edit Post</h1>
      <PostEditor
        post={post}
        categories={categories ?? []}
        products={products ?? []}
      />
    </div>
  );
}
