/**
 * Klok screenshots for the Kaelo /werk page.
 *
 * Prerequisites:
 *  1. Klok dev server running on http://localhost:3001
 *  2. `npm i -D playwright` + `npx playwright install chromium` in this project
 *
 * Run with:  node scripts/klok-screenshots.mjs
 */

import { chromium } from "playwright";
import path from "node:path";
import { mkdir } from "node:fs/promises";

const BASE = process.env.KLOK_URL ?? "http://localhost:3001";
const OUT = path.resolve("public/images/klok");
const VIEWPORT = { width: 1600, height: 1000 };

const accounts = {
  werkgever: { email: "test.werkgever@klokworks.nl", password: "TestKlok2026!" },
  werknemer: { email: "test.werknemer@klokworks.nl", password: "TestKlok2026!" },
};

await mkdir(OUT, { recursive: true });

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: VIEWPORT });
const page = await context.newPage();

function log(...args) {
  console.log("[klok-screenshots]", ...args);
}

async function shot(file) {
  const target = path.join(OUT, file);
  await page.screenshot({ path: target, fullPage: false, type: "jpeg", quality: 88 });
  log("saved", target);
}

async function safeGoto(url) {
  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: 20000 });
  } catch (e) {
    log("goto failed (continuing)", url, e.message);
  }
}

async function login({ email, password }) {
  await safeGoto(`${BASE}/login`);
  // Defensive selectors — Klok uses Supabase auth UI patterns
  const emailField = page
    .locator('input[type="email"], input[name="email"], #email')
    .first();
  const pwField = page
    .locator('input[type="password"], input[name="password"], #password')
    .first();
  await emailField.waitFor({ state: "visible", timeout: 8000 });
  await emailField.fill(email);
  await pwField.fill(password);
  const submit = page
    .locator(
      'button[type="submit"], button:has-text("Inloggen"), button:has-text("Login")'
    )
    .first();
  await submit.click();
  // Wait for navigation away from /login
  try {
    await page.waitForURL((url) => !url.pathname.startsWith("/login"), {
      timeout: 12000,
    });
    await page.waitForLoadState("networkidle", { timeout: 8000 });
  } catch (e) {
    log("login redirect timed out", e.message);
  }
}

try {
  // 1. Landing / public homepage
  log("landing");
  await safeGoto(`${BASE}/`);
  await page.waitForTimeout(800);
  await shot("01-landing.jpg");

  // 2. Login page itself
  log("login page");
  await safeGoto(`${BASE}/login`);
  await page.waitForTimeout(600);
  await shot("02-login.jpg");

  // 3. Werkgever dashboard
  log("login werkgever");
  await login(accounts.werkgever);
  await page.waitForTimeout(1200);
  await shot("03-werkgever-dashboard.jpg");

  // 3b. Try a couple of likely werkgever sub-routes
  for (const route of ["/werkgever/shifts", "/werkgever/vacatures", "/dashboard"]) {
    await safeGoto(`${BASE}${route}`);
    if (page.url().includes(route)) {
      await page.waitForTimeout(800);
      const file = `03-werkgever-${route.split("/").pop()}.jpg`;
      await shot(file);
    }
  }

  // 4. Werknemer
  log("logout + login werknemer");
  await context.clearCookies();
  await login(accounts.werknemer);
  await page.waitForTimeout(1200);
  await shot("04-werknemer-dashboard.jpg");

  for (const route of ["/werknemer/shifts", "/werknemer/profiel", "/dashboard"]) {
    await safeGoto(`${BASE}${route}`);
    if (page.url().includes(route)) {
      await page.waitForTimeout(800);
      const file = `04-werknemer-${route.split("/").pop()}.jpg`;
      await shot(file);
    }
  }

  log("done");
} catch (e) {
  log("fatal", e);
  process.exitCode = 1;
} finally {
  await browser.close();
}
