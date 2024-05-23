export const getId = (id: string) => {
  const productId = id ? id.split('/').pop() : ''
  return productId
}
