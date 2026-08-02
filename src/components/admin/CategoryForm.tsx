"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, CheckCircle, AlertCircle, Trash2 } from "lucide-react";

function slugify(t: string) {
  return t.toLowerCase().replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-").replace(/-+/g, "-");
}

interface CategoryFormProps { category?: any; }

export default function CategoryForm({ category }: CategoryFormProps) {
  const router = useRouter();
  const isEditing = Boolean(category?.id);
  const [name, setName] = useState(category?.name ?? "");
  const [slug, setSlug] = useState(category?.slug ?? "");
  const [slugManual, setSlugManual] = useState(false);
  const [description, setDescription] = useState(category?.description ?? "");
  const [imageUrl, setImageUrl] = useState(category?.image_url ?? "");
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const inputClass = "w-full px-3 py-2.5 bg-brand-cream border border-brand-taupe-light rounded-md text-brand-black text-sm focus:outline-none focus:ring-1 focus:ring-brand-taupe transition";

  const handleNameChange = (v: string) => {
    setName(v);
    if (!slugManual) setSlug(slugify(v));
  };

  const handleSave = async () => {
    setSaving(true); setStatus("idle");
    const payload = { name, slug, description: description || null, image_url: imageUrl || null };
    try {
      const url = isEditing ? `/api/admin/categories/${category.id}` : "/api/admin/categories";
      const method = isEditing ? "PATCH" : "POST";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Save failed");
      setStatus("success"); setMessage(isEditing ? "Category updated!" : "Category created!");
      if (!isEditing) setTimeout(() => router.push("/admin/categories"), 1000);
    } catch (err: any) { setStatus("error"); setMessage(err.message); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!confirm("Delete this category? All posts in it will lose their category.")) return;
    await fetch(`/api/admin/categories/${category.id}`, { method: "DELETE" });
    router.push("/admin/categories");
  };

  return (
    <div className="bg-brand-warmwhite border border-brand-taupe-light rounded-lg p-6 space-y-5">
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold uppercase tracking-wider text-brand-charcoal/70">Name *</label>
        <input type="text" value={name} onChange={(e) => handleNameChange(e.target.value)} placeholder="Living Room Ideas" className={inputClass} />
      </div>
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold uppercase tracking-wider text-brand-charcoal/70">Slug *</label>
        <input type="text" value={slug} onChange={(e) => { setSlug(e.target.value); setSlugManual(true); }} className={`${inputClass} font-mono text-xs`} />
        {slugManual && <button type="button" onClick={() => { setSlugManual(false); setSlug(slugify(name)); }} className="text-[10px] text-brand-taupe-dark hover:underline">↺ Auto-generate</button>}
        <p className="text-[10px] text-brand-charcoal/40">URL: /blog/{slug || "…"}</p>
      </div>
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold uppercase tracking-wider text-brand-charcoal/70">Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} className={`${inputClass} resize-none`} placeholder="Short description for the category archive page…" />
      </div>
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold uppercase tracking-wider text-brand-charcoal/70">Image URL</label>
        <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="/images/categories/living-room.jpg" className={`${inputClass} font-mono text-xs`} />
      </div>
      {status === "success" && <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-md text-xs text-green-700"><CheckCircle className="w-4 h-4" />{message}</div>}
      {status === "error" && <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md text-xs text-red-700"><AlertCircle className="w-4 h-4" />{message}</div>}
      <div className="flex items-center justify-between pt-2 border-t border-brand-taupe-light/50">
        <button onClick={handleSave} disabled={saving || !name || !slug} className="flex items-center gap-2 px-5 py-3 bg-brand-black text-brand-cream text-xs font-semibold uppercase tracking-wider rounded-md hover:bg-brand-taupe-dark transition disabled:opacity-50">
          {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
          {isEditing ? "Update Category" : "Create Category"}
        </button>
        {isEditing && (
          <button onClick={handleDelete} className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 transition">
            <Trash2 className="w-3.5 h-3.5" /> Delete
          </button>
        )}
      </div>
    </div>
  );
}
