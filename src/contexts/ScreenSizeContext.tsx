import { createContext, useContext } from 'react'
import { Children } from '@/types'
import { useWindowResize } from '@/hooks/useWindowResize'

type ScreenSize = {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
}

export const screenSizeDefault = {
  isMobile: true,
  isTablet: false,
  isDesktop: false,
}

export const ScreenSizeContext = createContext<ScreenSize>(screenSizeDefault)

export const ScreenSizeProvider = ({ children }: Children) => {
  const screenSize = useScreenSize()

  return (
    <ScreenSizeContext.Provider value={screenSize}>
      {children}
    </ScreenSizeContext.Provider>
  )
}

export const useScreenSize = (): ScreenSize => {
  const { currentBreakpoint } = useWindowResize()

  const largerThanLg = { isMobile: false, isTablet: false, isDesktop: true }

  const screenSizeMap: Record<string, ScreenSize> = {
    sm: screenSizeDefault,
    md: { isMobile: false, isTablet: true, isDesktop: false },
    lg: largerThanLg,
    xl: largerThanLg,
    '2xl': largerThanLg,
  }

  return screenSizeMap[currentBreakpoint] || screenSizeDefault
}

export const useDevice = (): ScreenSize => useContext(ScreenSizeContext)
