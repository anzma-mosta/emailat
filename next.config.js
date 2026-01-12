/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['flagcdn.com'],
    unoptimized: true,
  },
  trailingSlash: true,
  // output: 'export',
}

module.exports = nextConfig

