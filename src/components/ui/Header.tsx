'use client'
import { MobileNavContextProvider } from '@/contexts/MobileNavContext'
import { ScreenSizeProvider } from '@/contexts/ScreenSizeContext'
import MainNav from './MainNav'

const Home = () => {
  return (
    <ScreenSizeProvider>
      <header className="bg-white sticky top-0 z-10">
        <MobileNavContextProvider>
          <MainNav />
        </MobileNavContextProvider>
      </header>
    </ScreenSizeProvider>
  )
}

export default Home
