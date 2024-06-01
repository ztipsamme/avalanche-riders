/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.shopify.com', 'tailwindui.com'],
    formats: ['image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '**',
      },
    ],
  },
  reactStrictMode: true,
  env: {
    SHOPIFY_STORE: process.env.SHOPIFY_STORE,
    SHOPIFY_HEADLESS_PUBLIC_ACCESS_TOKEN:
      process.env.SHOPIFY_HEADLESS_PUBLIC_ACCESS_TOKEN,
  },
}

export default nextConfig
