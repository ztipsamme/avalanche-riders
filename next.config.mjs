/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SHOPIFY_STORE_DOMAIN: process.env.SHOPIFY_STORE_DOMAIN,
    SHOPIFY_STOREFRONT_ACCESS_TOKEN:
      process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
  },
  images: {
    domains: ['cdn.shopify.com', 'tailwindui.com'],
  },
}

export default nextConfig
