import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The site is entirely static: no database, no route handlers, no server
  // actions. `export` keeps it deployable to Vercel, GitHub Pages or
  // Cloudflare Pages without change. See brief §8.
  output: "export",
  // Static export cannot run the image optimizer at request time.
  images: { unoptimized: true },
};

export default nextConfig;
