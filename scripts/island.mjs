// Island interaction QA: screenshots each island state + mobile views
import { chromium } from "playwright-core";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const cacheDir = path.join(os.homedir(), "Library/Caches/ms-playwright");
const build = fs
  .readdirSync(cacheDir)
  .filter((d) => d.startsWith("chromium-"))
  .sort()
  .pop();
const exe = path.join(
  cacheDir,
  build,
  "chrome-mac-arm64",
  "Google Chrome for Testing.app",
  "Contents",
  "MacOS",
  "Google Chrome for Testing"
);

const browser = await chromium.launch({ executablePath: exe, headless: true });

// Desktop — island states
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://localhost:3777", { waitUntil: "networkidle" });
await page.waitForTimeout(2000);
await page.evaluate(() => document.getElementById("island")?.scrollIntoView());
await page.waitForTimeout(1500);

for (const label of ["Resting", "Hover", "Controller"]) {
  await page.getByRole("button", { name: label, exact: true }).click();
  await page.waitForTimeout(900);
  await page.screenshot({ path: `.design-refs/island-${label.toLowerCase()}.png` });
}
await page.close();

// Mobile sweep
const mob = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
await mob.goto("http://localhost:3777", { waitUntil: "networkidle" });
await mob.waitForTimeout(2500);
await mob.screenshot({ path: ".design-refs/mob-hero.png" });
await mob.evaluate(() => document.getElementById("island")?.scrollIntoView());
await mob.waitForTimeout(1200);
await mob.screenshot({ path: ".design-refs/mob-island.png" });
await mob.evaluate(() => document.getElementById("pricing")?.scrollIntoView());
await mob.waitForTimeout(1200);
await mob.screenshot({ path: ".design-refs/mob-pricing.png" });
await mob.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await mob.waitForTimeout(1200);
await mob.screenshot({ path: ".design-refs/mob-footer.png" });

await browser.close();
console.log("done island+mobile QA");
