import { useWindowResize } from './useWindowResize'

export type ScreenSize = {
  [key in 'isSm' | 'isMd' | 'isLg' | 'isXl' | 'is2xl']: boolean
}

export const useScreenSize = (): ScreenSize => {
  const currentBreakpoint = useWindowResize()

  const breakpointSizes = {
    isSm: 'sm',
    isMd: 'md',
    isLg: 'lg',
    isXl: 'xl',
    is2xl: '2xl',
  }

  const screenSize: ScreenSize = Object.keys(breakpointSizes).reduce(
    (acc, key) => {
      const screenSizeKey = key as keyof ScreenSize
      acc[screenSizeKey] = currentBreakpoint === breakpointSizes[screenSizeKey]
      return acc
    },
    {} as ScreenSize
  )

  return { ...screenSize }
}
