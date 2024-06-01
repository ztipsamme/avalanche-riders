import { LoadCart } from '@/types'
import { createCart } from './createCart'
import { loadCart } from './loadCart'

export const localCartName = 'Cart'

export const getCart = async (
  prev: LoadCart['cart']
): Promise<LoadCart['cart']> => {
  let localCartData: any = window.localStorage.getItem(localCartName)

  if (localCartData) {
    const existingCartData = await loadCart()

    if (!existingCartData) {
      console.log('Cart did not load.')
      throw new Error('Cart did not load.')
    }

    return {
      ...existingCartData.cart,
    }
  }

  localCartData = await createCart()

  window.localStorage.setItem(localCartName, JSON.stringify(localCartData))

  return {
    ...prev,
    id: localCartData.id,
    checkoutUrl: localCartData.checkoutUrl,
  }
}
