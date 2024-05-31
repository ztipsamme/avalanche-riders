import { ProductInfo } from '@/components/storefront/ProductInfo'
import { BreadcrumbsNav } from '@/components/ui/BreadcrumbsNav'
import { Product, ShopifyProduct } from '@/types'
import { fetchFromShopify, gql } from '@/utils/gql'
import Image from 'next/image'

type SingleProductPageProps = {
  params: {
    productId: string
  }
}

export default async function Page({ params }: SingleProductPageProps) {
  const id = params.productId
  let product: ShopifyProduct | undefined

  const fetchProduct = async () => {
    const res = await fetchFromShopify<Product>({
      query: gql`
        query ProductQuery($id: ID) {
          product(id: $id) {
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
            priceRange {
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
                title
                image {
                  altText
                  height
                  id
                  url
                  width
                }
                price {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      `,
      variables: { id: `gid://shopify/Product/${id}` },
    })
    product = res.product
  }

  await fetchProduct()

  if (!product) {
    return <div>Product not found</div>
  }

  return (
    <div className="bg-white">
      <BreadcrumbsNav label={product.title} href={product.id} />

      <div className="mx-auto mt-6 max-w-2xl px-4 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
        <div className="aspect-1 relative rounded-lg overflow-hidden">
          <Image
            alt={product.featuredImage.altText}
            src={product.featuredImage.url}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-contain"
          />
        </div>
        <ProductInfo product={product} />
      </div>
    </div>
  )
}
