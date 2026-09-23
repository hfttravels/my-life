import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "cdn.iconscout.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "d1zvcmhypeawxj.cloudfront.net",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/india-trips/spiti-valley-tour-packages",
        destination: "/destination/spiti/spiti-valley-tour-packages",
        permanent: true,
      },
      {
        source: "/destination/spiti",
        destination: "/destination/spiti/spiti-valley-tour-packages",
        permanent: true,
      },
      {
        source: "/tours/spiti-valley-tour-packages",
        destination: "/destination/spiti/spiti-valley-tour-packages",
        permanent: true,
      },
    ];
  },
};

export default withPayload(nextConfig);
