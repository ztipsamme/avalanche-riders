import { Children } from '@/utils/types'
import { Button } from '@headlessui/react'

type Button = {
  props?: React.ButtonHTMLAttributes<HTMLButtonElement>
} & Children

export const PrimaryButton = ({ props, children }: Button) => {
  return (
    <Button
      {...props}
      className={`flex w-full items-center justify-center rounded-md border border-transparent bg-primary px-8 py-3 text-base font-medium text-white hover:bg-primaryHover focus:outline-none focus:ring-2 focus:ring-primaryFocus focus:ring-offset-2 ${props?.className}`}
    >
      {children}
    </Button>
  )
}
