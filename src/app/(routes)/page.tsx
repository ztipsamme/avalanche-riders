import Hero from '@/components/sections/Hero'
import ProductDisplay from '@/components/shop/ProductDisplay'

export default async function Page() {
  return (
    <main>
      <Hero />
      <ProductDisplay title="Produkter" />
    </main>
  )
}
