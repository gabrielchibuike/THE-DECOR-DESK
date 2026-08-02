import ProductForm from "@/components/admin/ProductForm";

export default function NewProductPage() {
  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="font-serif text-3xl font-bold text-brand-black mb-8">Add Product</h1>
      <ProductForm />
    </div>
  );
}
