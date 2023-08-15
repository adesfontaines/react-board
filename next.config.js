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
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages:['mongoose','@typegoose/typegoose']
}
  };
  
  module.exports = nextConfig;