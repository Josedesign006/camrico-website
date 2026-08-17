// Fold-by-fold shots: node scripts/folds.mjs <url> <outPrefix> [maxFolds]
import { chromium } from "playwright-core";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const [, , url, outPrefix, maxFoldsArg] = process.argv;
const maxFolds = Number(maxFoldsArg || 14);

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
const page = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
});
await page.goto(url, { waitUntil: "networkidle", timeout: 60000 }).catch(() => {});
await page.waitForTimeout(2500);

// pre-scroll to trigger reveals
await page.evaluate(async () => {
  const h = document.body.scrollHeight;
  for (let y = 0; y < h; y += 700) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 100));
  }
  window.scrollTo(0, 0);
});
await page.waitForTimeout(1200);

const total = await page.evaluate(() => document.body.scrollHeight);
const step = 850;
const folds = Math.min(maxFolds, Math.ceil(total / step));
for (let i = 0; i < folds; i++) {
  await page.evaluate((y) => window.scrollTo(0, y), i * step);
  await page.waitForTimeout(450);
  await page.screenshot({ path: `${outPrefix}-fold-${String(i).padStart(2, "0")}.png` });
}
await browser.close();
console.log("done", folds, "folds, total height", total);
