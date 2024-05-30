'use client'

import { Product, ShopifyProductVariant } from '@/types'
import { classNames } from '@/utils/classNames'
import { getPrice } from '@/utils/getPrice'
import { hasVariants } from '@/utils/hasVariants'
import { Label, Radio, RadioGroup } from '@headlessui/react'
import Image from 'next/image'
import { Dispatch, FormEvent, SetStateAction, useState } from 'react'
import { PrimaryButton } from '../ui/Button'
import { useCart } from '@/utils/useCart'

type VariantSelectorProps = {
  variants: ShopifyProductVariant[]
  selectedVariant: ShopifyProductVariant | null
  setSelectedVariant: Dispatch<SetStateAction<ShopifyProductVariant | null>>
}

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

export const VariantSelector = ({
  variants,
  selectedVariant,
  setSelectedVariant,
}: VariantSelectorProps) => {
  const inStock = true

  return (
    <div>
      <h3 className="sr-only">Variant</h3>

      <RadioGroup value={selectedVariant} onChange={setSelectedVariant}>
        <Label className="sr-only">Choose a size</Label>
        <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
          {variants.map((variant) => (
            <Radio
              key={variant.title}
              value={variant}
              disabled={!inStock}
              className={({ focus }) =>
                classNames(
                  inStock
                    ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                    : 'cursor-not-allowed bg-gray-50 text-gray-200',
                  focus ? 'ring-2 ring-primaryActive' : '',
                  'group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
                )
              }
            >
              {({ focus, checked }) => (
                <>
                  <Label as="span">{variant.title}</Label>
                  {inStock ? (
                    <span
                      className={classNames(
                        focus ? 'border' : 'border-2',
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
            </Radio>
          ))}
        </div>
      </RadioGroup>
    </div>
  )
}

export const ProductInfo = ({ product }: Product) => {
  const { addToCart } = useCart()
  const [selectedVariant, setSelectedVariant] =
    useState<ShopifyProductVariant | null>(null)
  const hasVariant = hasVariants(product)
  const [errorMessage, setErrorMessage] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if ((hasVariant && selectedVariant) || !hasVariant) {
      setErrorMessage(false)
    }

    if (hasVariant && selectedVariant) {
      addToCart(selectedVariant.id)
      return
    }

    if (!hasVariant) {
      addToCart(product.variants.nodes[0].id)
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

      <form className="mt-6" onSubmit={handleSubmit}>
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
          <PrimaryButton props={{ type: 'submit' }}>
            Lägg till i varukorg
          </PrimaryButton>
        </div>
      </form>
    </div>
  )
}
