import { useState, useEffect, useRef, RefObject } from 'react'

type IntersectionObserverOptions = {
  root: null
  rootMargin: string
  threshold: number
}

const useIntersectionObserver = (
  options: IntersectionObserverOptions
): [RefObject<HTMLDivElement>, boolean] => {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting)
    }, options)

    const currentRef = ref.current

    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [options])

  return [ref, isIntersecting]
}

export default useIntersectionObserver
