/**
 * Logopakket voor de rebrand "Pink".
 *
 * Output: public/brand/pink/logo/  én  Desktop\Kaelo Brandpack\01 Logo\
 *   kaelo-wordmark-{pink,ink,wit}-2048.png       — wordmark op vlakke achtergrond
 *   kaelo-wordmark-{ink,wit,pink}-transparant-2048.png
 *   kaelo-mark-{pink,ink}-1024.png               — monogram K
 *   kaelo-mark-{ink,wit,pink}-transparant-1024.png
 *   kaelo-lockup-{pink,ink}-2048x640.png         — mark + wordmark naast elkaar
 *
 * Run met:  node scripts/render-pink-logo.mjs
 */

import { chromium } from "playwright";
import path from "node:path";
import os from "node:os";
import { mkdir, copyFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoOut = path.resolve(__dirname, "..", "public", "brand", "pink", "logo");
const deskOut = path.join(os.homedir(), "Desktop", "Kaelo Brandpack", "01 Logo");
await mkdir(repoOut, { recursive: true });
await mkdir(deskOut, { recursive: true });

const PINK = "#FF2EB2";
const INK = "#0B0B0D";
const WHITE = "#FFFFFF";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@700;900&display=swap');`;

function doc(inner, css = "") {
  return `<!doctype html><html lang="nl"><head><meta charset="utf-8"><style>
    ${FONTS}
    *{margin:0;padding:0;box-sizing:border-box;}
    html,body{width:100%;height:100%;}
    body{display:flex;align-items:center;justify-content:center;overflow:hidden;
      font-family:'Unbounded',system-ui,sans-serif;}
    .wm{font-weight:900;letter-spacing:-.035em;line-height:.8;white-space:nowrap;display:flex;align-items:flex-start;}
    .wm sup{font-size:.19em;font-weight:700;margin-top:.12em;margin-left:.02em;}
    .mark{font-weight:900;letter-spacing:-.07em;line-height:.8;margin-left:-.03em;}
    ${css}
  </style></head><body>${inner}</body></html>`;
}

const wordmark = (fg, bg) =>
  doc(`<div class="wm" style="font-size:26vh;color:${fg};">kaelo<sup>®</sup></div>`,
      `body{background:${bg || "transparent"};}`);

const mark = (fg, bg) =>
  doc(`<div class="mark" style="font-size:74vmin;color:${fg};">K</div>`,
      `body{background:${bg || "transparent"};}`);

const lockup = (fg, bg) =>
  doc(
    `<div style="display:flex;align-items:center;gap:7vh;color:${fg};">
       <div style="width:34vh;height:34vh;border-radius:22%;background:${fg};color:${bg || WHITE};
                   display:flex;align-items:center;justify-content:center;
                   font-weight:900;font-size:24vh;letter-spacing:-.07em;line-height:1;">K</div>
       <div class="wm" style="font-size:22vh;">kaelo<sup>®</sup></div>
     </div>`,
    `body{background:${bg || "transparent"};}`
  );

const browser = await chromium.launch({ headless: true });

async function shoot(name, htmlString, w, h, transparent = false) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.setContent(htmlString, { waitUntil: "networkidle" });
  await page.waitForTimeout(700);
  const file = path.join(repoOut, name);
  await page.screenshot({ path: file, type: "png", omitBackground: transparent });
  await copyFile(file, path.join(deskOut, name));
  console.log("→", name, `(${w}×${h})`);
  await ctx.close();
}

try {
  // Wordmark op vlakke achtergrond
  await shoot("kaelo-wordmark-pink-2048.png", wordmark(INK, PINK), 2048, 640);
  await shoot("kaelo-wordmark-ink-2048.png", wordmark(PINK, INK), 2048, 640);
  await shoot("kaelo-wordmark-wit-2048.png", wordmark(INK, WHITE), 2048, 640);

  // Wordmark transparant
  await shoot("kaelo-wordmark-ink-transparant-2048.png", wordmark(INK, null), 2048, 640, true);
  await shoot("kaelo-wordmark-wit-transparant-2048.png", wordmark(WHITE, null), 2048, 640, true);
  await shoot("kaelo-wordmark-pink-transparant-2048.png", wordmark(PINK, null), 2048, 640, true);

  // Monogram
  await shoot("kaelo-mark-pink-1024.png", mark(INK, PINK), 1024, 1024);
  await shoot("kaelo-mark-ink-1024.png", mark(PINK, INK), 1024, 1024);
  await shoot("kaelo-mark-ink-transparant-1024.png", mark(INK, null), 1024, 1024, true);
  await shoot("kaelo-mark-wit-transparant-1024.png", mark(WHITE, null), 1024, 1024, true);
  await shoot("kaelo-mark-pink-transparant-1024.png", mark(PINK, null), 1024, 1024, true);

  // Lockup
  await shoot("kaelo-lockup-pink-2048x640.png", lockup(INK, PINK), 2048, 640);
  await shoot("kaelo-lockup-ink-2048x640.png", lockup(PINK, INK), 2048, 640);

  console.log("done");
} catch (e) {
  console.error("fatal:", e);
  process.exitCode = 1;
} finally {
  await browser.close();
}
