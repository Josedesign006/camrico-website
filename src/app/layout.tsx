import type { Metadata, Viewport } from "next";
import "@fontsource-variable/geist";
import "@fontsource-variable/geist-mono";
import "@/styles/globals.css";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Cursor } from "@/components/layout/Cursor";

// Set the theme before first paint to avoid a flash of the wrong colours.
// Dark is the primary theme — new visitors get dark regardless of their OS
// setting; we only honour a light choice they've explicitly made before.
const THEME_INIT = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'){t='dark';}document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`;

export const metadata: Metadata = {
  title: "Camrico — A complete presentation studio for your screen",
  description:
    "Record your Mac, shape every movement, clean up the sound, and export a polished video without opening a traditional editor. Built for macOS.",
  openGraph: {
    title: "Camrico — A complete presentation studio for your screen",
    description:
      "Record your Mac, shape every movement, clean up the sound, and export a polished video without opening a traditional editor.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#100f0e",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
        <Cursor />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
