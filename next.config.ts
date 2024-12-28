import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: false
  },
  images: {
    domains: ['localhost'],
    unoptimized: true
  }
};

export default nextConfig;
