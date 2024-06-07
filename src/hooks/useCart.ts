import { CartContext } from '@/contexts/CartContext'
import { createCart } from '@/utils/cartHooks/createCart'
import { loadCart } from '@/utils/cartHooks/loadCart'
import { useContext } from 'react'

export const useCart = () => {
  return {
    createCart,
    loadCart,
    ...useContext(CartContext),
  }
}
