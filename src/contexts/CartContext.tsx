'use client'
import { Children } from '@/types'
import { addToCart as addToCartAction } from '@/utils/cartHooks/addToCart'
import { getCart } from '@/utils/cartHooks/getCart'
import { loadCart } from '@/utils/cartHooks/loadCart'
import { removeFromCart as removeFromCartAction } from '@/utils/cartHooks/removeFromCart'
import { createContext, useCallback, useEffect, useState } from 'react'

type CartContextType = {
  open: boolean
  cart: Cart | null
  toggleCart: () => void
  addToCart: (variantId: string) => Promise<void>
  removeFromCart: (variantId: string) => Promise<void>
}

export type Cart = {
  id: string
  checkoutUrl: string
  estimatedCost?: { totalAmount: { amount: string } }
  lines?: any[]
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
    estimatedCost: { totalAmount: { amount: '' } },
    lines: [],
  })

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
  }, [])

  const updateCart = async () => {
    const res = await loadCart()
    if (res) {
      setCart((prevCart) => ({
        ...prevCart!,
        estimatedCost: res.cart.cost,
        lines: res.cart.lines.edges,
      }))
    }
  }

  const addToCart = async (id: string) => {
    await addToCartAction(id)
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
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
