import { ShopifyProduct } from '@/types'
import { formatId } from './formatId'

export const getSingleProductUrl = (product: ShopifyProduct) =>
  `/products/${formatId(product.id)}`
