/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
        "res.cloudinary.com",
    ]
  },
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  }
}

module.exports = nextConfig
