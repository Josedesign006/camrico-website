/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // The DMG lives in GitHub Releases (see src/data/site.ts); both the
  // pre-rename "Screen Presenter" path and the briefly-used local
  // /Camrico.dmg path keep working for anyone holding an old link.
  async redirects() {
    const latestDmg =
      "https://github.com/Josedesign006/camrico-website/releases/latest/download/Camrico.dmg";
    return [
      { source: "/Screen-Presenter.dmg", destination: latestDmg, permanent: false },
      { source: "/Camrico.dmg", destination: latestDmg, permanent: false },
    ];
  },
};

export default nextConfig;
