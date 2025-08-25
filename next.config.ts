import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
  },
  serverRuntimeConfig: {
    API_BASE_URL: process.env.API_BASE_URL,
  },
  publicRuntimeConfig: {
    API_BASE_URL: process.env.API_BASE_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'my-quests-images.s3.ca-central-1.amazonaws.com',
      },
    ],
  },
};

export default nextConfig;
