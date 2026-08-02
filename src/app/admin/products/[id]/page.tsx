import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import ProductForm from "@/components/admin/ProductForm";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: product } = await supabase.from("products").select("*").eq("id", id).single();
  if (!product) notFound();
  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="font-serif text-3xl font-bold text-brand-black mb-8">Edit Product</h1>
      <ProductForm product={product} />
    </div>
  );
}
