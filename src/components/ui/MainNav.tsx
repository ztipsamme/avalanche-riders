'use client'

import { useCart } from '@/contexts/CartContext'
import { MobileNavContext, useMobileNav } from '@/contexts/MobileNavContext'
import { Dialog, DialogPanel, PopoverGroup } from '@headlessui/react'
import {
  Bars3Icon,
  HeartIcon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  UserCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import { useContext } from 'react'
import Cart from './Cart'
import { NavLink, NavLinks } from './Links'
import { useDevice } from '@/contexts/ScreenSizeContext'

const iconStyle = 'h-5 w-5 flex-none'

const links = [
  { label: 'Produkter', href: '/products' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Kontakta oss', href: '/kontakta-oss' },
]

type link = {
  label: string
  href: string
  icon: JSX.Element
  onClick?: () => void
}

const generateIconButtons = (handleCart: () => void) => [
  {
    label: 'Sök',
    href: '#',
    icon: <MagnifyingGlassIcon className={iconStyle} aria-hidden="true" />,
  },
  {
    label: 'Favoriter',
    href: '#',
    icon: <HeartIcon className={iconStyle} aria-hidden="true" />,
  },
  {
    label: 'Varukorg',
    href: '#',
    icon: <ShoppingCartIcon className={iconStyle} aria-hidden="true" />,
    onClick: handleCart,
  },
  {
    label: 'Logga in',
    href: '#',
    icon: <UserCircleIcon className={iconStyle} aria-hidden="true" />,
  },
]

const Logo = ({ handleNav }: { handleNav?: boolean }) => {
  const { handleMobileNav } = useMobileNav()

  return (
    <Link
      href="/"
      className="-m-1.5 p-1.5"
      onClick={handleNav ? handleMobileNav : undefined}
    >
      <span className="sr-only">Your Company</span>
      <Image
        src="/logo.svg"
        alt="Vercel Logo"
        className="dark:invert"
        width={30}
        height={30}
        priority
      />
    </Link>
  )
}

const DesktopNav = () => {
  const { handleCart } = useCart()
  const { handleMobileNav } = useMobileNav()

  const iconButtons = generateIconButtons(handleCart)
  return (
    <nav
      className="mx-auto flex max-w-8xl items-center justify-between p-6 lg:px-8"
      aria-label="Global"
    >
      <PopoverGroup className="hidden lg:flex lg:flex-1 lg:gap-x-12">
        <NavLinks links={links} />
      </PopoverGroup>
      <div className="flex">
        <Logo />
      </div>
      <div className="flex lg:hidden">
        <button
          type="button"
          className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          onClick={handleMobileNav}
        >
          <span className="sr-only">Open main menu</span>
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-3">
        {iconButtons.map((link, index) => (
          <NavLink
            key={index}
            href={link.href}
            ariaLabel={link.label}
            icon
            onClick={'onClick' in link ? link.onClick : undefined}
          >
            {link.icon}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}

const MobileNav = () => {
  const { handleCart } = useCart()
  const iconButtons = generateIconButtons(handleCart)
  const { mobileMenuOpen, handleMobileNav } = useMobileNav()

  const handleNav = (link: link) => {
    if (link.onClick) {
      link.onClick()
      handleMobileNav()
    }

    return
  }

  return (
    <Dialog
      className="lg:hidden"
      open={mobileMenuOpen}
      onClose={handleMobileNav}
    >
      <div className="fixed inset-0 z-10" />
      <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div className="flex items-center justify-between">
          <Logo handleNav />
          <button
            type="button"
            className="-m-2.5 rounded-md p-2.5 text-gray-700"
            onClick={handleMobileNav}
          >
            <span className="sr-only">Close menu</span>
            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-6 flow-root">
          <div className="-my-6 divide-y divide-gray-500/10">
            <div className="space-y-2 py-6">
              <NavLinks links={links} onClick={handleMobileNav} />
            </div>
            <div className="py-6">
              {iconButtons.map((link, index) => (
                <NavLink
                  key={index}
                  href={link.href}
                  ariaLabel={link.label}
                  icon
                  onClick={() => handleNav(link)}
                >
                  <div className="nav-link-with-icon">
                    {link.icon}
                    {link.label}
                  </div>
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  )
}

export const MainNav = () => {
  return (
    <>
      <DesktopNav />

      <MobileNav />

      <Cart />
    </>
  )
}

export default MainNav
