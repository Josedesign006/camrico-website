import type { NavItem } from "@/types";

export const site = {
  name: "Slate",
  tagline: "A complete presentation studio for your screen.",
  // Self-hosted app package — direct download, no external redirect.
  download: {
    href: "/Screen-Presenter.dmg",
    fileName: "Screen-Presenter.dmg",
    label: "Download for Mac",
    macOS: "macOS 14 Sonoma or later",
    silicon: "Universal — Apple Silicon & Intel",
    size: "4.0 MB",
    version: "1.1",
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
