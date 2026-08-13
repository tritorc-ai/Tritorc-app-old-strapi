import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "tritorc-strapi-media-prod-140732842400-ap-south-1.s3.ap-south-1.amazonaws.com" },
      { protocol: "https", hostname: "cms.tritorc.com" },
      { protocol: "https", hostname: "www.tritorc.com" },
      { protocol: "https", hostname: "tritorc.com" },
    ],
  },
};

export default nextConfig;
