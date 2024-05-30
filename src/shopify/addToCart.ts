import { getCartId } from '@/utils/getCartId'
import { fetchFromShopify, gql } from '@/utils/gql'
import { loadCart } from './loadCart'

export const addToCart = async (variantId: string) => {
  const { cartId } = getCartId()

  if (!cartId) return null

  await fetchFromShopify({
    query: gql`
      mutation AddToCart($cartId: ID!, $variantId: ID!) {
        cartLinesAdd(
          cartId: $cartId
          lines: [{ quantity: 1, merchandiseId: $variantId }]
        ) {
          cart {
            lines(first: 100) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      product {
                        title
                        id
                        featuredImage {
                          altText
                          url
                          width
                          height
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `,
    variables: { cartId, variantId },
  })

  loadCart()
}
