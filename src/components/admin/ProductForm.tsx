"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { PlusCircle, Trash2, Loader2, CheckCircle, AlertCircle } from "lucide-react";

interface Retailer { retailerName: string; affiliateUrl: string; price: string; }

interface ProductFormProps {
  product?: any;
}

export default function ProductForm({ product }: ProductFormProps) {
  const router = useRouter();
  const isEditing = Boolean(product?.id);

  const [name, setName] = useState(product?.name ?? "");
  const [description, setDescription] = useState(product?.description ?? "");
  const [imageUrl, setImageUrl] = useState(product?.image_url ?? "");
  const [retailers, setRetailers] = useState<Retailer[]>(
    product?.retailers ?? [{ retailerName: "", affiliateUrl: "", price: "" }]
  );
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [localPreview, setLocalPreview] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (localPreview) URL.revokeObjectURL(localPreview);
    };
  }, [localPreview]);

  const inputClass = "w-full px-3 py-2.5 bg-brand-cream border border-brand-taupe-light rounded-md text-brand-black text-sm focus:outline-none focus:ring-1 focus:ring-brand-taupe transition";

  const addRetailer = () =>
    setRetailers((prev) => [...prev, { retailerName: "", affiliateUrl: "", price: "" }]);

  const updateRetailer = (idx: number, patch: Partial<Retailer>) =>
    setRetailers((prev) => prev.map((r, i) => (i === idx ? { ...r, ...patch } : r)));

  const removeRetailer = (idx: number) =>
    setRetailers((prev) => prev.filter((_, i) => i !== idx));

  const handleImageUpload = async (file: File) => {
    setUploadingImage(true);
    if (localPreview) URL.revokeObjectURL(localPreview);
    const objectUrl = URL.createObjectURL(file);
    setLocalPreview(objectUrl);

    const form = new FormData();
    form.append("file", file);
    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body: form });
      const data = await res.json();
      if (res.ok) setImageUrl(data.url);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setStatus("idle");
    const payload = {
      name,
      description: description || null,
      image_url: imageUrl || null,
      retailers: retailers.filter((r) => r.retailerName && r.affiliateUrl),
    };
    try {
      const url = isEditing ? `/api/admin/products/${product.id}` : "/api/admin/products";
      const method = isEditing ? "PATCH" : "POST";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Save failed");
      setStatus("success");
      setMessage(isEditing ? "Product updated!" : "Product created!");
      if (!isEditing) setTimeout(() => router.push("/admin/products"), 1000);
    } catch (err: any) {
      setStatus("error");
      setMessage(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Delete this product? It may be referenced in published posts.")) return;
    await fetch(`/api/admin/products/${product.id}`, { method: "DELETE" });
    router.push("/admin/products");
  };

  return (
    <div className="bg-brand-warmwhite border border-brand-taupe-light rounded-lg p-6 space-y-6">
      {/* Name */}
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold uppercase tracking-wider text-brand-charcoal/70">Product Name *</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Solid Oak Double Laundry Hamper" className={inputClass} />
      </div>

      {/* Description */}
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold uppercase tracking-wider text-brand-charcoal/70">Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} placeholder="Short description shown in product blocks…" className={`${inputClass} resize-none`} />
      </div>

      {/* Image */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold uppercase tracking-wider text-brand-charcoal/70">Product Image</label>
        <div className="flex gap-2">
          <input type="text" value={imageUrl} onChange={(e) => { setImageUrl(e.target.value); setLocalPreview(null); }} placeholder="https://… or upload →" className={`${inputClass} flex-1 font-mono text-xs`} />
          <label className="flex items-center gap-1 px-3 py-2 bg-brand-black text-brand-cream text-xs font-semibold rounded-md cursor-pointer hover:bg-brand-taupe-dark transition whitespace-nowrap">
            {uploadingImage ? <Loader2 className="w-3 h-3 animate-spin" /> : "Upload"}
            <input type="file" accept="image/*" className="hidden" onChange={(e) => { if (e.target.files?.[0]) handleImageUpload(e.target.files[0]); }} disabled={uploadingImage} />
          </label>
        </div>
        {(localPreview || imageUrl) && (
          <div className={`relative h-48 w-full rounded-md overflow-hidden bg-brand-cream border border-brand-taupe-light ${uploadingImage ? "opacity-50" : ""}`}>
            <Image src={localPreview || imageUrl} alt="Product preview" fill className="object-cover" />
            {uploadingImage && <div className="absolute inset-0 flex items-center justify-center bg-black/10"><Loader2 className="w-6 h-6 animate-spin text-brand-black" /></div>}
          </div>
        )}
      </div>

      {/* Retailers */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-semibold uppercase tracking-wider text-brand-charcoal/70">Retailer Links</label>
          <button type="button" onClick={addRetailer} className="flex items-center gap-1 text-xs text-brand-taupe-dark hover:text-brand-black transition">
            <PlusCircle className="w-3.5 h-3.5" /> Add Retailer
          </button>
        </div>
        {retailers.map((retailer, idx) => (
          <div key={idx} className="grid grid-cols-12 gap-2 p-4 bg-brand-cream border border-brand-taupe-light/50 rounded-md">
            <div className="col-span-3">
              <input type="text" value={retailer.retailerName} onChange={(e) => updateRetailer(idx, { retailerName: e.target.value })} placeholder="Amazon" className={`${inputClass} text-xs`} />
            </div>
            <div className="col-span-6">
              <input type="url" value={retailer.affiliateUrl} onChange={(e) => updateRetailer(idx, { affiliateUrl: e.target.value })} placeholder="https://amazon.com/…" className={`${inputClass} text-xs font-mono`} />
            </div>
            <div className="col-span-2">
              <input type="text" value={retailer.price} onChange={(e) => updateRetailer(idx, { price: e.target.value })} placeholder="$49.99" className={`${inputClass} text-xs`} />
            </div>
            <div className="col-span-1 flex items-center justify-center">
              <button type="button" onClick={() => removeRetailer(idx)} disabled={retailers.length === 1} className="text-brand-charcoal/30 hover:text-red-500 transition disabled:opacity-20">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Status */}
      {status === "success" && (
        <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-md text-xs text-green-700">
          <CheckCircle className="w-4 h-4" />{message}
        </div>
      )}
      {status === "error" && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md text-xs text-red-700">
          <AlertCircle className="w-4 h-4" />{message}
        </div>
      )}

      <div className="flex items-center justify-between pt-2 border-t border-brand-taupe-light/50">
        <button type="button" onClick={handleSave} disabled={saving || !name} className="flex items-center gap-2 px-5 py-3 bg-brand-black text-brand-cream text-xs font-semibold uppercase tracking-wider rounded-md hover:bg-brand-taupe-dark transition disabled:opacity-50">
          {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
          {isEditing ? "Update Product" : "Create Product"}
        </button>
        {isEditing && (
          <button type="button" onClick={handleDelete} className="text-xs text-red-500 hover:text-red-700 hover:underline transition">
            Delete Product
          </button>
        )}
      </div>
    </div>
  );
}
