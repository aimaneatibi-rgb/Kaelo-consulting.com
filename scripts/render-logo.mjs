/**
 * Render the Kaelo logo set: monogram mark + full wordmark.
 *
 * Output: public/brand/
 *   kaelo-icon-{1024,512,192,180,32}.png        — K. monogram on solid black
 *   kaelo-icon-transparent-{1024,512}.png       — K. monogram on transparent
 *                                                 (dark mark — flip in image
 *                                                  editor for light backgrounds)
 *   kaelo-wordmark-{1024,512}.png               — full "Kaelo." on solid black
 *   kaelo-wordmark-og-1200x630.png              — Open Graph share image
 *   kaelo-wordmark-banner-1500x500.png          — banner for LinkedIn/etc.
 *
 * Run with:  node scripts/render-logo.mjs
 */

import { chromium } from "playwright";
import path from "node:path";
import { mkdir } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(__dirname, "..", "public", "brand");
await mkdir(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });

function url(file) {
  return pathToFileURL(path.join(__dirname, file)).href;
}

async function render(htmlPath, jobs) {
  for (const job of jobs) {
    const ctx = await browser.newContext({
      viewport: { width: job.w, height: job.h },
      deviceScaleFactor: 1,
    });
    const page = await ctx.newPage();
    await page.goto(htmlPath, { waitUntil: "networkidle" });
    // give web fonts a beat — important at small sizes
    await page.waitForTimeout(800);
    const target = path.join(outDir, job.name);
    await page.screenshot({
      path: target,
      type: "png",
      omitBackground: !!job.transparent,
    });
    console.log("→", job.name, `(${job.w}×${job.h})`);
    await ctx.close();
  }
}

try {
  // Monogram — solid black bg
  await render(url("logo-mark.html"), [
    { name: "kaelo-icon-1024.png", w: 1024, h: 1024 },
    { name: "kaelo-icon-512.png", w: 512, h: 512 },
    { name: "kaelo-icon-192.png", w: 192, h: 192 },
    { name: "kaelo-icon-180.png", w: 180, h: 180 },
    { name: "kaelo-icon-32.png", w: 32, h: 32 },
  ]);

  // Monogram — transparent bg (dark mark, for light contexts)
  await render(url("logo-mark-transparent.html"), [
    { name: "kaelo-icon-transparent-1024.png", w: 1024, h: 1024, transparent: true },
    { name: "kaelo-icon-transparent-512.png", w: 512, h: 512, transparent: true },
  ]);

  // Wordmark — solid black bg
  await render(url("logo-wordmark.html"), [
    { name: "kaelo-wordmark-1024.png", w: 1024, h: 1024 },
    { name: "kaelo-wordmark-512.png", w: 512, h: 512 },
    { name: "kaelo-wordmark-og-1200x630.png", w: 1200, h: 630 },
    { name: "kaelo-wordmark-banner-1500x500.png", w: 1500, h: 500 },
  ]);

  console.log("done");
} catch (e) {
  console.error("fatal:", e);
  process.exitCode = 1;
} finally {
  await browser.close();
}
