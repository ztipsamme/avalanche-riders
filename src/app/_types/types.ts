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

export type DropDownItem<T> = {
  item: T
}
