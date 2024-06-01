import { createStorefrontApiClient } from '@shopify/storefront-api-client'

export const gql = String.raw

type Props = { query: string; variables?: any }

const client = createStorefrontApiClient({
  storeDomain: process.env.SHOPIFY_STORE!,
  apiVersion: '2024-04',
  publicAccessToken: process.env.SHOPIFY_HEADLESS_PUBLIC_ACCESS_TOKEN,
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
