import { CartContext } from '@/contexts/CartContext'
import { useContext } from 'react'
import { addToCart } from './addToCart'
import { createCart } from './createCart'
import { loadCart } from './loadCart'

export const useCart = () => {
  return {
    addToCart,
    createCart,
    loadCart,
    ...useContext(CartContext),
  }
}
