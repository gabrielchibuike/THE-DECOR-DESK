import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import CategoryForm from "@/components/admin/CategoryForm";

export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: category } = await supabase.from("categories").select("*").eq("id", id).single();
  if (!category) notFound();
  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="font-serif text-3xl font-bold text-brand-black mb-8">Edit Category</h1>
      <CategoryForm category={category} />
    </div>
  );
}
