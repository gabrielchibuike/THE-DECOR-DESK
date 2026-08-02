import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const { email, consent, leadMagnetName, sourcePage } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }
    if (!consent) {
      return NextResponse.json({ error: "Please check the consent box to subscribe." }, { status: 400 });
    }

    const results: string[] = [];

    // ── 1. ConvertKit Integration ─────────────────────────────
    const ckApiKey = process.env.CONVERTKIT_API_KEY;
    const ckFormId = process.env.CONVERTKIT_FORM_ID;

    if (ckApiKey && ckFormId) {
      const ckRes = await fetch(`https://api.convertkit.com/v3/forms/${ckFormId}/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          api_key: ckApiKey,
          email,
          fields: leadMagnetName ? { lead_magnet: leadMagnetName } : undefined,
        }),
      });
      if (ckRes.ok) {
        results.push("convertkit");
      } else {
        const err = await ckRes.json().catch(() => ({}));
        console.error("ConvertKit error:", err);
      }
    }

    // ── 2. Mirror to Supabase subscribers table ───────────────
    const supabase = createServiceClient();
    const { error: dbError } = await supabase.from("subscribers").upsert(
      { email, source_page: sourcePage ?? leadMagnetName ?? "unknown" },
      { onConflict: "email" }
    );
    if (dbError) {
      console.error("Supabase subscriber insert error:", dbError.message);
    } else {
      results.push("supabase");
    }

    if (results.length === 0) {
      return NextResponse.json(
        { error: "Could not complete signup. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "You're in! Check your email for your free design pack." },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Subscribe error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
