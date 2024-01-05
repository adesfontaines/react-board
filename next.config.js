/** @type {import('next').NextConfig} */
const nextConfig = {
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
  },
  webpack: (config) => {
    config.resolve = {
      ...config.resolve,
      fallback: {
        fs: false,
      },
    };

    // Add canvas to webpack externals
    config.externals = config.externals || {};
    config.externals.canvas = {};

    return config;
  }
  };
  
  module.exports = nextConfig;