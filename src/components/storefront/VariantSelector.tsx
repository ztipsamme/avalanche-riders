import { ShopifyProductVariant } from '@/types'
import { classNames } from '@/utils/classNames'
import { Label, Radio, RadioGroup } from '@headlessui/react'
import { Dispatch, SetStateAction } from 'react'

type VariantSelectorProps = {
  variants: ShopifyProductVariant[]
  selectedVariant: ShopifyProductVariant | null
  setSelectedVariant: Dispatch<SetStateAction<ShopifyProductVariant | null>>
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
