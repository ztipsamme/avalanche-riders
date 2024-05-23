'use client'

import { PrimaryButton } from '@/app/_UI/Button'
import { classNames } from '@/utils/hooks/classNames'
import { getPrice } from '@/utils/hooks/getPrice'
import { ShopifyProduct, ShopifyProductVariant } from '@/utils/types'
import { RadioGroup, RadioGroupOption } from '@headlessui/react'
import Image from 'next/image'
import { useState } from 'react'

export const ProductImage = ({ product }: { product: ShopifyProduct }) => {
  return (
    <div className="aspect-1">
      <Image
        src={product.featuredImage.url}
        fill
        loading="lazy"
        alt={product.featuredImage.altText}
        className="object-cover"
      />
    </div>
  )
}

export const VariantSelector = ({
  variants,
}: {
  variants: ShopifyProductVariant[]
}) => {
  const [selectedVariant, setSelectedVariant] = useState(variants[0])
  const inStock = true

  return (
    <div>
      <h3 className="sr-only">Variant</h3>

      <RadioGroup value={selectedVariant} onChange={setSelectedVariant}>
        <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
        <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
          {variants.map((variant) => (
            <RadioGroup.Option
              key={variant.title}
              value={variant}
              disabled={!inStock}
              className={({ active }) =>
                classNames(
                  inStock
                    ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                    : 'cursor-not-allowed bg-gray-50 text-gray-200',
                  active ? 'ring-2 ring-primaryActive' : '',
                  'group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
                )
              }
            >
              {({ active, checked }) => (
                <>
                  <RadioGroup.Label as="span">{variant.title}</RadioGroup.Label>
                  {inStock ? (
                    <span
                      className={classNames(
                        active ? 'border' : 'border-2',
                        checked ? 'border-primaryFocus' : 'border-transparent',
                        'pointer-events-none absolute -inset-px rounded-md'
                      )}
                      aria-hidden="true"
                    />
                  ) : (
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                    >
                      <svg
                        className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                        stroke="currentColor"
                      >
                        <line
                          x1={0}
                          y1={100}
                          x2={100}
                          y2={0}
                          vectorEffect="non-scaling-stroke"
                        />
                      </svg>
                    </span>
                  )}
                </>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  )
}

export const ProductInfo = ({ product }: { product: ShopifyProduct }) => {
  const hasVariants =
    product.variants?.nodes && product.variants.nodes.length >= 2

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

      {/* <Reviews /> */}

      <form className="mt-6">
        {hasVariants && <VariantSelector variants={product.variants?.nodes} />}

        <div className="mt-10 flex max-w-80">
          <PrimaryButton props={{ type: 'submit' }}>
            Lägg till i varukorg
          </PrimaryButton>
        </div>
      </form>
    </div>
  )
}
