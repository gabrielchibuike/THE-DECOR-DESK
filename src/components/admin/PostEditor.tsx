"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  PlusCircle, Trash2, GripVertical, ChevronUp, ChevronDown,
  Loader2, CheckCircle, AlertCircle, Eye, FileText,
  Type, ImageIcon, Package, Minus,
} from "lucide-react";

// ── Types ──────────────────────────────────────────────────────
type BlockType = "paragraph" | "heading" | "image" | "product_block" | "divider";

interface Block {
  id: string;
  type: BlockType;
  // paragraph
  text?: string;
  // heading
  level?: 2 | 3;
  // image
  url?: string;
  alt?: string;
  caption?: string;
  // product_block
  productId?: string;
}

interface Category { id: string; name: string; slug: string; }
interface ProductOption { id: string; name: string; image_url: string | null; }

interface PostEditorProps {
  post?: any;
  categories: Category[];
  products: ProductOption[];
}

let blockCounter = 0;
const newId = () => `b-${Date.now()}-${blockCounter++}`;

const emptyBlock = (type: BlockType): Block => {
  const base = { id: newId(), type };
  if (type === "heading") return { ...base, level: 2, text: "" };
  if (type === "image") return { ...base, url: "", alt: "", caption: "" };
  if (type === "product_block") return { ...base, productId: "" };
  return { ...base, text: "" };
};

