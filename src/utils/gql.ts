export const gql = String.raw

export type GraphQLQuery = {
  query: string
}

export const getProducts = async <T>(query: GraphQLQuery): Promise<T> => {
  const res = await fetch(process.env.GRAPHQL_API_URL!, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': process.env.ADMIN_API_ACCESS_TOKEN!,
    },
    body: JSON.stringify(query),
  })

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
