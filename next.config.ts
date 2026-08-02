import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbopackMemoryLimit: 1024,
    optimizePackageImports: ["lucide-react"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
      },
      {
        protocol: "https",
        hostname: "target.scene7.com",
      },
    ],
  },
};

export default nextConfig;
