import { BreadcrumbsNav } from '@/app/_UI/BreadcrumbsNav'
import { getSingleProduct, gql } from '@/utils/gql'
import { ShopifyProduct } from '@/utils/types'

type SingleProductPageProps = {
  params: {
    productId: string
  }
}

const productQuery = (id: string) => gql`
  {
    product(id: "gid://shopify/Product/${id}") {
      id
      description
      featuredImage {
        altText
        height
        id
        url
        width
      }
      handle
      priceRangeV2 {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      tags
      title
    }
  }
`

export default async function Page({ params }: SingleProductPageProps) {
  const id = params.productId
  const { product } = await getSingleProduct<{ product: ShopifyProduct }>({
    query: productQuery(id),
    id: id,
  })

  return (
    <div className="bg-white">
      <div className="pt-6">
        <BreadcrumbsNav label={product.title} href={product.id} />

        {/* <ImageGallery />

        <ProductInfo /> */}
      </div>
    </div>
  )
}
