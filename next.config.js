/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  };
  
  module.exports = nextConfig;