import ProductDisplay from '../_components/shop/ProductDisplay'
import Hero from '../_components/sections/Hero'

export default async function Page() {
  return (
    <main>
      <Hero />
      <ProductDisplay title="Produkter" />
    </main>
  )
}
