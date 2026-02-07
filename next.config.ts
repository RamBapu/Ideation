import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gen.pollinations.ai",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
