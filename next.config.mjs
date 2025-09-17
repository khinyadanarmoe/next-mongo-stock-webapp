/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    instrumentationHook: true,
  },
  basePath: '/stock',
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
