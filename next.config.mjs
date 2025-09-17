/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    instrumentationHook: true,
  },
  // We'll configure basePath only for production builds
  basePath: process.env.NODE_ENV === 'production' ? '/stock' : '',
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    API_BASE: '/api',
    NEXT_PUBLIC_API_URL: process.env.NODE_ENV === 'production' 
      ? '/stock/api'
      : 'http://localhost:3001/api',
  },
  // Rewrites for production only
  async rewrites() {
    if (process.env.NODE_ENV === 'production') {
      return [
        {
          source: '/api/:path*',
          destination: '/stock/api/:path*',
        },
      ];
    }
    return [];
  },
};

export default nextConfig;
