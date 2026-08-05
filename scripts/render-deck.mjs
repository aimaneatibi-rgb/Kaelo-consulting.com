/**
 * Rendert scripts/deck-kaelo.html naar PDF (1280×720, 10 slides) én naar losse
 * PNG's per slide — zelfde opzet als het KLOK-pitchdeck.
 *
 * Run met:  node scripts/render-deck.mjs
 * Output:   Desktop\Kaelo Brandpack\03 Pitchdeck\
 */

import { chromium } from "playwright";
import path from "node:path";
import os from "node:os";
import { mkdir } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(os.homedir(), "Desktop", "Kaelo Brandpack", "03 Pitchdeck");
await mkdir(OUT, { recursive: true });

const src = pathToFileURL(path.join(__dirname, "deck-kaelo.html")).href;
const browser = await chromium.launch({ headless: true });

try {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  const page = await ctx.newPage();
  await page.goto(src, { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);

  const count = await page.locator(".slide").count();

  await page.pdf({
    path: path.join(OUT, "Kaelo-pitchdeck.pdf"),
    width: "1280px",
    height: "720px",
    printBackground: true,
    pageRanges: `1-${count}`,
  });
  console.log("→ Kaelo-pitchdeck.pdf", `(${count} slides)`);

  for (let i = 0; i < count; i++) {
    const name = `slide-${String(i + 1).padStart(2, "0")}.png`;
    await page.locator(".slide").nth(i).screenshot({ path: path.join(OUT, name) });
    console.log("→", name);
  }

  await ctx.close();
  console.log("done");
} catch (e) {
  console.error("fatal:", e);
  process.exitCode = 1;
} finally {
  await browser.close();
}
