'use client'
import { Children, SubAndTotalAmount } from '@/types'
import { addToCart as addToCartAction } from '@/utils/cartHooks/addToCart'
import { getCart } from '@/utils/cartHooks/getCart'
import { loadCart } from '@/utils/cartHooks/loadCart'
import { removeFromCart as removeFromCartAction } from '@/utils/cartHooks/removeFromCart'
import {
  UpdateQuantity,
  updateQuantity as updateQuantityAction,
} from '@/utils/cartHooks/updateQuantity'
import { createContext, useCallback, useEffect, useState } from 'react'

type CartContextType = {
  open: boolean
  cart: Cart | null
  toggleCart: () => void
  addToCart: (variantId: string) => Promise<void>
  removeFromCart: (variantId: string) => Promise<void>
  updateQuantity: ({ lineId, quantity }: UpdateQuantity) => Promise<void>
}

export type Cart = {
  id: string
  checkoutUrl: string
  estimatedCost?: SubAndTotalAmount
  lines?: any[]
}

export const CartContext = createContext<CartContextType>({
  open: false,
  cart: null,
  toggleCart: () => {},
  addToCart: async () => {},
  updateQuantity: async () => {},
  removeFromCart: async () => {},
})

export const CartContextProvider = ({ children }: Children) => {
  const [open, setOpen] = useState(false)
  const [cart, setCart] = useState<Cart>({
    id: '',
    checkoutUrl: '',
    estimatedCost: {
      subtotalAmount: {
        amount: '',
        currencyCode: '',
      },
      totalAmount: {
        amount: '',
        currencyCode: '',
      },
    },
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
