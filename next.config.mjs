/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['orione-pay'],
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig


