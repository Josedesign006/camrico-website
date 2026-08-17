// Interaction QA for the ported island design
import { chromium } from "playwright-core";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const cacheDir = path.join(os.homedir(), "Library/Caches/ms-playwright");
const build = fs.readdirSync(cacheDir).filter((d) => d.startsWith("chromium-")).sort().pop();
const exe = path.join(cacheDir, build, "chrome-mac-arm64",
  "Google Chrome for Testing.app", "Contents", "MacOS", "Google Chrome for Testing");

const browser = await chromium.launch({ executablePath: exe, headless: true });
const url = "http://localhost:3777";

// desktop: scroll into rec state, open chapter menu
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(1500);
await page.evaluate(() => window.scrollTo(0, window.innerHeight * 2));
await page.waitForTimeout(900);
await page.click("#recBtn");
await page.waitForTimeout(700);
await page.screenshot({ path: ".design-refs/qa-menu.png" });

// capture tabs: switch to iPhone mode
await page.keyboard.press("Escape");
await page.click('[data-scroll][href="#capture"]', { force: true }).catch(() => {});
await page.evaluate(() => document.getElementById("capture").scrollIntoView());
await page.waitForTimeout(800);
await page.click('.recorder__tab[data-mode="iphone"]');
await page.waitForTimeout(600);
await page.screenshot({ path: ".design-refs/qa-iphone.png" });

// mobile hero + island bar
const mob = await browser.newPage({ viewport: { width: 390, height: 844 } });
await mob.goto(url, { waitUntil: "networkidle" });
await mob.waitForTimeout(1500);
await mob.screenshot({ path: ".design-refs/qa-mobile-hero.png" });
await mob.evaluate(() => window.scrollTo(0, window.innerHeight * 2.2));
await mob.waitForTimeout(900);
await mob.screenshot({ path: ".design-refs/qa-mobile-rec.png" });

console.log("qa done");
await browser.close();
