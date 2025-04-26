import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  devIndicators: false
  /* config options here */
};

export default nextConfig;