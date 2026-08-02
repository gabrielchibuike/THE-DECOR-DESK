import PostEditor from "@/components/admin/PostEditor";
import { createClient } from "@/lib/supabase/server";
// import PostEditor from "@/components/admin/PostEditor";

export default async function NewPostPage() {
  const supabase = await createClient();
  const [{ data: categories }, { data: products }] = await Promise.all([
    supabase.from("categories").select("id, name, slug").order("name"),
    supabase.from("products").select("id, name, image_url").order("name"),
  ]);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="font-serif text-3xl font-bold text-brand-black mb-8">New Post</h1>
      <PostEditor
        categories={categories ?? []}
        products={products ?? []}
      />
    </div>
  );
}
