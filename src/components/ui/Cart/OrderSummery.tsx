'use client'

import { getLocalStorage } from '@/utils/getLocalStorage'
import { getPrice } from '@/utils/getPrice'
import { useCart } from '@/hooks/useCart'
import { Button } from '../Button'

export const OrderSummery = () => {
  const { cart } = useCart()
  const { checkoutUrl } = getLocalStorage()

  const style = 'flex justify-between pt-4 mt-4'

  return (
    <div className="mt-16 lg:mt-0 bg-gray-50 rounded-lg p-8 w-full h-fit col-span-5">
      <h3 className="text-lg font-medium">Order summering</h3>
      <dl className="text-sm text-gray-600 divide-y">
        <div className={style}>
          <dt>Subtotal</dt>
          <dd>{getPrice(cart?.cost?.subtotalAmount)}</dd>
        </div>
        {/* <div className={style}>
        <dt>
          <span>Shipping estimate</span>
        </dt>
        <dd>$5.00</dd>
      </div>
      <div className={style}>
        <dt>
          <span>Tax estimate</span>
        </dt>
        <dd>$8.32</dd>
      </div> */}
        <div className={`text-base font-medium ${style}`}>
          <dt>Totalsumma</dt>
          <dd>{getPrice(cart?.cost?.totalAmount)}</dd>
        </div>
      </dl>
      <Button className={`mt-6`} href={checkoutUrl} link>
        Till kassan
      </Button>
    </div>
  )
}
