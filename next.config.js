/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'profile.line-scdn.net',
        port: '',
        pathname: '',
      },
    ],
  },
  };
  
  module.exports = nextConfig;