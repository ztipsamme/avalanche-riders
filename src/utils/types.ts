import { ReactNode } from 'react'

export type Children = { children: ReactNode }

export type IconType = React.ForwardRefExoticComponent<
  Omit<React.SVGProps<SVGSVGElement>, 'ref'> & {
    title?: string
    titleId?: string
  } & React.RefAttributes<SVGSVGElement>
>

export type DropdownProduct = {
  name: string
  description: string
  href: string
  icon: IconType
}

export type TNavLink = Partial<Children> & {
  label?: string
  href: string
  icon?: ReactNode
  ariaLabel?: string
}

export type DropDownItem<T> = {
  item: T
}

export type ShopifyExtension = {
  cost: {
    actualQueryCost: number
    requestedQueryCost: number
    throttleStatus: {
      currentlyAvailable: number
      maximumAvailable: number
      restoreRate: number
    }
  }
}

export type Image = {
  altText: string
  height: number
  id: string
  url: string
  width: number
}

export type ShopifyProduct = {
  description: string
  featuredImage: Image
  handle: string
  id: string
  priceRangeV2: {
    minVariantPrice: {
      amount: string
      currencyCode: string
    }
  }
  tags: string[]
  title: string
  variants: { nodes: ShopifyProductVariant[] }
  variantsCount: {
    count: number
  }
}

export type ShopifyProductVariant = {
  id: string
  title: string
  price: string
  image?: Image
}

export type Products = {
  products: { nodes: ShopifyProduct[] }
}
