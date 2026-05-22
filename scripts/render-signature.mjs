/**
 * Render the HTML email signature (scripts/signature.html) to a high-DPI PNG.
 *
 * Output:
 *   public/email/kaelo-signature.png          (light grey backdrop — for previews)
 *   public/email/kaelo-signature-bare.png     (cropped to signature only, transparent backdrop)
 *
 * Run with:  node scripts/render-signature.mjs
 */

import { chromium } from "playwright";
import path from "node:path";
import { mkdir } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const html = pathToFileURL(path.join(__dirname, "signature.html")).href;
const outDir = path.resolve(__dirname, "..", "public", "email");
await mkdir(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
try {
  const context = await browser.newContext({
    viewport: { width: 1200, height: 700 },
    deviceScaleFactor: 2, // retina-ish for crisp signature
  });
  const page = await context.newPage();
  await page.goto(html, { waitUntil: "networkidle" });
  // Give web fonts a beat
  await page.waitForTimeout(800);

  // Full preview (with padding)
  await page.screenshot({
    path: path.join(outDir, "kaelo-signature.png"),
    type: "png",
    fullPage: false,
  });
  console.log("→ kaelo-signature.png saved");

  // Tightly cropped signature only
  const el = await page.$(".signature");
  if (el) {
    await el.screenshot({
      path: path.join(outDir, "kaelo-signature-bare.png"),
      type: "png",
      omitBackground: false,
    });
    console.log("→ kaelo-signature-bare.png saved");
  }
} finally {
  await browser.close();
}
