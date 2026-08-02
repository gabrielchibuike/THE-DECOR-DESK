import { createPublicClient, createClient } from "@/lib/supabase/server";

export interface RetailerLink {
  retailerName: string;
  affiliateUrl: string;
  price?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  retailers: RetailerLink[];
  click_count: number;
  created_at: string;
}

export async function getAllProducts(): Promise<Product[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("name");
  if (error) { console.error("getAllProducts:", error.message); return []; }
  return data ?? [];
}

export async function getProductById(id: string): Promise<Product | null> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();
  if (error) return null;
  return data;
}

export async function incrementClickCount(productId: string): Promise<void> {
  const supabase = await createClient();
  await supabase.rpc("increment_click_count", { product_id: productId });
}
