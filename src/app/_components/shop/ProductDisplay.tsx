import { Fragment } from 'react'
import ProductCard from './ProductCard'
import { getProducts, gql } from '@/utils/gql'
import { Products, ShopifyProduct } from '@/utils/types'

type ProductQuery = Partial<{
  firstOrLast: 'first' | 'last'
  amount: number
}>

const productQuery = ({ firstOrLast, amount }: ProductQuery = {}) => {
  const position = !firstOrLast ? 'first' : firstOrLast
  const amountOfItems = !amount ? 8 : amount

  return gql`
        {
          products(${position}: ${amountOfItems}) {
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
              priceRangeV2 {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              tags
              title
            }
          }
        }
      `
}

export default async function ProductDisplay() {
  const { products } = await getProducts<Products>(productQuery())

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
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
