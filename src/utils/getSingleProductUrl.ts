import { ShopifyProduct } from '@/types'
import { formatId } from './formatId'

export const getSingleProductUrl = (product: ShopifyProduct) =>
  `/product/${formatId(product.id)}`
