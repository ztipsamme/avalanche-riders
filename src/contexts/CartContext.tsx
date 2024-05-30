'use client'
import { Children, Product } from '@/types'
import { getCartId } from '@/utils/getCartId'
import { fetchFromShopify, gql } from '@/utils/gql'
import { createContext, useContext, useState } from 'react'

type CartContext = {
  open: boolean
  handleCart: () => void
  addToCart: (variantId: string) => void
}

export const CartContext = createContext<CartContext>({
  open: false,
  handleCart: () => {},
  addToCart: () => {},
})

export const CartContextProvider = ({ children }: Children) => {
  const [open, setOpen] = useState(false)

  const handleCart = () => {
    setOpen((prev) => !prev)
  }

  const addToCart = async (variantId: string) => {
    const { cartId } = getCartId()

    if (!cartId) return null

    await fetchFromShopify({
      query: gql`
        mutation AddToCart($cartId: ID!, $variantId: ID!) {
          cartLinesAdd(
            cartId: $cartId
            lines: [{ quantity: 1, merchandiseId: $variantId }]
          ) {
            cart {
              lines(first: 100) {
                edges {
                  node {
                    id
                    quantity
                    merchandise {
                      ... on ProductVariant {
                        product {
                          title
                          id
                          featuredImage {
                            altText
                            url
                            width
                            height
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `,
      variables: { cartId, variantId },
    })
  }

  return (
    <CartContext.Provider value={{ open, handleCart, addToCart }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = (): CartContext => useContext(CartContext)
