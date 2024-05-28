import Link from 'next/link'
import { Fragment, useContext } from 'react'
import { DropDownItem, TNavLink, DropdownProduct } from '@/types'
import { ScreenSizeContext } from '@/contexts/ScreenSizeContext'

export const NavLink = ({
  href,
  icon,
  ariaLabel,
  children,
  onClick,
}: TNavLink) => {
  const { isDesktop } = useContext(ScreenSizeContext)
  if (isDesktop) {
    return (
      <Link
        href={href}
        className={`.nav-link ${icon && '.nav-link-with-icon'}`}
        aria-label={ariaLabel}
        onClick={onClick}
      >
        {children}
      </Link>
    )
  }
  return (
    <Link
      href={href}
      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
      aria-label={ariaLabel}
      onClick={onClick}
    >
      {children}
    </Link>
  )
}

export const NavLinks = ({
  links,
  onClick,
}: {
  links: TNavLink[]
  onClick?: () => void
}) => (
  <>
    {links.map((link, index) => (
      <Fragment key={index}>
        <NavLink
          href={link.href}
          ariaLabel={'ariaLabel' in link ? link.ariaLabel : undefined}
          icon={'icon' in link ? link.icon : undefined}
          onClick={onClick}
        >
          {'label' in link ? link.label : link.children}
        </NavLink>
      </Fragment>
    ))}
  </>
)

export const NavLinkDropDownWithDescription = ({
  item,
}: DropDownItem<DropdownProduct>) => (
  <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
    <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
      <item.icon
        className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
        aria-hidden="true"
      />
    </div>
    <div className="flex-auto">
      <Link href={item.href} className="block font-semibold text-gray-900">
        {item.name}
        <span className="absolute inset-0" />
      </Link>
      <p className="mt-1 text-gray-600">{item.description}</p>
    </div>
  </div>
)
