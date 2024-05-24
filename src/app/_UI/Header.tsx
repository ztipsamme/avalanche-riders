'use client'

import { CartProvider } from '@/contexts/CartContext'
import { ScreenSizeProvider } from '../../contexts/ScreenSizeContext'
import MainNav from './MainNav'
import { MobileNavContextProvider } from '@/contexts/MobileNavContext'

const Home = () => {
  return (
    <ScreenSizeProvider>
      <header className="bg-white sticky top-0 z-10">
        <MobileNavContextProvider>
          <CartProvider>
            <MainNav />
          </CartProvider>
        </MobileNavContextProvider>
      </header>
    </ScreenSizeProvider>
  )
}

export default Home
