import { ShopifyProduct } from '../types'

export const hasVariants = (product: ShopifyProduct): Boolean =>
  product.variantsCount && product.variantsCount.count >= 2
