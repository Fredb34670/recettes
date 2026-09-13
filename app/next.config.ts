import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  outputFileTracingRoot: path.resolve(__dirname, ".."),
  experimental: {
    typedRoutes: false,
  },
};

export default nextConfig;
