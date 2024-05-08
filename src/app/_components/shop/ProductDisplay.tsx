'use client'

import { Fragment, useContext } from 'react'
import ProductCard from './ProductCard'
// import { ProductsContext } from '@/app/_contexts/ProductsContext'

export default function ProductDisplay() {
  const products = [{ id: 1273391749, name: 'Black Tee', price: '$35' }]
  // const { getProducts } = useContext(ProductsContext)

  // console.log(getProducts())

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Customers also purchaseds
        </h2>

        {products.map((product) => (
          <Fragment key={product.id}>
            <ProductCard product={product} />
          </Fragment>
        ))}
      </div>
    </div>
  )
}
