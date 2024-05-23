import { BreadcrumbsNav } from '@/app/_UI/BreadcrumbsNav'
import { ProductInfo } from '@/app/_components/shop/SingleProduct'
import { getSingleProduct, gql } from '@/utils/gql'
import { Product } from '@/utils/types'
import Image from 'next/image'

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
  const { product } = await getSingleProduct<Product>({
    query: productQuery(id),
    id: id,
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
        <ProductInfo product={product} />
      </div>
    </div>
  )
}
