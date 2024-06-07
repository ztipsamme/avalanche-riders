import { Hero } from '@/components/sections/Hero'
import ProductDisplay from '@/components/storefront/ProductDisplay'

export default async function Page() {
  return (
    <>
      <Hero />
      <ProductDisplay title="Produkter" />
    </>
  )
}
