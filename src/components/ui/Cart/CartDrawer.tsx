'use client'

import { getPrice } from '@/utils/getPrice'
import { useCart } from '@/utils/useCart'
import { DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import CartItem from './CartItem'
import CartLayout from './Layout'
import { Button } from '../Button'

const CartDrawer = () => {
  const { cart, toggleCart } = useCart()
  const totalAmount = cart?.cost?.totalAmount

  const hasCartItems = (cart?.lines.edges ?? []).length >= 1

  return (
    <CartLayout>
      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
        <div className="flex items-start justify-between">
          <DialogTitle className="text-lg font-medium text-gray-900">
            Varukorg
          </DialogTitle>
          <div className="ml-3 flex h-7 items-center">
            <button
              type="button"
              className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
              onClick={toggleCart}
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
              onClick={toggleCart}
            >
              {`Let's browse`}
              <span aria-hidden="true"> &rarr;</span>
            </Link>
          </p>
        )}
        <div className="mt-8">
          <div className="flow-root">
            <CartItem />
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p>Totalsumma</p>
          <p>{getPrice(totalAmount)}</p>
        </div>
        <p className="mt-0.5 text-sm text-gray-500">Totalsumma inkl. moms.</p>
        <div className="mt-6">
          <Button href={'/cart'} link onClick={toggleCart}>
            Till varukorgen
          </Button>
        </div>
        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
          <p>
            eller{' '}
            <button
              type="button"
              className="font-medium text-primary hover:text-primaryHover"
              onClick={toggleCart}
            >
              fortsätt handla
              <span aria-hidden="true"> &rarr;</span>
            </button>
          </p>
        </div>
      </div>
    </CartLayout>
  )
}

export default CartDrawer
