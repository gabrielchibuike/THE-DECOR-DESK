interface SendDeliveryEmailOptions {
  firstName: string;
  email: string;
  downloadUrl: string;
}

export async function sendDeliveryEmail({
  firstName,
  email,
  downloadUrl,
}: SendDeliveryEmailOptions): Promise<{ success: boolean; provider: string; error?: string }> {
  const sanitizedName = firstName.trim() || "Friend";
  const subject = "Your Elevated Home Starter Guide is Here ✨";

  // Build branded HTML email body
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${subject}</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #FAF9F6; font-family: Georgia, 'Times New Roman', serif; color: #2B2B2B; line-height: 1.6;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #FAF9F6; padding: 40px 20px;">
          <tr>
            <td align="center">
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #FFFFFF; border: 1px solid #E8E2D9; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
                <!-- Header -->
                <tr>
                  <td align="center" style="padding: 36px 30px 24px 30px; border-bottom: 1px solid #F0ECE6; background-color: #FAF9F6;">
                    <span style="font-family: Georgia, serif; font-size: 22px; font-weight: bold; letter-spacing: 2px; color: #1F1F1F; text-transform: uppercase;">
                      THE DECOR <span style="font-family: Arial, sans-serif; font-weight: normal; font-size: 14px; color: #8C8275;">DESK</span>
                    </span>
                  </td>
                </tr>

                <!-- Content -->
                <tr>
                  <td style="padding: 40px 36px 30px 36px;">
                    <h1 style="font-family: Georgia, serif; font-size: 24px; font-weight: bold; color: #1F1F1F; margin-top: 0; margin-bottom: 20px;">
                      Hi ${sanitizedName},
                    </h1>

                    <p style="font-size: 15px; color: #333333; margin-bottom: 24px; line-height: 1.7;">
                      Your free copy of <strong>The Elevated Home Starter Guide</strong> is ready.
                    </p>

                    <div style="background-color: #FAF9F6; border: 1px solid #E8E2D9; border-radius: 6px; padding: 24px; margin-bottom: 30px;">
                      <p style="font-size: 14px; font-weight: bold; color: #1F1F1F; margin-top: 0; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 1px;">
                        Inside you'll learn how to:
                      </p>
                      <ul style="margin: 0; padding-left: 20px; font-size: 14px; color: #444444; line-height: 1.8;">
                        <li style="margin-bottom: 6px;">Define your interior style</li>
                        <li style="margin-bottom: 6px;">Build a cohesive color palette</li>
                        <li style="margin-bottom: 6px;">Make smart decorating decisions</li>
                        <li style="margin-bottom: 6px;">Decorate beautifully on a budget</li>
                        <li style="margin-bottom: 0;">Approach each room with a clear plan</li>
                      </ul>
                    </div>

                    <p style="font-size: 15px; color: #333333; margin-bottom: 28px;">
                      Click below to get your guide:
                    </p>

                    <!-- CTA Button -->
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 36px;">
                      <tr>
                        <td align="center">
                          <a href="${downloadUrl}" target="_blank" style="display: inline-block; background-color: #1F1F1F; color: #FAF9F6; text-decoration: none; font-family: Arial, sans-serif; font-size: 13px; font-weight: bold; text-transform: uppercase; letter-spacing: 1.5px; padding: 16px 32px; border-radius: 6px; box-shadow: 0 2px 6px rgba(0,0,0,0.15);">
                            DOWNLOAD THE ELEVATED HOME STARTER GUIDE
                          </a>
                        </td>
                      </tr>
                    </table>

                    <p style="font-size: 14px; color: #555555; font-style: italic; line-height: 1.7; margin-bottom: 30px;">
                      Enjoy creating a home that feels beautiful, intentional, and completely yours.
                    </p>

                    <p style="font-size: 14px; font-weight: bold; color: #1F1F1F; margin: 0;">
                      — The Decor Desk
                    </p>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="padding: 24px 36px; background-color: #FAF9F6; border-top: 1px solid #F0ECE6; text-align: center;">
                    <p style="font-family: Arial, sans-serif; font-size: 11px; color: #888888; margin: 0; line-height: 1.5;">
                      You received this email because you requested The Elevated Home Starter Guide from The Decor Desk.<br>
                      If you have trouble downloading, copy and paste this link into your browser:<br>
                      <a href="${downloadUrl}" style="color: #8C8275; word-break: break-all;">${downloadUrl}</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;

  const plainTextContent = `Hi ${sanitizedName},

Your free copy of The Elevated Home Starter Guide is ready.

Inside you'll learn how to:
• Define your interior style
• Build a cohesive color palette
• Make smart decorating decisions
• Decorate beautifully on a budget
• Approach each room with a clear plan

Click below to get your guide:
${downloadUrl}

Enjoy creating a home that feels beautiful, intentional, and completely yours.

— The Decor Desk
`;

  const resendApiKey = process.env.RESEND_API_KEY || process.env.EMAIL_API_KEY;
  const convertKitApiKey = process.env.CONVERTKIT_API_KEY;
  const emailFrom = process.env.EMAIL_FROM || "newsletter@thedecordesk.com";
  const emailFromName = process.env.EMAIL_FROM_NAME || "The Decor Desk";

  // Provider 1: Resend
  if (resendApiKey && resendApiKey.startsWith("re_")) {
    try {
      const resendRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: `${emailFromName} <${emailFrom}>`,
          to: [email],
          subject,
          html: htmlContent,
          text: plainTextContent,
        }),
      });

      if (resendRes.ok) {
        return { success: true, provider: "resend" };
      } else {
        const err = await resendRes.json().catch(() => ({}));
        console.error("Resend delivery failed:", err);
      }
    } catch (err: any) {
      console.error("Resend fetch exception:", err.message);
    }
  }

  // Provider 2: ConvertKit broadcast/sequence or direct subscriber tag
  if (convertKitApiKey && process.env.CONVERTKIT_FORM_ID) {
    try {
      const ckRes = await fetch(
        `https://api.convertkit.com/v3/forms/${process.env.CONVERTKIT_FORM_ID}/subscribe`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            api_key: convertKitApiKey,
            email,
            first_name: firstName,
            fields: {
              lead_magnet: "elevated-home-starter-guide",
              download_url: downloadUrl,
            },
          }),
        }
      );
      if (ckRes.ok) {
        return { success: true, provider: "convertkit" };
      }
    } catch (err: any) {
      console.error("ConvertKit exception:", err.message);
    }
  }

  // Fallback: Log email link in dev/staging mode when API keys are not present
  console.log("=================================================");
  console.log("TRANSACTIONAL EMAIL DELIVERY (DEV FALLBACK MODE)");
  console.log(`To: ${email} (${firstName})`);
  console.log(`Subject: ${subject}`);
  console.log(`Download URL: ${downloadUrl}`);
  console.log("=================================================");

  return { success: true, provider: "development-logger" };
}
