export const gql = String.raw

export type UseShopifyStorefrontRequest = { query: string; variables?: {} }

export const useShopifyStorefrontRequest = async <T>({
  query,
  variables,
}: UseShopifyStorefrontRequest) => {
  const res = await fetch(
    `https://${process.env.SHOPIFY_STORE}/admin/api/2024-04/graphql.json`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': process.env.SHOPIFY_ADMIN_TOKEN!,
      },
      body: JSON.stringify({ query, variables }),
    }
  )

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`
      Failed to fetch data
      Status: ${res.status}
      Response: ${text}
    `)
  }

  const { data } = await res.json()

  return data as T
}
