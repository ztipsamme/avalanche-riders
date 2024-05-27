import { createStorefrontApiClient } from '@shopify/storefront-api-client'

export const gql = String.raw

export type Props = { query: string; variables?: any }

export const client = createStorefrontApiClient({
  storeDomain: 'http://emmas-examensarbete-2024-med-testdata.myshopify.com',
  apiVersion: '2024-04',
  publicAccessToken: 'ab25b84f68d95c888ca64c98cb617f68',
})

export const fetchFromShopify = async <T>({
  query,
  variables,
}: Props): Promise<T> => {
  const { data, errors } = await client.request(query, {
    variables: variables,
  })

  if (errors) {
    console.error(errors)
    throw new Error('Failed to fetch')
  }

  if (!data) {
    throw new Error('No data returned')
  }

  return data
}
