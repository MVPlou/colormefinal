/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['Colorme-gg.b-cdn.net'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'Colorme-gg.b-cdn.net',
        pathname: '/Coloring Pages/**',
      },
    ],
  },
}

module.exports = nextConfig