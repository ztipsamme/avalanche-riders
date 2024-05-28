import { fetchFromShopify } from './gql'
const query = `mutation CreateCart {
    cartCreate {
      cart {
        checkoutUrl
        id
      }
    }
  }`

export const createCart = async () => {
  const data = await fetchFromShopify<any>({
    query: query,
  })

  console.log(data)
}
