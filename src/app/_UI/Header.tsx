'use client'

import { ScreenSizeProvider } from '../../utils/contexts/ScreenSizeContext'
import MainNav from './MainNav'

const Home = () => {
  return (
    <ScreenSizeProvider>
      <header className="bg-white sticky top-0 z-10">
        <MainNav />
      </header>
    </ScreenSizeProvider>
  )
}

export default Home
