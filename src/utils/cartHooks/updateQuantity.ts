import { getLocalStorage } from '../getLocalStorage'
import { fetchFromShopify, gql } from '../gql'

export type UpdateQuantity = {
  lineId: string
  quantity: number
}
export const updateQuantity = async ({ lineId, quantity }: UpdateQuantity) => {
  const { cartId } = getLocalStorage()

  if (!cartId) return null

  await fetchFromShopify({
    query: gql`
      mutation UpdateQuantity($cartId: ID!, $lineId: ID!, $quantity: Int) {
        cartLinesUpdate(
          cartId: $cartId
          lines: { id: $lineId, quantity: $quantity }
        ) {
          cart {
            id
          }
        }
      }
    `,
    variables: { cartId, lineId, quantity },
  })
}
