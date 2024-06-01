import { Price } from '../types'

export const getPrice = (price: Price | string | undefined) => {
  if (!price || typeof price === 'string') return '—'

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
