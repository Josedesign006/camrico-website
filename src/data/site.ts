import type { NavItem } from "@/types";

export const site = {
  name: "Camrico",
  tagline: "A complete presentation studio for your screen.",
  // Always serves the newest build from GitHub Releases.
  // `/releases/latest/download/<asset>` redirects to the latest release's asset,
  // so publishing a new release updates the download with no redeploy.
  // IMPORTANT: every future release MUST name its .dmg asset exactly
  // "Camrico.dmg" or this URL will 404.
  download: {
    href: "https://github.com/Josedesign006/camrico-website/releases/latest/download/Camrico.dmg",
    fileName: "Camrico.dmg",
    label: "Download for Mac",
    macOS: "macOS 14 Sonoma or later",
    silicon: "Universal — Apple Silicon & Intel",
    size: "10 MB",
    version: "1.4",
  },
  demoHref: "#demo",
} as const;

export const navItems: NavItem[] = [
  { label: "Features", href: "#capture" },
  { label: "Editor", href: "#timeline" },
  { label: "Audio", href: "#audio" },
  { label: "Export", href: "#export" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

/** Section ids used by the scroll-spy active indicator. */
export const spySections = [
  "capture",
  "timeline",
  "audio",
  "export",
  "pricing",
  "faq",
];
