import { localCartName } from './cartHooks/getCart'

export const getLocalStorage = () => {
  if (typeof window === 'undefined')
    return {
      cartId: null,
      checkoutUrl: null,
    }

  const localCart = window.localStorage.getItem(localCartName)

  if (!localCart) {
    console.error('There was an error loading your cart.')
    return { cartId: null }
  }

  return {
    cartId: JSON.parse(localCart).id,
    checkoutUrl: JSON.parse(localCart).checkoutUrl,
  }
}
