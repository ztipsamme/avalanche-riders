'use client'
import { createContext, useContext, useState } from 'react'
import { Children, ShopifyProduct, ShopifyProductVariant } from '@/types'

type Cart = (CartProduct & { amount: number })[]

type CartContext = {
  open: boolean
  cart: Cart
  handleCart: () => void
  addToCart: (product: CartProduct) => void
}

type CartProduct = {
  product: ShopifyProduct
  variant?: ShopifyProductVariant
}

export const CartContext = createContext<CartContext>({
  open: false,
  cart: [],
  handleCart: () => {},
  addToCart: () => {},
})

export const CartContextProvider = ({ children }: Children) => {
  const [open, setOpen] = useState(false)
  const [cart, setCart] = useState<Cart>([])

  const handleCart = () => {
    setOpen((prev) => !prev)
  }

  const addToCart = (props: CartProduct) => {
    const itemAlreadyInCart = cart.find(
      (cartObject) => cartObject.product?.id === props.product.id
    )

    if (itemAlreadyInCart) {
      console.log(cart)
      return
    }

    setCart((prev) => [...prev, { ...props, amount: 1 }])
    return
  }

  return (
    <CartContext.Provider value={{ open, handleCart, cart, addToCart }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = (): CartContext => useContext(CartContext)
