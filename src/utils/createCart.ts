import { fetchFromShopify, gql } from './gql'

export const createCart = async () => {
  const data = await fetchFromShopify<any>({
    query: gql`
      mutation CreateCart {
        cartCreate {
          cart {
            checkoutUrl
            id
          }
        }
      }
    `,
  })

  return {
    id: data.cartCreate.cart.id,
    checkoutUrl: data.cartCreate.cart.checkoutUrl,
  }
}
