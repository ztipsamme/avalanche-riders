import { ReactNode } from 'react'

export type Children = { children: ReactNode }

export type IconType = React.ForwardRefExoticComponent<
  Omit<React.SVGProps<SVGSVGElement>, 'ref'> & {
    title?: string
    titleId?: string
  } & React.RefAttributes<SVGSVGElement>
>

export type Product = {
  name: string
  description: string
  href: string
  icon: IconType
}

export type TNavLink = {
  href: string
  icon?: boolean
  ariaLabel?: string
} & Children

export type DropDownItem<T> = {
  item: T
}
