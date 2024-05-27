import { createContext, useState } from 'react'
import { Children } from '@/types'

type CartContext = {
  cartOpen: boolean
  handleCart: () => void
}

const defaultState = false

export const CartContext = createContext<CartContext>({
  cartOpen: defaultState,
  handleCart: () => {},
})

export const CartProvider = ({ children }: Children) => {
  const [cartOpen, setCartOpen] = useState(defaultState)

  const handleCart = () => {
    setCartOpen((prev) => !prev)
  }

  return (
    <CartContext.Provider value={{ cartOpen: cartOpen, handleCart }}>
      {children}
    </CartContext.Provider>
  )
}
