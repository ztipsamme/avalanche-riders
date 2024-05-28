'use client'

import { ScreenSizeProvider } from '@/contexts/ScreenSizeContext'
import MainNav from './MainNav'
import { MobileNavContextProvider } from '@/contexts/MobileNavContext'
import { CartContextProvider } from '@/contexts/CartContext'

const Home = () => {
  return (
    <ScreenSizeProvider>
      <header className="bg-white sticky top-0 z-10">
        <MobileNavContextProvider>
          <CartContextProvider>
            <MainNav />
          </CartContextProvider>
        </MobileNavContextProvider>
      </header>
    </ScreenSizeProvider>
  )
}

export default Home
