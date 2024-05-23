import { ShopifyProduct } from '../types'

export const getPrice = (product: ShopifyProduct) => {
  const { amount, currencyCode } = product.priceRangeV2.minVariantPrice
  return `${amount} ${currencyCode}`
}
