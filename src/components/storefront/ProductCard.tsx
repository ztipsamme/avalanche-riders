import { ShopifyProduct } from '@/types'
import Image from 'next/image'
import { getPrice } from '@/utils/getPrice'
import { getSingleProductUrl } from '@/utils/getSingleProductUrl'
import { ShopifyImage } from '../ui/ShopifyImage'

const ProductCard = async ({ product }: { product: ShopifyProduct }) => {
  const featuredImage = product.featuredImage

  return (
    <a key={product.id} href={getSingleProductUrl(product)} className="group">
      <div className="aspect-1 overflow-hidden rounded-lg relative">
        <ShopifyImage image={featuredImage} />
      </div>
      <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
      <p className="mt-1 text-lg font-medium text-gray-900">
        {getPrice(product.priceRange.minVariantPrice)}
      </p>
    </a>
  )
}

export default ProductCard
