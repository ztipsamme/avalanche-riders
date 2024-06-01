'use client'

import { getLocalStorage } from '@/utils/getLocalStorage'
import { getPrice } from '@/utils/getPrice'
import { getSingleProductUrl } from '@/utils/getSingleProductUrl'
import { hasVariants } from '@/utils/hasVariants'
import { useCart } from '@/utils/useCart'
import { Button } from '../Button'
import { ShopifyImage } from '../ShopifyImage'
import QuantitySelector from './QuantitySelector'

const style = 'flex justify-between pt-4 mt-4'

const CartPage = () => {
  const { cart, removeFromCart } = useCart()
  const { checkoutUrl } = getLocalStorage()

  const hasCartItems = (cart?.lines ?? []).length >= 1

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Varukorg
        </h2>
        <div className="mt-6 lg:grid lg:grid-cols-12 gap-12 ">
          <ul role="list" className="-my-6 divide-y divide-gray-200 col-span-7">
            {hasCartItems &&
              cart?.lines?.map((cartItem, index) => {
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
                              <a href={getSingleProductUrl(product)}>
                                {product.title}
                              </a>
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
              })}
          </ul>
          <div className="mt-16 lg:mt-0 bg-gray-50 rounded-lg p-8 w-full col-span-5">
            <h3 className="text-lg font-medium">Order summary</h3>
            <dl className="text-sm text-gray-600 divide-y">
              <div className={style}>
                <dt>Subtotal</dt>
                <dd>$99.00</dd>
              </div>
              <div className={style}>
                <dt>
                  <span>Shipping estimate</span>
                  {/* <a href="#">
                    <span>Learn more about how shipping is calculated</span>
                  </a> */}
                </dt>
                <dd>$5.00</dd>
              </div>
              <div className={style}>
                <dt>
                  <span>Tax estimate</span>
                  {/* <a href="#">
                    <span>Learn more about how tax is calculated</span>
                  </a> */}
                </dt>
                <dd>$8.32</dd>
              </div>
              <div className={`text-base font-medium ${style}`}>
                <dt>Order total</dt>
                <dd>$112.32</dd>
              </div>
              <Button className={`mt-6`} href={checkoutUrl} link>
                Till kassan
              </Button>
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage
