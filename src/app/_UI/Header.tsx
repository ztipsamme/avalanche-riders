'use client'

import { ScreenSizeProvider } from '../_contexts/ScreenSizeContext'
import MainNav from './MainNav'

const Home = () => {
  return (
    <ScreenSizeProvider>
      <header className="bg-white">
        <MainNav />
      </header>
    </ScreenSizeProvider>
  )
}

export default Home
