// Scrape Unsplash search results for photo IDs: node scripts/unsplash-scrape.mjs "<query>"
import { chromium } from "playwright-core";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const q = process.argv[2] || "green hills blue sky";
const cacheDir = path.join(os.homedir(), "Library/Caches/ms-playwright");
const build = fs.readdirSync(cacheDir).filter((d) => d.startsWith("chromium-")).sort().pop();
const exe = path.join(cacheDir, build, "chrome-mac-arm64", "Google Chrome for Testing.app", "Contents", "MacOS", "Google Chrome for Testing");

const browser = await chromium.launch({ executablePath: exe, headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(`https://unsplash.com/s/photos/${encodeURIComponent(q)}`, { waitUntil: "networkidle", timeout: 60000 }).catch(() => {});
await page.waitForTimeout(3000);
const ids = await page.evaluate(() => {
  const out = new Set();
  for (const img of document.querySelectorAll("img[src*='images.unsplash.com/photo-']")) {
    const m = img.src.match(/photo-([0-9a-f-]+)\?/);
    if (m) out.add(m[1]);
  }
  return [...out].slice(0, 20);
});
console.log(JSON.stringify(ids, null, 2));
await browser.close();
