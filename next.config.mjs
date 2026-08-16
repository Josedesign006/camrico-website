/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // The app shipped as "Screen Presenter" before the Camrico rename; keep
  // previously shared download links working.
  async redirects() {
    return [
      {
        source: "/Screen-Presenter.dmg",
        destination: "/Camrico.dmg",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
