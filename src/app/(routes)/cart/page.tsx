import { CartItemsWithQuantitySelector } from '@/components/ui/Cart/CartItemsWithQuantitySelector'
import { OrderSummery } from '@/components/ui/Cart/OrderSummery'

export default async function Page() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Varukorg
        </h2>
        <div className="mt-6 lg:grid lg:grid-cols-12 gap-12 ">
          <CartItemsWithQuantitySelector />
          <OrderSummery />
        </div>
      </div>
    </div>
  )
}
