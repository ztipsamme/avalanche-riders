import { CartContext } from '@/contexts/CartContext'
import { useContext } from 'react'
import { createCart } from './cartHooks/createCart'
import { loadCart } from './cartHooks/loadCart'

export const useCart = () => {
  return {
    createCart,
    loadCart,
    ...useContext(CartContext),
  }
}
