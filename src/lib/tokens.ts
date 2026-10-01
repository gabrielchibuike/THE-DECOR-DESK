import crypto from "crypto";

const SECRET_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.CONVERTKIT_API_KEY ||
  process.env.EMAIL_API_KEY ||
  "the-decor-desk-lead-magnet-secret-key-2026";

interface TokenPayload {
  email: string;
  source: string;
  exp: number; // Unix timestamp in milliseconds
}

/**
 * Encodes a buffer to base64url string.
 */
function base64UrlEncode(str: string): string {
  return Buffer.from(str)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

/**
 * Decodes a base64url string to original string.
 */
function base64UrlDecode(str: string): string {
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4) {
    base64 += "=";
  }
  return Buffer.from(base64, "base64").toString("utf-8");
}

/**
 * Creates an HMAC-SHA256 signature for data string.
 */
function createSignature(data: string): string {
  return crypto
    .createHmac("sha256", SECRET_KEY)
    .update(data)
    .digest("hex");
}

/**
 * Generates a signed, time-limited download token.
 * Default expiration: 7 days (168 hours).
 */
export function generateDownloadToken(
  email: string,
  source: string = "elevated-home-starter-guide",
  expiresInHours: number = 168
): string {
  const exp = Date.now() + expiresInHours * 60 * 60 * 1000;
  const payload: TokenPayload = {
    email: email.toLowerCase().trim(),
    source,
    exp,
  };

  const payloadStr = JSON.stringify(payload);
  const encodedPayload = base64UrlEncode(payloadStr);
  const signature = createSignature(encodedPayload);

  return `${encodedPayload}.${signature}`;
}

/**
 * Verifies a download token.
 * Checks signature authenticity and expiration timestamp.
 */
export function verifyDownloadToken(token: string): {
  valid: boolean;
  payload?: TokenPayload;
  error?: string;
} {
  if (!token || typeof token !== "string") {
    return { valid: false, error: "Missing download token." };
  }

  const parts = token.split(".");
  if (parts.length !== 2) {
    return { valid: false, error: "Invalid token format." };
  }

  const [encodedPayload, signature] = parts;

  // 1. Verify signature
  const expectedSignature = createSignature(encodedPayload);
  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (
    signatureBuffer.length !== expectedBuffer.length ||
    !crypto.timingSafeEqual(signatureBuffer, expectedBuffer)
  ) {
    return { valid: false, error: "Invalid download signature." };
  }

  // 2. Parse payload
  try {
    const payloadStr = base64UrlDecode(encodedPayload);
    const payload: TokenPayload = JSON.parse(payloadStr);

    // 3. Check expiration
    if (Date.now() > payload.exp) {
      return { valid: false, error: "This download link has expired. Please request a new link." };
    }

    return { valid: true, payload };
  } catch {
    return { valid: false, error: "Corrupted download token." };
  }
}
