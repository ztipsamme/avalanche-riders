import { Fragment } from 'react'
import ProductCard from './ProductCard'

export default function ProductDisplay() {
  const productsMock = [{ id: 1273391749, name: 'Black Tee', price: '$35' }]

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Customers also purchased
        </h2>

        {productsMock.map((product: any) => (
          <Fragment key={product.id}>
            <ProductCard product={product} />
          </Fragment>
        ))}
      </div>
    </div>
  )
}
