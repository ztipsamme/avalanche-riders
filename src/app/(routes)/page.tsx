import ProductDisplay from '../_components/shop/ProductDisplay'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Examensarbete',
  description: '...',
}

export default function Page() {
  return (
    <main>
      <ProductDisplay />
    </main>
  )
}
