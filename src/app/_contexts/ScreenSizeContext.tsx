import { createContext, useContext } from 'react'
import { Children } from '../../utils/types'
import { screenSizeDefault, useScreenSize } from '../_hooks/useScreenSize'

export type ScreenSize = {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
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

export const useDevice = (): ScreenSize => useContext(ScreenSizeContext)
