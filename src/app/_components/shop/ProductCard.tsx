import { getId } from '@/utils/hooks/getId'
import { ShopifyProduct } from '@/utils/types'
import Image from 'next/image'

export default async function ProductCard({
  product,
}: {
  product: ShopifyProduct
}) {
  const { amount, currencyCode } = product.priceRangeV2.minVariantPrice
  const featuredImage = product.featuredImage
  const hasFeaturedImage = Boolean(featuredImage)
  const altText =
    hasFeaturedImage && featuredImage.altText ? featuredImage.altText : ''
  const url = hasFeaturedImage && featuredImage.url ? featuredImage.url : ''

  return (
    <a
      key={product.id}
      href={`/product/${getId(product.id)}`}
      className="group"
    >
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
        {hasFeaturedImage && (
          <Image
            alt={altText}
            src={url}
            fill
            className="h-full w-full object-cover object-center group-hover:opacity-75"
          />
        )}
      </div>
      <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
      <p className="mt-1 text-lg font-medium text-gray-900">
        {`${amount} ${currencyCode}`}
      </p>
    </a>
  )
}
