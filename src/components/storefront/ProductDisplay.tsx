import { Fragment } from 'react'
import ProductCard from './ProductCard'
import { fetchFromShopify, gql } from '@/utils/gql'
import { Products, ShopifyProduct } from '@/types'

const query = gql`
  query ProductQuery($first: Int) {
    products(first: $first) {
      nodes {
        description
        featuredImage {
          altText
          height
          id
          url
          width
        }
        handle
        id
        tags
        title
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
      }
    }
  }
`

export default async function ProductDisplay({
  first,
  title,
}: {
  first?: number
  title: string
}) {
  const { products } = await fetchFromShopify<Products>({
    query: query,
    variables: { first: first || 10 },
  })

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        {'title' && (
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            {title}
          </h2>
        )}

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.nodes.map((product: ShopifyProduct) => {
            return (
              <Fragment key={product.id}>
                <ProductCard product={product} />
              </Fragment>
            )
          })}
        </div>
      </div>
    </div>
  )
}
