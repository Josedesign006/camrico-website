# Slate — A complete presentation studio for your screen

Marketing website for **Slate**, a concept macOS screen-recording and
presentation-editing product. Built as a single-page, product-led experience:
record → shape → export, told through interactive product simulations.

> Concept marketing site — not affiliated with Apple.

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** with CSS-variable design tokens
- **Framer Motion** for component motion
- **GSAP + ScrollTrigger** for scroll reveals & parallax
- **Lenis** for smooth scrolling
- **Syne** (display) + **Inter** (UI) via Fontsource
- **Lucide** icons

## Features

- Layered hero with a scroll-driven "grow / shrink" editor window
- Interactive product demos: capture modes, canvas styling, automatic zoom,
  cursor effects, video-quality grading, audio, captions
- A live **scrubbable timeline** — drag the playhead and the zoom, cursor, and
  captions respond
- Interactive export panel with animated presets
- **Light / dark themes** (dark is primary), with a no-flash theme init
- Fully responsive, keyboard-accessible, and `prefers-reduced-motion` aware

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Production build:

```bash
npm run build
npm run start
```

## Notes

Pricing and macOS compatibility values are clearly marked placeholders in
`src/data/` — update them before publishing. All content is config-driven under
`src/data/`.
