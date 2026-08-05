/**
 * Render de brand-assets voor de rebrand "Pink" (2026-08-04).
 *
 * Output:
 *   public/brand/pink/kaelo-pink-icon-{1024,512,192,180,32}.png
 *   public/brand/pink/kaelo-pink-og-1200x630.png     — Open Graph / Google
 *   public/brand/pink/kaelo-pink-banner-1500x500.png — LinkedIn/X banner
 *
 * Kopieert daarna naar de Next-metadata-routes, zodat /start en /manifest
 * dezelfde favicon en share-image krijgen als de statische pagina's:
 *   app/icon.png (512) · app/apple-icon.png (180) · app/opengraph-image.png
 *
 * Run met:  node scripts/render-pink-brand.mjs
 */

import { chromium } from "playwright";
import path from "node:path";
import { mkdir, copyFile } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "public", "brand", "pink");
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
    // webfonts een moment gunnen — cruciaal op kleine formaten
    await page.waitForTimeout(900);
    await page.screenshot({
      path: path.join(outDir, job.name),
      type: "png",
    });
    console.log("→", job.name, `(${job.w}×${job.h})`);
    await ctx.close();
  }
}

try {
  await render(url("pink-icon.html"), [
    { name: "kaelo-pink-icon-1024.png", w: 1024, h: 1024 },
    { name: "kaelo-pink-icon-512.png", w: 512, h: 512 },
    { name: "kaelo-pink-icon-192.png", w: 192, h: 192 },
    { name: "kaelo-pink-icon-180.png", w: 180, h: 180 },
    { name: "kaelo-pink-icon-32.png", w: 32, h: 32 },
  ]);

  await render(url("pink-og.html"), [
    { name: "kaelo-pink-og-1200x630.png", w: 1200, h: 630 },
    { name: "kaelo-pink-banner-1500x500.png", w: 1500, h: 500 },
  ]);

  // Next-metadata-routes gelijktrekken met de nieuwe huisstijl
  const copies = [
    ["kaelo-pink-icon-512.png", "app/icon.png"],
    ["kaelo-pink-icon-180.png", "app/apple-icon.png"],
    ["kaelo-pink-og-1200x630.png", "app/opengraph-image.png"],
  ];
  for (const [from, to] of copies) {
    await copyFile(path.join(outDir, from), path.join(root, to));
    console.log("→", to, `(uit ${from})`);
  }

  console.log("done");
} catch (e) {
  console.error("fatal:", e);
  process.exitCode = 1;
} finally {
  await browser.close();
}
