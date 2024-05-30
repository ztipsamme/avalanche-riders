'use client'

import { Children } from '@/types'
import { addToCart as addToCartAction } from '@/utils/cartHooks/addToCart'
import { createCart } from '@/utils/cartHooks/createCart'
import { Cart, getCart } from '@/utils/cartHooks/getCart'
import { loadCart } from '@/utils/cartHooks/loadCart'
import { removeFromCart as removeFromCartAction } from '@/utils/cartHooks/removeFromCart'
import { createContext, useContext, useEffect, useState } from 'react'

type CartContextType = {
  open: boolean
  cart: Cart | null
  toggleCart: () => void
  addToCart: (variantId: string) => Promise<void>
  removeFromCart: (variantId: string) => Promise<void>
}

export const CartContext = createContext<CartContextType>({
  open: false,
  cart: null,
  toggleCart: () => {},
  addToCart: async () => {},
  removeFromCart: async () => {},
})

export const CartContextProvider = ({ children }: Children) => {
  const [open, setOpen] = useState(false)
  const [cart, setCart] = useState<Cart>({
    id: '',
    checkoutUrl: '',
    estimatedCost: undefined,
    lines: undefined,
  })

  const toggleCart = async () => {
    setOpen((prev) => !prev)
  }

  useEffect(() => {
    const firstLoadCart = async () => {
      const initialCart = await getCart(cart)
      setCart(initialCart)
    }

    firstLoadCart()
  }, [])

  const addToCart = async (id: string) => {
    await addToCartAction(id)
  }

  const removeFromCart = async (id: string) => {
    await removeFromCartAction(id)
  }

  return (
    <CartContext.Provider
      value={{ open, cart, toggleCart, addToCart, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  return {
    createCart,
    loadCart,
    ...useContext(CartContext),
  }
}
