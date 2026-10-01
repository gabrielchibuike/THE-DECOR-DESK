import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { verifyDownloadToken } from "@/lib/tokens";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token) {
      return new NextResponse(
        `<!DOCTYPE html>
        <html>
          <head>
            <title>Invalid Download Request — The Decor Desk</title>
            <style>
              body { font-family: Georgia, serif; background: #FAF9F6; color: #2B2B2B; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; padding: 20px; text-align: center; }
              .card { background: #FFFFFF; border: 1px solid #E8E2D9; padding: 40px; border-radius: 12px; max-width: 480px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
              h1 { font-size: 24px; margin-bottom: 12px; color: #1F1F1F; }
              p { font-size: 14px; line-height: 1.6; color: #555555; margin-bottom: 24px; }
              a { display: inline-block; background: #1F1F1F; color: #FAF9F6; text-decoration: none; padding: 12px 24px; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; border-radius: 6px; }
              a:hover { background: #8C8275; }
            </style>
          </head>
          <body>
            <div class="card">
              <h1>Download Link Required</h1>
              <p>Please request your free guide through our resource page to get a secure download link.</p>
              <a href="/free-resources/elevated-home-starter-guide">Get Free Guide</a>
            </div>
          </body>
        </html>`,
        {
          status: 400,
          headers: { "Content-Type": "text/html; charset=utf-8" },
        }
      );
    }

    const { valid, error } = verifyDownloadToken(token);

    if (!valid) {
      return new NextResponse(
        `<!DOCTYPE html>
        <html>
          <head>
            <title>Link Expired or Invalid — The Decor Desk</title>
            <style>
              body { font-family: Georgia, serif; background: #FAF9F6; color: #2B2B2B; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; padding: 20px; text-align: center; }
              .card { background: #FFFFFF; border: 1px solid #E8E2D9; padding: 40px; border-radius: 12px; max-width: 480px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
              h1 { font-size: 24px; margin-bottom: 12px; color: #1F1F1F; }
              p { font-size: 14px; line-height: 1.6; color: #555555; margin-bottom: 24px; }
              a { display: inline-block; background: #1F1F1F; color: #FAF9F6; text-decoration: none; padding: 12px 24px; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; border-radius: 6px; }
              a:hover { background: #8C8275; }
            </style>
          </head>
          <body>
            <div class="card">
              <h1>Link Expired or Invalid</h1>
              <p>${error || "This download link is no longer valid. Please request a new copy of your guide."}</p>
              <a href="/free-resources/elevated-home-starter-guide">Request New Link</a>
            </div>
          </body>
        </html>`,
        {
          status: 403,
          headers: { "Content-Type": "text/html; charset=utf-8" },
        }
      );
    }

    // Locate PDF file in private storage
    const pdfPath = path.join(
      process.cwd(),
      "src",
      "private",
      "The-Elevated-Home-Starter-Guide.pdf"
    );

    if (!fs.existsSync(pdfPath)) {
      console.error("PDF file not found at expected path:", pdfPath);
      return NextResponse.json(
        { error: "Requested guide file is currently unavailable." },
        { status: 404 }
      );
    }

    const fileBuffer = fs.readFileSync(pdfPath);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="The-Elevated-Home-Starter-Guide.pdf"',
        "Content-Length": fileBuffer.length.toString(),
        "Cache-Control": "private, no-store, no-cache, must-revalidate",
      },
    });
  } catch (err: any) {
    console.error("PDF Download endpoint error:", err);
    return NextResponse.json(
      { error: "Something went wrong processing your download request." },
      { status: 500 }
    );
  }
}
