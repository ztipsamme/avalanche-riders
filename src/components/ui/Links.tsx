import { ScreenSizeContext } from '@/contexts/ScreenSizeContext'
import { TNavLink } from '@/types'
import Link from 'next/link'
import { Fragment, useContext } from 'react'

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
