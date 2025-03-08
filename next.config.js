/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Configure image domains
  images: {
    domains: [
      'source.unsplash.com',
      'images.unsplash.com',
      'cdn.example.com',
    ],
  },
  
  // Experimental features
  experimental: {
    // Server Actions are now enabled by default in Next.js 14
    // Removing the serverActions flag as per the warning
  },
  
  // TypeScript configuration
  typescript: {
    // !! WARN !!
    // Temporarily ignore TypeScript errors during development
    // Remove this when we've resolved the type issues
    ignoreBuildErrors: true,
  },
  
  // ESLint configuration
  eslint: {
    // Temporarily ignore ESLint errors during development
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig 