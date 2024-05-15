import { useEffect, useState } from 'react'
import tailwindconfig from '../../../tailwind.config'
import resolveConfig from 'tailwindcss/resolveConfig'

export type TailwindBreakpoints = {
  [key: string]: string
}

export type Breakpoint = {
  [key in 'name' | 'size']: string
}

export const useWindowResize = () => {
  const [currentBreakpoint, setCurrentBreakpoint] = useState('')

  useEffect(() => {
    const tailwindBreakpoints: TailwindBreakpoints =
      resolveConfig(tailwindconfig).theme.screens
    let breakpoints: Breakpoint[] = []

    for (var key in tailwindBreakpoints) {
      breakpoints.push({ name: key, size: tailwindBreakpoints[key] })
    }

    const handleResize = () => {
      const width = window.innerWidth
      let newBreakpoint = ''

      breakpoints.forEach((breakpoint) => {
        if (width >= parseFloat(breakpoint.size.slice(0, -2))) {
          newBreakpoint = breakpoint.name
        }
      })

      setCurrentBreakpoint(newBreakpoint)
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return currentBreakpoint
}
