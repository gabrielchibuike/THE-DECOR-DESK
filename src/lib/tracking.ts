import fs from "fs";
import path from "path";

export interface ClickLogEntry {
  timestamp: string;
  productId: string;
  retailer: string;
  userAgent: string;
  referrer: string;
}

export function logClick(productId: string, retailer: string, userAgent?: string, referrer?: string) {
  const timestamp = new Date().toISOString();
  const logEntry: ClickLogEntry = {
    timestamp,
    productId,
    retailer,
    userAgent: userAgent || "unknown",
    referrer: referrer || "unknown",
  };

  // 1. Log to console for production cloud logging integration (e.g. Vercel logs)
  console.log(`[AFFILIATE_CLICK] ${JSON.stringify(logEntry)}`);

  // 2. Log to a local flat file in development
  try {
    const logDir = path.join(process.cwd(), "src/data");
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }
    const logFilePath = path.join(logDir, "clicks.log");
    fs.appendFileSync(logFilePath, JSON.stringify(logEntry) + "\n", "utf-8");
  } catch (error) {
    // Fail silently in read-only production serverless environments (like Vercel functions)
    console.warn("Click tracking file log failed (normal in serverless/Vercel):", error);
  }
}
