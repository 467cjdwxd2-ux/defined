import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.printify.com" },
      { protocol: "https", hostname: "*.printify.com" },
      { protocol: "https", hostname: "*.supabase.co" },
      { protocol: "https", hostname: "api.printify.com" },
    ],
  },
  experimental: {
    serverActions: { allowedOrigins: ["localhost:3000"] },
  },
};

export default nextConfig;
