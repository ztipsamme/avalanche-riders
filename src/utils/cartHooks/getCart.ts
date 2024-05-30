import { createCart } from './createCart'
import { loadCart } from './loadCart'

export type Cart = {
  id: ''
  checkoutUrl: ''
  estimatedCost?: { totalAmount: { amount: string } }
  lines?: any[]
}

export const localCartName = 'Cart'

export const getCart = async (prev: Cart) => {
  let localCartData: any = window.localStorage.getItem(localCartName)

  if (localCartData) {
    const existingCartData = await loadCart()

    return {
      id: localCartData.id,
      checkoutUrl: localCartData.checkoutUrl,
      estimatedCost: existingCartData?.cart.cost,
      lines: existingCartData?.cart.lines.edges,
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
