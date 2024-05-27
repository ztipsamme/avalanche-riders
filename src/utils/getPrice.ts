import { ShopifyProduct } from '../types'

export const getPrice = (product: ShopifyProduct) => {
  const { amount, currencyCode } = product.priceRange.minVariantPrice
  return `${amount} ${currencyCode}`
}
