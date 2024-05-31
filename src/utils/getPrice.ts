import { ShopifyProduct } from '../types'

type CartPrice = {
  amount: string
  currencyCode: string
}

export const getPrice = (price: CartPrice | undefined) => {
  if (!price) return '—'

  const { amount, currencyCode } = price

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
