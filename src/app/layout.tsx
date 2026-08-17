import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "@fontsource-variable/geist";
import "@fontsource-variable/geist-mono";
import "@fontsource/instrument-serif/400-italic.css";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Camrico — Your screen, ready for the spotlight.",
  description:
    "Record your Mac, shape every movement, clean up the sound, and export a polished video — without opening a traditional editor.",
  openGraph: {
    title: "Camrico — Your screen, ready for the spotlight.",
    description:
      "Record your Mac, shape every movement, clean up the sound, and export a polished video — without opening a traditional editor.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#faf8f4",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        {/* The island runs as a plain DOM script over the server-rendered page */}
        <Script src="/island.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
