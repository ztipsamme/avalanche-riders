export const formatId = (id: string) => {
  const productId = id ? id.split('/').pop() : ''
  return productId
}
