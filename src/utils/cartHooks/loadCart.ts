import {
  Image,
  LoadNode,
  Price,
  ShopifyProduct,
  SubAndTotalAmount,
} from '@/types'
import { getCartId } from '@/utils/getCartId'
import { fetchFromShopify, gql } from '@/utils/gql'

export type LoadCart = {
  cart: {
    id: string
    checkoutUrl: string
    cost: SubAndTotalAmount
    lines: {
      edges: LoadNode[]
    }
  }
} | null

export const loadCart = async (): Promise<LoadCart> => {
  const { cartId } = getCartId()

  if (!cartId) return null

  return await fetchFromShopify({
    query: gql`
      query GetCart($cartId: ID!) {
        cart(id: $cartId) {
          checkoutUrl
          cost {
            subtotalAmount {
              amount
              currencyCode
            }
            totalAmount {
              amount
              currencyCode
            }
          }
          lines(first: 100) {
            edges {
              node {
                id
                quantity
                cost {
                  subtotalAmount {
                    amount
                    currencyCode
                  }
                  totalAmount {
                    amount
                    currencyCode
                  }
                }
                merchandise {
                  ... on ProductVariant {
                    title
                    product {
                      title
                      id
                      featuredImage {
                        altText
                        url
                        width
                        height
                      }
                      variants(first: 100) {
                        nodes {
                          id
                        }
                      }
                    }
                    price {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
        }
      }
    `,
    variables: { cartId },
  })
}
