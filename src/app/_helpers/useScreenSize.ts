import { useWindowResize } from './useWindowResize'

export type ScreenSize = {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
}

export const useScreenSize = (): ScreenSize => {
  const { currentBreakpoint } = useWindowResize()
  const _default = {
    isMobile: true,
    isTablet: false,
    isDesktop: false,
  }
  const largerThanLg = { isMobile: false, isTablet: false, isDesktop: true }

  const screenSizeMap: Record<string, ScreenSize> = {
    sm: _default,
    md: { isMobile: false, isTablet: true, isDesktop: false },
    lg: largerThanLg,
    xl: largerThanLg,
    '2xl': largerThanLg,
  }

  return screenSizeMap[currentBreakpoint] || _default
}
