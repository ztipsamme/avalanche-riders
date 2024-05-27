'use client'
import { Children, ShopifyProduct, ShopifyProductVariant } from '@/types'
import { createContext, useContext, useState } from 'react'

type CartProduct = {
  product: ShopifyProduct
  variant?: ShopifyProductVariant
}

type Cart = (CartProduct & { amount: number })[]

type CustomerCartProvider = {
  cart: Cart
  addToCart: (product: CartProduct) => void
}

export const CustomerCartContext = createContext<CustomerCartProvider>({
  cart: [],
  addToCart: () => {},
})

export const CustomerCartProvider = ({ children }: Children) => {
  const [cart, setCart] = useState<Cart>([])

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
    <CustomerCartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CustomerCartContext.Provider>
  )
}

export const useCart = () => useContext(CustomerCartContext)
