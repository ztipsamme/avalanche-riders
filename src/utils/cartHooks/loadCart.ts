import { Image } from '@/types'
import { getCartId } from '@/utils/getCartId'
import { fetchFromShopify, gql } from '@/utils/gql'

export type Price = {
  amount: string
  currencyCode: string
}

export type Node = {
  node: {
    id: string
    quantity: number
    cost: {
      subtotalAmount: {
        amount: string
        currencyCode: string
      }
      totalAmount: {
        amount: string
        currencyCode: string
      }
    }
    merchandise: {
      title: string
      id: string
      product: {
        title: string
        featuredImage: Image
        variants: {
          nodes: [
            {
              id: string
            },
          ]
        }
      }
      price: Price
    }
  }
}

export type LoadCart = {
  cart: {
    id: string
    checkoutUrl: string
    cost: {
      totalAmount: {
        amount: string
      }
    }
    lines: {
      edges: Node[]
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
            totalAmount {
              amount
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
