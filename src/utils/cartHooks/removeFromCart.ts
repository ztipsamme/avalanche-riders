import { getCartId } from '@/utils/getCartId'
import { fetchFromShopify, gql } from '@/utils/gql'

export const removeFromCart = async (lineId: string) => {
  const { cartId } = getCartId()

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
