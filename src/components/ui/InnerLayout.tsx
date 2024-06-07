'use client'
import { CartContextProvider } from '@/contexts/CartContext'
import { MobileNavContextProvider } from '@/contexts/MobileNavContext'
import { ScreenSizeProvider } from '@/contexts/ScreenSizeContext'
import useIntersectionObserver from '@/hooks/useIntersectionObserver'
import Banner from './Banner'
import MainNav from './MainNav'

export const InnerLayout = ({ children }: { children: React.ReactNode }) => {
  const [bannerRef, isBannerVisible] = useIntersectionObserver({
    root: null,
    rootMargin: '0px',
    threshold: 0,
  })

  return (
    <div className="bg-white relative">
      <ScreenSizeProvider>
        <CartContextProvider>
          <header className="bg-white relative">
            <div ref={bannerRef}>
              <Banner />
            </div>
            <MobileNavContextProvider>
              <div className={isBannerVisible ? '' : 'fixed top-0 z-50 w-full'}>
                <MainNav />
              </div>
            </MobileNavContextProvider>
          </header>
          <main className={!isBannerVisible ? `pt-[78px]` : ''}>
            {children}
          </main>
        </CartContextProvider>
      </ScreenSizeProvider>
    </div>
  )
}
