import { Button as HeadlessButton } from '@headlessui/react'
import Link from 'next/link'
import { ReactNode } from 'react'
import { UrlObject } from 'url'

type ButtonProps = {
  children: ReactNode
  link?: boolean
  href?: string | UrlObject
  color?: 'blue' | 'red'
} & (
  | React.ButtonHTMLAttributes<HTMLButtonElement>
  | React.AnchorHTMLAttributes<HTMLAnchorElement>
)

export const Button = ({
  children,
  link,
  href,
  color,
  ...restProps
}: ButtonProps) => {
  let buttonColor
  const blue = `bg-primary hover:bg-primaryHover focus:ring-primaryFocus `
  switch (color) {
    case 'blue':
      buttonColor = blue
      break
    case 'red':
      buttonColor = `bg-orange-600 hover:bg-orange-500 focus-ring-bg-orange-500 `
      break

    default:
      buttonColor = blue
      break
  }

  const className = `flex w-full items-center justify-center rounded-md border border-transparent px-8 py-3 text-base font-medium text-white  focus:outline-none focus:ring-2  focus:ring-offset-2 ${buttonColor} ${restProps.className || ''}`

  if (link && href) {
    return (
      <Link
        href={href}
        {...(restProps as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        className={className}
      >
        {children}
      </Link>
    )
  }

  return (
    <HeadlessButton
      {...(restProps as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      className={className}
    >
      {children}
    </HeadlessButton>
  )
}
