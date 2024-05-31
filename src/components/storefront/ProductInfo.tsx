'use client'

import { Product, ShopifyProductVariant } from '@/types'
import { getPrice } from '@/utils/getPrice'
import { hasVariants } from '@/utils/hasVariants'
import { useCart } from '@/utils/useCart'
import Image from 'next/image'
import { useState } from 'react'
import { PrimaryButton } from '../ui/Button'
import { VariantSelector } from './VariantSelector'

export const ProductImage = ({ product }: Product) => {
  return (
    <div className="aspect-1">
      <Image
        src={product.featuredImage.url}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        loading="lazy"
        alt={product.featuredImage.altText}
        className="object-cover"
      />
    </div>
  )
}

export const ProductInfo = ({ product }: Product) => {
  const hasVariant = hasVariants(product)
  const { addToCart, toggleCart } = useCart()
  const [errorMessage, setErrorMessage] = useState(false)
  const [selectedVariant, setSelectedVariant] =
    useState<ShopifyProductVariant | null>(null)

  const handleSubmit = () => {
    if ((hasVariant && selectedVariant) || !hasVariant) {
      setErrorMessage(false)
    }

    if (hasVariant && selectedVariant) {
      addToCart(selectedVariant.id)
      toggleCart()
      return
    }

    if (!hasVariant) {
      addToCart(product.variants.nodes[0].id)
      toggleCart()
      return
    }

    setErrorMessage(true)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
        {product.title}
      </h1>
      <h2 className="sr-only">Product information</h2>
      <p className="mt-6 text-3xl tracking-tight text-gray-900">
        {getPrice(product)}
      </p>
      <div className="mt-6">
        <h3 className="sr-only">Description</h3>

        <div className="space-y-6">
          <p className="text-base text-gray-900">{product.description}</p>
        </div>
      </div>
      <form className="mt-6">
        {hasVariants(product) && (
          <VariantSelector
            variants={product.variants?.nodes}
            selectedVariant={selectedVariant}
            setSelectedVariant={setSelectedVariant}
          />
        )}

        <div className="mt-4  max-w-80">
          <div className="h-6">
            {errorMessage && (
              <p className="text-sm text-gray-500">No variant selected!</p>
            )}
          </div>
          <PrimaryButton props={{ onClick: handleSubmit }}>
            Lägg till i varukorg
          </PrimaryButton>
        </div>
      </form>
    </div>
  )
}
