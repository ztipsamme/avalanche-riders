'use client'
import { Children } from '@/types'
import { createContext, useState } from 'react'

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