// ── Main Editor ────────────────────────────────────────────────
export default function PostEditor({ post, categories, products }: PostEditorProps) {
  const router = useRouter();
  const isEditing = Boolean(post?.id);
  const today = new Date().toISOString().split("T")[0];

  // Settings
  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [slugManual, setSlugManual] = useState(false);
  const [categoryId, setCategoryId] = useState(post?.category_id ?? (categories[0]?.id ?? ""));
  const [metaDescription, setMetaDescription] = useState(post?.meta_description ?? "");
  const [keywords, setKeywords] = useState((post?.keywords ?? []).join(", "));
  const [heroImageUrl, setHeroImageUrl] = useState(post?.hero_image_url ?? "");
  const [status, setStatus] = useState<"draft" | "published">(post?.status ?? "draft");
  const [featured, setFeatured] = useState(post?.featured ?? false);
  const [publishedAt, setPublishedAt] = useState(
    post?.published_at ? post.published_at.split("T")[0] : today
  );

  // Content blocks
  const [blocks, setBlocks] = useState<Block[]>(() => {
    if (post?.content && Array.isArray(post.content) && post.content.length > 0) {
      return post.content.map((b: any) => ({ ...b, id: newId() }));
    }
    return [emptyBlock("paragraph")];
  });

  // UI state
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");
  const [saveMessage, setSaveMessage] = useState("");
  const [activeTab, setActiveTab] = useState<"editor" | "preview">("editor");
  const [uploadingIdx, setUploadingIdx] = useState<number | null>(null);

  // Slug auto-gen
  const autoSlug = (t: string) =>
    t.toLowerCase().replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-").replace(/-+/g, "-");

  const handleTitleChange = (v: string) => {
    setTitle(v);
    if (!slugManual) setSlug(autoSlug(v));
  };

  // Block operations
  const addBlock = (type: BlockType) =>
    setBlocks((prev) => [...prev, emptyBlock(type)]);

  const updateBlock = useCallback((id: string, patch: Partial<Block>) =>
    setBlocks((prev) => prev.map((b) => (b.id === id ? { ...b, ...patch } : b))), []);

  const removeBlock = (id: string) =>
    setBlocks((prev) => prev.filter((b) => b.id !== id));

  const moveBlock = (id: string, dir: -1 | 1) => {
    setBlocks((prev) => {
      const idx = prev.findIndex((b) => b.id === id);
      if (idx < 0) return prev;
      const newIdx = idx + dir;
      if (newIdx < 0 || newIdx >= prev.length) return prev;
      const next = [...prev];
      [next[idx], next[newIdx]] = [next[newIdx], next[idx]];
      return next;
    });
  };

  // Image upload
  const handleImageUpload = async (idx: number, file: File) => {
    setUploadingIdx(idx);
    const form = new FormData();
    form.append("file", file);
    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body: form });
      const data = await res.json();
      if (res.ok && data.url) {
        setBlocks((prev) =>
          prev.map((b, i) => (i === idx ? { ...b, url: data.url } : b))
        );
      }
    } finally {
      setUploadingIdx(null);
    }
  };

  // Save
  const handleSave = async (targetStatus?: "draft" | "published") => {
    setSaving(true);
    setSaveStatus("idle");
    const finalStatus = targetStatus ?? status;

    const payload = {
      title,
      slug,
      category_id: categoryId || null,
      meta_description: metaDescription,
      keywords: keywords.split(",").map((k: any) => k.trim()).filter(Boolean),
      hero_image_url: heroImageUrl || null,
      content: blocks.map(({ id: _id, ...rest }) => rest), // strip client-side ids
      status: finalStatus,
      featured,
      published_at: finalStatus === "published" ? new Date(publishedAt).toISOString() : null,
    };

    try {
      const url = isEditing ? `/api/admin/posts/${post.id}` : "/api/admin/posts";
      const method = isEditing ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Save failed");
      setSaveStatus("success");
      setSaveMessage(finalStatus === "published" ? "Post published!" : "Draft saved.");
      setStatus(finalStatus);
      if (!isEditing && data.id) {
        router.push(`/admin/posts/${data.id}`);
      }
    } catch (err: any) {
      setSaveStatus("error");
      setSaveMessage(err.message);
    } finally {
      setSaving(false);
    }
  };

  const metaLen = metaDescription.length;
  const metaOk = metaLen >= 120 && metaLen <= 160;

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
      {/* ── Main column ──────────────────────────────────── */}
      <div className="xl:col-span-8 space-y-6">
        {/* Title */}
        <input
          type="text"
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          placeholder="Post title…"
          className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-brand-taupe-light font-serif text-3xl md:text-4xl font-bold text-brand-black placeholder-brand-charcoal/25 focus:outline-none focus:border-brand-taupe transition-colors"
        />

        {/* Slug preview */}
        {slug && (
          <p className="text-xs text-brand-charcoal/50 font-mono">
            /blog/{categories.find((c) => c.id === categoryId)?.slug ?? "…"}/{slug}
          </p>
        )}

        {/* Tab bar */}
        <div className="flex border-b border-brand-taupe-light">
          {(["editor", "preview"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-3 text-xs font-semibold uppercase tracking-wider transition-colors ${activeTab === tab
                ? "text-brand-black border-b-2 border-brand-black -mb-px bg-brand-warmwhite"
                : "text-brand-charcoal/50 hover:text-brand-charcoal"
                }`}
            >
              {tab === "editor" ? <><FileText className="w-3.5 h-3.5 inline mr-1.5" />Editor</> : <><Eye className="w-3.5 h-3.5 inline mr-1.5" />Preview</>}
            </button>
          ))}
        </div>

        {activeTab === "editor" ? (
          /* ── Block Editor ───────────────────────────── */
          <div className="space-y-3">
            {blocks.map((block, idx) => (
              <BlockCard
                key={block.id}
                block={block}
                idx={idx}
                total={blocks.length}
                products={products}
                uploading={uploadingIdx === idx}
                onUpdate={(patch) => updateBlock(block.id, patch)}
                onRemove={() => removeBlock(block.id)}
                onMove={(dir) => moveBlock(block.id, dir)}
                onImageUpload={(file) => handleImageUpload(idx, file)}
              />
            ))}

            {/* Add Block Bar */}
            <div className="flex flex-wrap gap-2 pt-2">
              {[
                { type: "paragraph" as BlockType, icon: Type, label: "Text" },
                { type: "heading" as BlockType, icon: Type, label: "Heading" },
                { type: "image" as BlockType, icon: ImageIcon, label: "Image" },
                { type: "product_block" as BlockType, icon: Package, label: "Product" },
                { type: "divider" as BlockType, icon: Minus, label: "Divider" },
              ].map(({ type, icon: Icon, label }) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => addBlock(type)}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold uppercase tracking-wider border border-brand-taupe-light rounded-md text-brand-charcoal/70 hover:bg-brand-warmwhite hover:text-brand-black transition-colors"
                >
                  <Icon className="w-3.5 h-3.5" /> {label}
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* ── Preview ──────────────────────────────── */
          <div className="bg-brand-warmwhite border border-brand-taupe-light rounded-lg p-8 min-h-[400px] prose max-w-none">
            <h1 className="font-serif text-3xl font-bold text-brand-black mb-6">{title || "(No title)"}</h1>
            {blocks.map((b, idx) => <PreviewBlock key={idx} block={b} products={products} />)}
          </div>
        )}

        {/* Meta Description */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold uppercase tracking-wider text-brand-charcoal/70">
              Meta Description <span className="text-red-400">*</span>
            </label>
            <span className={`text-[10px] font-mono ${metaOk ? "text-green-600" : metaLen > 0 ? "text-amber-600" : "text-brand-charcoal/40"}`}>
              {metaLen}/160 {metaOk ? "✓" : metaLen < 120 ? "(aim 120–160)" : "(too long)"}
            </span>
          </div>
          <textarea
            value={metaDescription}
            onChange={(e) => setMetaDescription(e.target.value)}
            rows={3}
            maxLength={200}
            placeholder="Compelling 120–160 character description for search engines…"
            className="w-full px-4 py-3 bg-brand-warmwhite border border-brand-taupe-light rounded-md text-brand-black text-sm focus:outline-none focus:ring-1 focus:ring-brand-taupe transition resize-none"
          />
        </div>

        {/* Save Status */}
        {saveStatus === "error" && (
          <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md text-xs text-red-700">
            <AlertCircle className="w-4 h-4 shrink-0" />{saveMessage}
          </div>
        )}
        {saveStatus === "success" && (
          <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-md text-xs text-green-700">
            <CheckCircle className="w-4 h-4 shrink-0" />{saveMessage}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={() => handleSave("draft")}
            disabled={saving || !title}
            className="px-5 py-3 border border-brand-taupe-light bg-brand-warmwhite text-brand-charcoal text-xs font-semibold uppercase tracking-wider rounded-md hover:bg-brand-cream transition disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin inline" /> : "Save Draft"}
          </button>
          <button
            type="button"
            onClick={() => handleSave("published")}
            disabled={saving || !title || !metaDescription}
            className="px-5 py-3 bg-brand-black text-brand-cream text-xs font-semibold uppercase tracking-wider rounded-md hover:bg-brand-taupe-dark transition disabled:opacity-50 flex items-center gap-2"
          >
            {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            {status === "published" ? "Update Post" : "Publish Post"}
          </button>
        </div>
      </div>

      {/* ── Settings Sidebar ─────────────────────────────── */}
      <aside className="xl:col-span-4 space-y-5 xl:sticky xl:top-8 xl:self-start">
        <SettingsPanel
          slug={slug}
          slugManual={slugManual}
          categoryId={categoryId}
          keywords={keywords}
          heroImageUrl={heroImageUrl}
          publishedAt={publishedAt}
          featured={featured}
          status={status}
          categories={categories}
          onSlugChange={(v: any) => { setSlug(autoSlug(v)); setSlugManual(true); }}
          onSlugReset={() => { setSlugManual(false); setSlug(autoSlug(title)); }}
          onCategoryChange={setCategoryId}
          onKeywordsChange={setKeywords}
          onHeroChange={setHeroImageUrl}
          onDateChange={setPublishedAt}
          onFeaturedChange={setFeatured}
          onStatusChange={setStatus}
        />
      </aside>
    </div>
  );
}

// ── Block Card ─────────────────────────────────────────────────
function BlockCard({
  block, idx, total, products, uploading,
  onUpdate, onRemove, onMove, onImageUpload,
}: {
  block: Block; idx: number; total: number; products: ProductOption[]; uploading: boolean;
  onUpdate: (p: Partial<Block>) => void;
  onRemove: () => void;
  onMove: (d: -1 | 1) => void;
  onImageUpload: (f: File) => void;
}) {
  const inputClass = "w-full px-3 py-2 bg-brand-cream border border-brand-taupe-light rounded-md text-brand-black text-sm focus:outline-none focus:ring-1 focus:ring-brand-taupe transition";

  return (
    <div className="group flex gap-3 bg-brand-warmwhite border border-brand-taupe-light rounded-lg p-4 hover:border-brand-taupe transition-colors">
      {/* Drag handle / move */}
      <div className="flex flex-col items-center gap-0.5 pt-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
        <button type="button" onClick={() => onMove(-1)} disabled={idx === 0} className="text-brand-charcoal/30 hover:text-brand-charcoal disabled:opacity-20 transition-colors"><ChevronUp className="w-3.5 h-3.5" /></button>
        <GripVertical className="w-3.5 h-3.5 text-brand-charcoal/20" />
        <button type="button" onClick={() => onMove(1)} disabled={idx === total - 1} className="text-brand-charcoal/30 hover:text-brand-charcoal disabled:opacity-20 transition-colors"><ChevronDown className="w-3.5 h-3.5" /></button>
      </div>

      {/* Block Content */}
      <div className="flex-1 min-w-0 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[9px] font-semibold uppercase tracking-widest text-brand-taupe-dark bg-brand-cream border border-brand-taupe-light px-2 py-0.5 rounded">
            {block.type.replace("_", " ")}
          </span>
          <button type="button" onClick={onRemove} className="text-brand-charcoal/30 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {block.type === "paragraph" && (
          <textarea
            value={block.text ?? ""}
            onChange={(e) => onUpdate({ text: e.target.value })}
            rows={4}
            placeholder="Write your paragraph…"
            className={`${inputClass} resize-none font-sans leading-relaxed`}
          />
        )}

        {block.type === "heading" && (
          <div className="space-y-2">
            <select value={block.level ?? 2} onChange={(e) => onUpdate({ level: Number(e.target.value) as 2 | 3 })} className={`${inputClass} w-24`}>
              <option value={2}>H2</option>
              <option value={3}>H3</option>
            </select>
            <input type="text" value={block.text ?? ""} onChange={(e) => onUpdate({ text: e.target.value })} placeholder="Section heading…" className={`${inputClass} font-serif font-bold text-base`} />
          </div>
        )}

        {block.type === "image" && (
          <div className="space-y-2">
            <div className="flex gap-2">
              <input type="text" value={block.url ?? ""} onChange={(e) => onUpdate({ url: e.target.value })} placeholder="Image URL or upload below…" className={`${inputClass} flex-1 font-mono text-xs`} />
              <label className="flex items-center gap-1 px-3 py-2 bg-brand-black text-brand-cream text-xs font-semibold rounded-md cursor-pointer hover:bg-brand-taupe-dark transition whitespace-nowrap">
                {uploading ? <Loader2 className="w-3 h-3 animate-spin" /> : <><ImageIcon className="w-3 h-3" /> Upload</>}
                <input type="file" accept="image/*" className="hidden" onChange={(e) => { if (e.target.files?.[0]) onImageUpload(e.target.files[0]); }} disabled={uploading} />
              </label>
            </div>
            {block.url && (
              <div className="relative h-32 rounded-md overflow-hidden bg-brand-cream border border-brand-taupe-light">
                <Image src={block.url} alt={block.alt ?? ""} fill className="object-cover" />
              </div>
            )}
            <input type="text" value={block.alt ?? ""} onChange={(e) => onUpdate({ alt: e.target.value })} placeholder="Alt text (required for SEO)" className={`${inputClass} text-xs`} />
            <input type="text" value={block.caption ?? ""} onChange={(e) => onUpdate({ caption: e.target.value })} placeholder="Caption (optional)" className={`${inputClass} text-xs`} />
          </div>
        )}

        {block.type === "product_block" && (
          <div className="space-y-2">
            <select value={block.productId ?? ""} onChange={(e) => onUpdate({ productId: e.target.value })} className={inputClass}>
              <option value="">— Select a product —</option>
              {products.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
            {block.productId && (
              <div className="flex items-center gap-2 p-2 bg-brand-cream rounded border border-brand-taupe-light">
                {products.find(p => p.id === block.productId)?.image_url && (
                  <div className="relative w-10 h-10 rounded overflow-hidden shrink-0">
                    <Image src={products.find(p => p.id === block.productId)!.image_url!} alt="" fill className="object-cover" />
                  </div>
                )}
                <span className="text-xs font-medium text-brand-charcoal truncate">
                  {products.find(p => p.id === block.productId)?.name}
                </span>
              </div>
            )}
          </div>
        )}

        {block.type === "divider" && (
          <hr className="border-brand-taupe-light" />
        )}
      </div>
    </div>
  );
}

// ── Preview Block ─────────────────────────────────────────────
function PreviewBlock({ block, products }: { block: Block; products: ProductOption[] }) {
  if (block.type === "paragraph") return <p className="text-brand-charcoal/90 text-sm leading-relaxed mb-4">{block.text}</p>;
  if (block.type === "heading") {
    const Tag = `h${block.level}` as "h2" | "h3";
    return <Tag className={`font-serif font-bold text-brand-black ${block.level === 2 ? "text-2xl mt-8 mb-3" : "text-xl mt-6 mb-2"}`}>{block.text}</Tag>;
  }
  if (block.type === "image" && block.url) return (
    <figure className="my-6">
      <div className="relative aspect-video rounded-lg overflow-hidden bg-brand-cream">
        <Image src={block.url} alt={block.alt ?? ""} fill className="object-cover" />
      </div>
      {block.caption && <figcaption className="text-center text-xs text-brand-charcoal/60 mt-2 italic">{block.caption}</figcaption>}
    </figure>
  );
  if (block.type === "product_block") {
    const p = products.find(x => x.id === block.productId);
    return p ? (
      <div className="my-6 p-4 bg-brand-taupe-light/30 border border-brand-taupe-light rounded-md flex items-center gap-3">
        {p.image_url && <div className="relative w-16 h-16 rounded overflow-hidden shrink-0"><Image src={p.image_url} alt={p.name} fill className="object-cover" /></div>}
        <div><p className="text-xs font-semibold text-brand-taupe-dark uppercase tracking-widest">Shop the Look</p><p className="text-sm font-bold text-brand-black">{p.name}</p></div>
      </div>
    ) : null;
  }
  if (block.type === "divider") return <hr className="my-6 border-brand-taupe-light" />;
  return null;
}

// ── Settings Panel ─────────────────────────────────────────────
function SettingsPanel({
  slug, slugManual, categoryId, keywords, heroImageUrl,
  publishedAt, featured, status, categories,
  onSlugChange, onSlugReset, onCategoryChange, onKeywordsChange,
  onHeroChange, onDateChange, onFeaturedChange, onStatusChange,
}: any) {
  const inputClass = "w-full px-3 py-2.5 bg-brand-cream border border-brand-taupe-light rounded-md text-brand-black text-sm focus:outline-none focus:ring-1 focus:ring-brand-taupe transition";

  return (
    <div className="bg-brand-warmwhite border border-brand-taupe-light rounded-lg overflow-hidden">
      <div className="px-5 py-3 border-b border-brand-taupe-light bg-brand-cream/50">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-brand-charcoal">Post Settings</h3>
      </div>
      <div className="p-5 space-y-4">
        {/* Status */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-brand-charcoal/70">Status</label>
          <select value={status} onChange={(e) => onStatusChange(e.target.value)} className={inputClass}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>

        {/* Category */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-brand-charcoal/70">Category</label>
          <select value={categoryId} onChange={(e) => onCategoryChange(e.target.value)} className={inputClass}>
            {categories.map((c: Category) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>

        {/* Slug */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-brand-charcoal/70">URL Slug</label>
          <input type="text" value={slug} onChange={(e) => onSlugChange(e.target.value)} className={`${inputClass} font-mono text-xs`} />
          {slugManual && (
            <button type="button" onClick={onSlugReset} className="text-[10px] text-brand-taupe-dark hover:underline">↺ Auto-generate from title</button>
          )}
        </div>

        {/* Publish Date */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-brand-charcoal/70">Publish Date</label>
          <input type="date" value={publishedAt} onChange={(e) => onDateChange(e.target.value)} className={inputClass} />
        </div>

        {/* Hero Image */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-brand-charcoal/70">Hero Image URL</label>
          <input type="text" value={heroImageUrl} onChange={(e) => onHeroChange(e.target.value)} placeholder="/images/hero-living.jpg" className={`${inputClass} font-mono text-xs`} />
          {heroImageUrl && (
            <div className="relative aspect-video rounded overflow-hidden bg-brand-cream border border-brand-taupe-light">
              <Image src={heroImageUrl} alt="Hero preview" fill className="object-cover" />
            </div>
          )}
          <div className="flex flex-wrap gap-1">
            {["/images/hero-living.jpg", "/images/hero-bathroom.jpg", "/images/hero-bedroom.jpg", "/images/hero-laundry.jpg", "/images/hero-apartment-living.jpg"].map((img) => (
              <button key={img} type="button" onClick={() => onHeroChange(img)}
                className={`text-[9px] px-1.5 py-0.5 rounded border font-mono transition-colors ${heroImageUrl === img ? "bg-brand-black text-brand-cream border-brand-black" : "bg-brand-cream border-brand-taupe-light text-brand-charcoal/60 hover:border-brand-taupe"}`}>
                {img.replace("/images/hero-", "").replace(".jpg", "")}
              </button>
            ))}
          </div>
        </div>

        {/* Keywords */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-brand-charcoal/70">Keywords</label>
          <input type="text" value={keywords} onChange={(e) => onKeywordsChange(e.target.value)} placeholder="keyword 1, keyword 2, …" className={`${inputClass} text-xs`} />
          <p className="text-[10px] text-brand-charcoal/40">Comma-separated</p>
        </div>

        {/* Featured toggle */}
        <div className="flex items-center justify-between pt-1 border-t border-brand-taupe-light/50">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-charcoal/70 block">Featured</span>
            <span className="text-[10px] text-brand-charcoal/40">Homepage hero slot</span>
          </div>
          <button type="button" onClick={() => onFeaturedChange(!featured)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${featured ? "bg-brand-taupe-dark" : "bg-brand-taupe-light"}`}>
            <span className={`inline-block h-4 w-4 rounded-full bg-white shadow transform transition-transform ${featured ? "translate-x-6" : "translate-x-1"}`} />
          </button>
        </div>
      </div>
    </div>
  );
}
