import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    // This will ignore TypeScript errors during the build
    ignoreBuildErrors: true
  },
  devIndicators: false
  /* config options here */
};

export default nextConfig;