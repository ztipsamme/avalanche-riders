import { useCart } from '@/contexts/CartContext'
import { getPrice } from '@/utils/getPrice'
import { getSingleProductUrl } from '@/utils/getSingleProductUrl'
import { hasVariants } from '@/utils/hasVariants'
import { DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import CartLayout from './Layout'
import { loadCart } from '@/shopify/loadCart'
import { createCart } from '@/shopify/createCart'

export const localCartName = 'Cart'

type Cart = {
  id: ''
  checkoutUrl: ''
  estimatedCost?: { totalAmount: { amount: string } }
  lines?: any[]
}

export default function Cart() {
  const { handleCart } = useCart()
  const [cart, setCart] = useState<Cart>({
    id: '',
    checkoutUrl: '',
    estimatedCost: undefined,
    lines: undefined,
  })

  useEffect(() => {
    async function getCart() {
      let localCartData: any = window.localStorage.getItem(localCartName)

      if (localCartData) {
        const existingCartData = await loadCart()

        setCart({
          id: localCartData.id,
          checkoutUrl: localCartData.checkoutUrl,
          estimatedCost: existingCartData?.cart.cost,
          lines: existingCartData?.cart.lines.edges,
        })
        return
      }

      localCartData = await createCart()

      setCart((prev) => ({
        ...prev,
        id: localCartData.id,
        checkoutUrl: localCartData.checkoutUrl,
      }))

      window.localStorage.setItem(localCartName, JSON.stringify(localCartData))
    }

    getCart()
  }, [])

  const hasCartItems = (cart.lines ?? []).length >= 1

  return (
    <CartLayout>
      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
        <div className="flex items-start justify-between">
          <DialogTitle className="text-lg font-medium text-gray-900">
            Shopping cart
          </DialogTitle>
          <div className="ml-3 flex h-7 items-center">
            <button
              type="button"
              className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
              onClick={handleCart}
            >
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Close panel</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
        {!hasCartItems && (
          <p className="mt-0.5 text-sm text-gray-500">
            {`Your cart is currently empty. `}
            <Link
              href={'/products'}
              className="font-medium text-primary hover:text-primaryHover"
              onClick={handleCart}
            >
              {`Let's browse`}
              <span aria-hidden="true"> &rarr;</span>
            </Link>
          </p>
        )}
        <div className="mt-8">
          <div className="flow-root">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {hasCartItems &&
                cart.lines?.map((cartItem) => {
                  const variant = cartItem.node.merchandise
                  const product = cartItem.node.merchandise.product
                  return (
                    <li key={product.id} className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 relative">
                        <Image
                          src={product.featuredImage.url}
                          alt={product.featuredImage.altText}
                          className="h-full w-full object-cover object-center"
                          fill
                          sizes="(max-width: 100px) 100vw, 33vw"
                        />
                      </div>
                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <a href={getSingleProductUrl(product)}>
                                {product.title}
                              </a>
                            </h3>
                            <p className="ml-4 whitespace-nowrap">
                              {getPrice(variant)}
                            </p>
                          </div>
                          {hasVariants(product) && (
                            <p className="mt-1 text-sm text-gray-500">
                              {variant.title}
                            </p>
                          )}
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <p className="text-gray-500">
                            Qty {cartItem.node.quantity}
                          </p>
                          <div className="flex">
                            <button
                              type="button"
                              className="font-medium text-primary hover:text-primaryHover"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  )
                })}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p>Subtotal</p>
          <p>$262.00</p>
        </div>
        <p className="mt-0.5 text-sm text-gray-500">
          Shipping and taxes calculated at checkout.
        </p>
        <div className="mt-6">
          <a
            href="#"
            className="flex items-center justify-center rounded-md border border-transparent bg-primary px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-primaryHover"
          >
            Checkout
          </a>
        </div>
        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
          <p>
            or{' '}
            <button
              type="button"
              className="font-medium text-primary hover:text-primaryHover"
              onClick={handleCart}
            >
              Continue Shopping
              <span aria-hidden="true"> &rarr;</span>
            </button>
          </p>
        </div>
      </div>
    </CartLayout>
  )
}
