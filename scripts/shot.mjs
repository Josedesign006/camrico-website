// Screenshot helper: node scripts/shot.mjs <url> <outPrefix> [--full] [--width N] [--tokens]
import { chromium } from "playwright-core";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const [, , url, outPrefix, ...flags] = process.argv;
const full = flags.includes("--full");
const tokens = flags.includes("--tokens");
const widthIdx = flags.indexOf("--width");
const width = widthIdx >= 0 ? Number(flags[widthIdx + 1]) : 1440;

const cacheDir = path.join(os.homedir(), "Library/Caches/ms-playwright");
const builds = fs
  .readdirSync(cacheDir)
  .filter((d) => d.startsWith("chromium-"))
  .sort();
const build = builds[builds.length - 1];
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
  viewport: { width, height: 900 },
  deviceScaleFactor: 2,
});
await page.goto(url, { waitUntil: "networkidle", timeout: 60000 }).catch(() => {});
await page.waitForTimeout(3000);

if (full) {
  // scroll through the page to trigger reveals
  await page.evaluate(async () => {
    const h = document.body.scrollHeight;
    for (let y = 0; y < h; y += 600) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `${outPrefix}-full.png`, fullPage: true });
} else {
  await page.screenshot({ path: `${outPrefix}-top.png` });
}

if (tokens) {
  const t = await page.evaluate(() => {
    const cs = (el) => (el ? getComputedStyle(el) : null);
    const pick = (s) =>
      s && {
        fontFamily: s.fontFamily,
        fontSize: s.fontSize,
        fontWeight: s.fontWeight,
        lineHeight: s.lineHeight,
        letterSpacing: s.letterSpacing,
        color: s.color,
        textTransform: s.textTransform,
      };
    const h1 = document.querySelector("h1");
    const h2 = document.querySelector("h2");
    const body = document.body;
    const btn = document.querySelector('a[class*="button" i], button, a[href*="download" i]');
    const bs = cs(btn);
    return {
      bodyBg: cs(body).backgroundColor,
      bodyColor: cs(body).color,
      h1: pick(cs(h1)),
      h2: pick(cs(h2)),
      button: btn && {
        ...pick(bs),
        background: bs.backgroundColor,
        borderRadius: bs.borderRadius,
        padding: bs.padding,
        boxShadow: bs.boxShadow,
      },
      cssVars: (() => {
        const out = {};
        const rs = getComputedStyle(document.documentElement);
        for (const sheet of document.styleSheets) {
          try {
            for (const rule of sheet.cssRules) {
              if (rule.selectorText === ":root" || rule.selectorText === "html") {
                for (const prop of rule.style) {
                  if (prop.startsWith("--")) out[prop] = rs.getPropertyValue(prop).trim();
                }
              }
            }
          } catch {}
        }
        return out;
      })(),
    };
  });
  fs.writeFileSync(`${outPrefix}-tokens.json`, JSON.stringify(t, null, 2));
}

await browser.close();
console.log("done", outPrefix);
