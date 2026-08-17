/* One-shot: convert the camrico-main static index.html body into JSX for page.tsx */
import { readFileSync, writeFileSync } from "node:fs";

const html = readFileSync(
  "/Users/nilmanikumar/Downloads/camrico-main-extract/camrico-main/index.html",
  "utf8"
);

// body content, minus the trailing script tag
let body = html.match(/<body>([\s\S]*)<\/body>/)[1];
body = body.replace(/\s*<script src="island\.js"><\/script>\s*$/, "\n");

// HTML comments -> JSX comments
body = body.replace(/<!--([\s\S]*?)-->/g, (_, c) => `{/*${c.replace(/\*\//g, "*\\/")}*/}`);

// class -> className
body = body.replace(/\bclass="/g, 'className="');

// asset paths -> absolute
body = body.replace(/(src|href)="assets\//g, '$1="/assets/');

// drop onerror handlers (all referenced images exist)
body = body.replace(/\s+onerror="[^"]*"/g, "");

// kebab-case SVG attrs -> camelCase
for (const [k, v] of Object.entries({
  "stroke-width": "strokeWidth",
  "stroke-linecap": "strokeLinecap",
  "stroke-linejoin": "strokeLinejoin",
  "stroke-dasharray": "strokeDasharray",
  "fill-rule": "fillRule",
  "clip-rule": "clipRule",
})) {
  body = body.replaceAll(`${k}=`, `${v}=`);
}

// media attrs
body = body.replace(/\bautoplay\b/g, "autoPlay").replace(/\bplaysinline\b/g, "playsInline");

// style="a:b;c:d" -> style={{...}}  (CSS custom props kept quoted)
body = body.replace(/style="([^"]*)"/g, (_, css) => {
  const props = css
    .split(";")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((decl) => {
      const i = decl.indexOf(":");
      const key = decl.slice(0, i).trim();
      const val = decl.slice(i + 1).trim();
      const jsKey = key.startsWith("--")
        ? `"${key}"`
        : key.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
      return `${jsKey}: "${val}"`;
    })
    .join(", ");
  // custom properties need a cast past CSSProperties
  return css.includes("--")
    ? `style={css({ ${props} })}`
    : `style={{ ${props} }}`;
});

const out = `/* Ported 1:1 from the camrico-main static redesign (index.html). */
import type { CSSProperties } from "react";

/* CSS custom properties in style attributes */
const css = (o: Record<string, string>) => o as CSSProperties;

export default function Page() {
  return (
    <>
${body.replace(/^/gm, "      ").replace(/^\s+$/gm, "")}
    </>
  );
}
`;

writeFileSync("/Users/nilmanikumar/Downloads/screen-main/src/app/page.tsx", out);
console.log("written", out.length, "chars");
