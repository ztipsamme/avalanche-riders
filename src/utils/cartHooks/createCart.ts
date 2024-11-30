import { LoadCart } from '@/types'
import { fetchFromShopify, gql } from '@/utils/gql'

type Props = {
  cartCreate: { cart: Pick<LoadCart['cart'], 'id' | 'checkoutUrl'> }
}

export const createCart = async () => {
  const data = await fetchFromShopify<Props>({
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
