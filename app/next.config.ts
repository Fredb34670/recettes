import type { NextConfig } from "next";
import withPWAInit from "next-pwa";
import path from "path";

const withPWA = withPWAInit({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

const nextConfig: NextConfig = {
  distDir: "../.next",
  images: {
    formats: ["image/avif", "image/webp"],
  },
  outputFileTracingRoot: path.resolve(__dirname, ".."),
  webpack: (config) => {
    return config;
  },
};

export default withPWA(nextConfig);