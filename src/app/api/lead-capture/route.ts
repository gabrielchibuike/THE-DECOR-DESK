import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { generateDownloadToken } from "@/lib/tokens";
import { sendDeliveryEmail } from "@/lib/email";

// Simple email regex for validation
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, email, honeypot } = body;

    // 1. Spam check (honeypot field)
    if (honeypot && honeypot.length > 0) {
      // Fake success for bots
      return NextResponse.json(
        {
          message: "You're in! 🎉 Your guide is on its way to your inbox.",
          downloadUrl: "#",
        },
        { status: 200 }
      );
    }

    // 2. Validate First Name
    if (!firstName || typeof firstName !== "string" || !firstName.trim()) {
      return NextResponse.json(
        { error: "Please enter your first name." },
        { status: 400 }
      );
    }

    // 3. Validate Email
    if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email.trim())) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();
    const sanitizedFirstName = firstName.trim();
    const leadSource = "elevated-home-starter-guide";

    // 4. Save/Upsert lead to Supabase database
    const supabase = createServiceClient();
    const { error: dbError } = await supabase.from("subscribers").upsert(
      {
        email: normalizedEmail,
        first_name: sanitizedFirstName,
        source: leadSource,
        source_page: leadSource,
      },
      { onConflict: "email" }
    );

    if (dbError) {
      console.error("Database save subscriber error:", dbError.message);
      // Non-blocking fallback: proceed with sending email even if DB log fails
    }

    // 5. Generate secure tokenized download URL
    const token = generateDownloadToken(normalizedEmail, leadSource);
    const origin =
      process.env.APP_URL ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      request.nextUrl.origin ||
      "https://the-decor-desk.vercel.app";
      
    const cleanOrigin = origin.replace(/\/$/, "");
    const downloadUrl = `${cleanOrigin}/api/download/guide?token=${encodeURIComponent(token)}`;

    // 6. Send delivery email
    const emailResult = await sendDeliveryEmail({
      firstName: sanitizedFirstName,
      email: normalizedEmail,
      downloadUrl,
    });

    if (!emailResult.success) {
      console.error("Email delivery warning:", emailResult.error);
    }

    // 7. Success response
    return NextResponse.json(
      {
        success: true,
        message: "You're in! 🎉",
        subtext: "Your guide is on its way to your inbox. Check your email for the download link.",
        spamNotice: "Didn't receive it? Check your spam or promotions folder.",
        downloadUrl, // Provided for instant client feedback/fallback if user wants immediate access
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Lead capture endpoint error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
