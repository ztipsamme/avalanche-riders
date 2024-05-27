import { ShopifyProduct } from '../types'

export const hasVariants = (product: ShopifyProduct): Boolean =>
  product.variants.nodes && product.variants.nodes.length >= 2
