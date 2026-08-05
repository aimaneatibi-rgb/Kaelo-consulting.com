/**
 * Rendert de e-mailhandtekening naar een PNG-voorbeeld.
 * De HTML zelf is het echte bestand — die plak je in Gmail, zodat de links
 * klikbaar blijven en de tekst meeschaalt. De PNG is puur ter controle.
 *
 * Run met:  node scripts/render-pink-signature.mjs
 */

import { chromium } from "playwright";
import path from "node:path";
import os from "node:os";
import { pathToFileURL } from "node:url";

const dir = path.join(os.homedir(), "Desktop", "Kaelo Brandpack", "05 Handtekening");
const src = pathToFileURL(path.join(dir, "handtekening-aimane.html")).href;

const browser = await chromium.launch({ headless: true });
try {
  const ctx = await browser.newContext({
    viewport: { width: 700, height: 320 },
    deviceScaleFactor: 2,
  });
  const page = await ctx.newPage();
  await page.goto(src, { waitUntil: "networkidle" });
  await page.addStyleTag({ content: "body{margin:0;padding:28px;background:#FFF4FA;}" });
  await page.waitForTimeout(400);

  await page.locator("body").screenshot({
    path: path.join(dir, "handtekening-aimane-voorbeeld.png"),
  });
  console.log("→ handtekening-aimane-voorbeeld.png");
  await ctx.close();
} catch (e) {
  console.error("fatal:", e);
  process.exitCode = 1;
} finally {
  await browser.close();
}
