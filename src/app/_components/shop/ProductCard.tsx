'use client'

import { ShopifyProduct } from '@/utils/types'
import Image from 'next/image'

export default function ProductCard({ product }: { product: ShopifyProduct }) {
  const { amount, currencyCode } = product.priceRangeV2.minVariantPrice

  return (
    <a key={product.id} href={'#'} className="group">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
        <Image
          // src={product.featuredImage.url}
          // alt={product.featuredImage.altText}
          src={
            'https://cdn.shopify.com/s/files/1/0663/5110/4184/files/Main.jpg?v=1715859731'
          }
          alt={''}
          fill
          className="h-full w-full object-cover object-center group-hover:opacity-75"
        />
      </div>
      <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
      <p className="mt-1 text-lg font-medium text-gray-900">
        {`${amount} ${currencyCode}`}
      </p>
    </a>
  )
}
