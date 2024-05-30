import { ShopifyProduct } from '../types'

type CartPrice = {
  title: string
  product: {
    title: string
  }
  price: {
    amount: string
    currencyCode: string
  }
}

export const getPrice = (product: ShopifyProduct | CartPrice) => {
  if ('priceRange' in product) {
    var { amount, currencyCode } = product.priceRange.minVariantPrice
  } else {
    var { amount, currencyCode } = product.price
  }
  let currencySign

  switch (currencyCode) {
    case 'SEK':
      currencySign = `${amount} kr`
      break

    default:
      currencySign = `${amount} ${currencyCode}`
      break
  }

  return currencySign
}
