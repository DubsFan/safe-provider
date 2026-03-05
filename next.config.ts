import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["stripe"],
  images: {
    formats: ["image/webp"],
  },
};

export default nextConfig;
