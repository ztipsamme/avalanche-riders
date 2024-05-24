import { createContext, useState } from 'react'
import { Children } from '../utils/types'

type CartContext = {
  cartOpen: boolean
  handleCart: () => void
}

export const CartContext = createContext<CartContext>({
  cartOpen: false,
  handleCart: () => {},
})

export const CartProvider = ({ children }: Children) => {
  const [cartOpen, setCartOpen] = useState(false)

  const handleCart = () => {
    setCartOpen((prev) => !prev)
  }

  return (
    <CartContext.Provider value={{ cartOpen: cartOpen, handleCart }}>
      {children}
    </CartContext.Provider>
  )
}
