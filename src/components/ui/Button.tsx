import { Button as HeadlessButton } from '@headlessui/react'
import Link from 'next/link'
import { ReactNode } from 'react'
import { UrlObject } from 'url'

type ButtonProps = {
  children: ReactNode
  link?: boolean
  disabled?: boolean
  href?: string | UrlObject
  color?: 'blue' | 'red'
} & (
  | React.ButtonHTMLAttributes<HTMLButtonElement>
  | React.AnchorHTMLAttributes<HTMLAnchorElement>
)

export const Button = ({
  children,
  link,
  disabled,
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
      buttonColor = `bg-red hover:bg-redHover focus-ring-bg-redFocus `
      break

    default:
      buttonColor = blue
      break
  }

  const btnClasses = `flex w-full items-center justify-center rounded-md border border-transparent px-8 py-3 text-base font-medium text-white  focus:outline-none focus:ring-2  focus:ring-offset-2 ${buttonColor} ${restProps.className || ''}`

  if (disabled) {
    return (
      <HeadlessButton
        {...(restProps as React.ButtonHTMLAttributes<HTMLButtonElement>)}
        className={`${btnClasses} !bg-gray-200 !text-gray-600`}
        disabled
      >
        {children}
      </HeadlessButton>
    )
  }

  if (link) {
    return (
      <Link
        href={href ? href : '#'}
        {...(restProps as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        className={btnClasses}
      >
        {children}
      </Link>
    )
  }

  return (
    <HeadlessButton
      {...(restProps as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      className={btnClasses}
    >
      {children}
    </HeadlessButton>
  )
}
