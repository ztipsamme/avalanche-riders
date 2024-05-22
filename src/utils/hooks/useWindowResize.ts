import { useEffect, useState } from 'react'
import tailwindconfig from '../../../tailwind.config'
import resolveConfig from 'tailwindcss/resolveConfig'

type Breakpoint = {
  [key in 'name' | 'size']: string
}

export type TailwindBreakpoints = {
  [key: string]: string
}

export const useWindowResize = () => {
  const [currentBreakpoint, setCurrentBreakpoint] = useState('')
  const tailwindBreakpoints: TailwindBreakpoints =
    resolveConfig(tailwindconfig).theme.screens

  useEffect(() => {
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

  const getCurrentBreakpoint = (): string => {
    const tailwindBreakpoints: TailwindBreakpoints =
      resolveConfig(tailwindconfig).theme.screens
    let newBreakpoint = ''

    for (const [key, value] of Object.entries(tailwindBreakpoints)) {
      if (window.innerWidth >= parseFloat(value.slice(0, -2))) {
        newBreakpoint = key
      }
    }

    return newBreakpoint
  }

  return { currentBreakpoint, getCurrentBreakpoint }
}
