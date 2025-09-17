/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    instrumentationHook: true,
  },
  // Use different base paths for development and production
  basePath: process.env.NODE_ENV === 'production' ? '/stock' : '',
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    API_BASE: process.env.NODE_ENV === 'production' ? '/api' : '/api',
    NEXT_PUBLIC_API_URL: process.env.NODE_ENV === 'production' ? '/stock/api' : '/api',
  },
  // Simple rewrites for API routes
  async rewrites() {
    if (process.env.NODE_ENV === 'production') {
      return [
        {
          source: '/stock/api/:path*',
          destination: '/api/:path*',
        },
      ];
    }
    return [];
  },
};

export default nextConfig;
