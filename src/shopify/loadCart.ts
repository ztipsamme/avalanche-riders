import { getCartId } from '@/utils/getCartId'
import { fetchFromShopify, gql } from '@/utils/gql'

export type GetCart = {
  cart: {
    checkoutUrl: string
    cost: {
      totalAmount: {
        amount: string
      }
    }
    lines: {
      edges: any[]
    }
  }
} | null

export const loadCart = async (): Promise<GetCart> => {
  const { cartId } = getCartId()

  if (!cartId) return null

  return await fetchFromShopify({
    query: gql`
      query GetCart($cartId: ID!) {
        cart(id: $cartId) {
          checkoutUrl
          cost {
            totalAmount {
              amount
            }
          }
          lines(first: 100) {
            edges {
              node {
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
