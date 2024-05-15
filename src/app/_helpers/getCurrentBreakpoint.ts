import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindconfig from '../../../tailwind.config'

type Breakpoint = {
  name: string
  size: string
}

window.addEventListener('resize', () => {
  getCurrentBreakpoint()
})

export const getCurrentBreakpoint = () => {
  const tailwindBreakpoints: any = resolveConfig(tailwindconfig).theme.screens
  let currentBreakpoint = 'sm'
  let breakpoints: Breakpoint[] = []

  for (var i in tailwindBreakpoints) {
    breakpoints.push({ name: i, size: tailwindBreakpoints[i] })
  }

  breakpoints.forEach((breakpoint) => {
    if (window.innerWidth >= parseFloat(breakpoint.size.slice(0, -2))) {
      currentBreakpoint = breakpoint.name
    }
  })

  return { currentBreakpoint }
}

const isScreenSize = (size: 'sm' | 'md' | 'lg' | 'xl' | 'xxl') => {
  const { currentBreakpoint } = getCurrentBreakpoint()
  console.log(currentBreakpoint)
  return size === currentBreakpoint
}

export const isSm = isScreenSize('sm')
export const isMd = isScreenSize('md')
export const isLg = isScreenSize('lg')
export const isXl = isScreenSize('xl')
export const isXXl = isScreenSize('xxl')
