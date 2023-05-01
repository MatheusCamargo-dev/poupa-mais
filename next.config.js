/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    esmExternals: 'loose',
  },
  images: {
    domains: ['github.com']
  },
};

module.exports = nextConfig;
