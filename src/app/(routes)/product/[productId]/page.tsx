import { BreadcrumbsNav } from '@/components/ui/BreadcrumbsNav'
import { ProductInfo } from '@/components/storefront/SingleProduct'
import { gql, useShopifyStorefrontRequest } from '@/utils/gql'
import { Product } from '@/types'
import Image from 'next/image'
import { CustomerCartProvider } from '@/contexts/CustomerCartContext'

type SingleProductPageProps = {
  params: {
    productId: string
  }
}

const productQuery = (id: string) => gql`
  {
    product(id: "gid://shopify/Product/${id}") {
      id
      description
      featuredImage {
        altText
        height
        id
        url
        width
      }
      handle
      priceRangeV2 {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      tags
      title
      variants(first: 10) {
        nodes {
          id
          price
          title
          image {
            altText
            height
            id
            url
            width
          }
        }
      }
      variantsCount {
        count
      }
    }
  }
`

export default async function Page({ params }: SingleProductPageProps) {
  const id = params.productId

  const { product } = await useShopifyStorefrontRequest<Product>({
    query: productQuery(id),
    variables: {
      id: `gid://shopify/Product/${id}`,
    },
  })

  return (
    <div className="bg-white">
      <BreadcrumbsNav label={product.title} href={product.id} />

      <div className="mx-auto mt-6  max-w-2xl px-4 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
        <div className="aspect-1 relative rounded-lg overflow-hidden">
          <Image
            alt={product.featuredImage.altText}
            src={product.featuredImage.url}
            fill
            className="object-contain"
          />
        </div>
        <CustomerCartProvider>
          <ProductInfo product={product} />
        </CustomerCartProvider>
      </div>
    </div>
  )
}
