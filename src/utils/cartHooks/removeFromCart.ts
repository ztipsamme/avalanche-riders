import { fetchFromShopify, gql } from '@/utils/gql'
import { getLocalStorage } from '../getLocalStorage'

export const removeFromCart = async (lineId: string) => {
  const { cartId } = getLocalStorage()

  if (!cartId) return null

  await fetchFromShopify({
    query: gql`
      mutation RemoveFromCart($cartId: ID!, $lineId: [ID!]!) {
        cartLinesRemove(cartId: $cartId, lineIds: $lineId) {
          cart {
            lines(first: 100) {
              edges {
                node {
                  id
                }
              }
            }
          }
        }
      }
    `,
    variables: { cartId, lineId },
  })
}
