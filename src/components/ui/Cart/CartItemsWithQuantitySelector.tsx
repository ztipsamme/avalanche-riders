'use client'
import { getPrice } from '@/utils/getPrice'
import { getSingleProductUrl } from '@/utils/getSingleProductUrl'
import { hasVariants } from '@/utils/hasVariants'
import Link from 'next/link'
import { ShopifyImage } from '../ShopifyImage'
import QuantitySelector from './QuantitySelector'
import { useCart } from '@/hooks/useCart'

export const CartItemsWithQuantitySelector = () => {
  const { cart, removeFromCart, toggleCart } = useCart()
  const cartItems = cart?.lines?.edges ?? []
  const hasCartItems = cartItems.length > 0

  return (
    <ul role="list" className="-my-6 divide-y divide-gray-200 col-span-7">
      {hasCartItems ? (
        cartItems.map((cartItem, index) => {
          const variant = cartItem.node.merchandise
          const product = cartItem.node.merchandise.product
          return (
            <li key={index}>
              <div className="flex py-6">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 relative">
                  <ShopifyImage image={variant.image} />
                </div>
                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>
                        <Link href={getSingleProductUrl(product)}>
                          {product.title}
                        </Link>
                      </h3>
                      <p className="ml-4 whitespace-nowrap">
                        {getPrice(cartItem.node.cost.totalAmount)}
                      </p>
                    </div>
                    {hasVariants(product) && (
                      <p className="mt-1 text-sm text-gray-500">
                        {variant.title}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <QuantitySelector
                      current={cartItem.node.quantity}
                      linedId={cartItem.node.id}
                    />
                    <div className="flex">
                      <button
                        type="button"
                        className="font-medium text-primary hover:text-primaryHover"
                        onClick={(event) => {
                          event.preventDefault()
                          removeFromCart(cartItem.node.id)
                        }}
                      >
                        Ta bort
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          )
        })
      ) : (
        <p className="mt-6 text-sm text-gray-500">
          {`Din varukorg är tom. `}
          <Link
            href={'/products'}
            className="font-medium text-primary hover:text-primaryHover"
            onClick={toggleCart}
          >
            {`Spana in våra produkter`}
            <span aria-hidden="true"> &rarr;</span>
          </Link>
        </p>
      )}
    </ul>
  )
}
