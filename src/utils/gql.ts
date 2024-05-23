export const gql = String.raw

const headers = {
  'Content-Type': 'application/json',
  'X-Shopify-Access-Token': process.env.ADMIN_API_ACCESS_TOKEN!,
}

const checkRes = async (res: Response) => {
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`
      Failed to fetch data
      Status: ${res.status}
      Response: ${text}
    `)
  }
}

export const getProducts = async <T>(query: string): Promise<T> => {
  const res = await fetch(process.env.GRAPHQL_API_URL!, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({ query }),
  })

  checkRes(res)

  const { data } = await res.json()

  return data as T
}

type GetSingleProduct = { [key in 'query' | 'id']: string }

export const getSingleProduct = async <T>({
  query,
  id,
}: GetSingleProduct): Promise<T> => {
  const res = await fetch(process.env.GRAPHQL_API_URL!, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      query: query,
      variables: {
        id: `gid://shopify/Product/${id}`,
      },
    }),
  })

  checkRes(res)

  const { data } = await res.json()

  return data as T
}
