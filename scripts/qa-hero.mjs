// Verify the hero video plays: grab a frame a couple seconds in
import { chromium } from "playwright-core";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const cacheDir = path.join(os.homedir(), "Library/Caches/ms-playwright");
const build = fs.readdirSync(cacheDir).filter((d) => d.startsWith("chromium-")).sort().pop();
const exe = path.join(cacheDir, build, "chrome-mac-arm64",
  "Google Chrome for Testing.app", "Contents", "MacOS", "Google Chrome for Testing");

const browser = await chromium.launch({ executablePath: exe, headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://localhost:3777", { waitUntil: "networkidle" });
await page.waitForTimeout(3500); // let the hero video play a few seconds

const info = await page.evaluate(() => {
  const v = document.querySelector(".canvas-card--hero video");
  return v ? { w: v.videoWidth, h: v.videoHeight, t: v.currentTime, paused: v.paused, dur: v.duration } : null;
});
console.log("hero video:", JSON.stringify(info));

await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(400);
await page.screenshot({ path: ".design-refs/qa-hero-new.png" });
console.log("shot saved");
await browser.close();
