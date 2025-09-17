/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    instrumentationHook: true,
  },
  basePath: '/stock',
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    API_BASE: '/api',
    NEXT_PUBLIC_API_URL: 'http://localhost:3001/stock/api',
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/stock/api/:path*',
      },
    ];
  },
};

export default nextConfig;
