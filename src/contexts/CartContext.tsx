'use client'

import { Children, LoadCart } from '@/types'
import { addToCart as addToCartAction } from '@/utils/cartHooks/addToCart'
import { getCart } from '@/utils/cartHooks/getCart'
import { loadCart } from '@/utils/cartHooks/loadCart'
import { removeFromCart as removeFromCartAction } from '@/utils/cartHooks/removeFromCart'
import {
  UpdateQuantity,
  updateQuantity as updateQuantityAction,
} from '@/utils/cartHooks/updateQuantity'
import { createContext, useCallback, useEffect, useState } from 'react'

type CartContext = {
  open: boolean
  toggleCart: () => void
  updateQuantity: ({ lineId, quantity }: UpdateQuantity) => Promise<void>
} & (LoadCart | { cart: null }) & {
    [key in 'addToCart' | 'removeFromCart']: (
      variantId: string
    ) => Promise<void>
  }

const defaultCart: LoadCart['cart'] = {
  id: '',
  checkoutUrl: '',
  cost: {
    subtotalAmount: {
      amount: '',
      currencyCode: '',
    },
    totalAmount: {
      amount: '',
      currencyCode: '',
    },
  },
  lines: {
    edges: [],
  },
}

export const CartContext = createContext<CartContext>({
  open: false,
  cart: null,
  toggleCart: () => {},
  addToCart: async () => {},
  updateQuantity: async () => {},
  removeFromCart: async () => {},
})

export const CartContextProvider = ({ children }: Children) => {
  const [open, setOpen] = useState(false)
  const [cart, setCart] = useState<LoadCart['cart']>(defaultCart)

  const toggleCart = useCallback(() => {
    setOpen((prev) => !prev)
  }, [])

  useEffect(() => {
    const firstLoadCart = async () => {
      const initialCartData = await getCart(cart)
      if (initialCartData) {
        setCart(initialCartData)
      }
    }
    firstLoadCart()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const updateCart = async () => {
    const res = await loadCart()
    if (res) {
      setCart(res.cart)
    }
  }

  const addToCart = async (id: string) => {
    await addToCartAction(id)
    updateCart()
  }

  const updateQuantity = async ({ lineId, quantity }: UpdateQuantity) => {
    await updateQuantityAction({ lineId, quantity })
    updateCart()
  }

  const removeFromCart = async (id: string) => {
    await removeFromCartAction(id)
    updateCart()
  }

  return (
    <CartContext.Provider
      value={{
        open,
        cart,
        toggleCart,
        addToCart,
        updateQuantity,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
