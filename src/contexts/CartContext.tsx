'use client'
import { addToCart } from '@/shopify/addToCart'
import { createCart } from '@/shopify/createCart'
import { loadCart } from '@/shopify/loadCart'
import { Children } from '@/types'
import { createContext, useContext, useState } from 'react'

type CartContext = {
  open: boolean
  toggleCart: () => void
}

export const CartContext = createContext<CartContext>({
  open: false,
  toggleCart: () => {},
})

export const CartContextProvider = ({ children }: Children) => {
  const [open, setOpen] = useState(false)

  const toggleCart = () => {
    setOpen((prev) => !prev)
  }

  return (
    <CartContext.Provider value={{ open, toggleCart }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  return {
    addToCart,
    createCart,
    loadCart,
    ...useContext(CartContext),
  }
}
