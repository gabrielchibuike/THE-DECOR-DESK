import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

export async function GET(
  request: NextRequest,
  props: { params: Promise<{ slug: string }> }
) {
  const { slug } = await props.params;
  const { searchParams } = new URL(request.url);
  const retailerParam = searchParams.get("r");
  const postSlug = searchParams.get("post") || request.headers.get("referer") || "";

  const supabase = createServiceClient();

  // Look up product by ID (uuid) or by name slug
  const { data: product, error } = await supabase
    .from("products")
    .select("id, name, retailers, click_count")
    .eq("id", slug)
    .maybeSingle();

  if (error || !product) {
    return new NextResponse("Product not found", { status: 404 });
  }

  const retailers: { retailerName: string; affiliateUrl: string; price?: string }[] =
    product.retailers ?? [];

  let link = retailers[0];
  if (retailerParam) {
    const found = retailers.find(
      (l) => l.retailerName.toLowerCase() === retailerParam.toLowerCase()
    );
    if (found) link = found;
  }

  if (!link?.affiliateUrl) {
    return new NextResponse("Affiliate link not found", { status: 404 });
  }

  // Fire-and-forget: log click + increment count
  supabase
    .from("clicks")
    .insert({ product_id: product.id, post_slug: postSlug, retailer: link.retailerName })
    .then(() => {});

  supabase
    .from("products")
    .update({ click_count: (product.click_count ?? 0) + 1 })
    .eq("id", product.id)
    .then(() => {});

  return NextResponse.redirect(link.affiliateUrl, 302);
}
