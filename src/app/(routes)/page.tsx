import Hero from '@/components/sections/Hero'
import ProductDisplay from '@/components/storefront/ProductDisplay'

export default async function Page() {
  return (
    <main>
      <Hero />
      <ProductDisplay title="Produkter" />
    </main>
  )
}
