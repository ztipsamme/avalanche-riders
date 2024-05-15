'use client'
import Link from 'next/link'
import { ReactNode } from 'react'
import { useScreenSize } from '../_helpers/useScreenSize'

type Children = ReactNode

type NavLink = {
  href: string
  children: Children
}

export const NavLink = ({ href, children }: NavLink) => {
  const { isDesktop } = useScreenSize()

  if (isDesktop) {
    return (
      <Link
        href={href}
        className="text-sm font-semibold leading-6 text-gray-900"
      >
        {children}
      </Link>
    )
  }
  return (
    <Link
      href={href}
      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
    >
      {children}
    </Link>
  )
}
