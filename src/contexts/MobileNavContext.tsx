import { createContext, useContext, useState } from 'react'
import { Children } from '@/types'

type MobileNavContext = {
  mobileMenuOpen: boolean
  handleMobileNav: () => void
}

export const MobileNavContext = createContext({
  mobileMenuOpen: false,
  handleMobileNav: () => {},
})

export const MobileNavContextProvider = ({ children }: Children) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleMobileNav = () => {
    setMobileMenuOpen((prev) => !prev)
  }

  return (
    <MobileNavContext.Provider value={{ mobileMenuOpen, handleMobileNav }}>
      {children}
    </MobileNavContext.Provider>
  )
}

export const useMobileNav = (): MobileNavContext => useContext(MobileNavContext)
