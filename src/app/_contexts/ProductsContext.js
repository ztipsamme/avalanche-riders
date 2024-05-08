// 'use client'
// import { createContext, useContext } from 'react'

// const gql = String.raw

// export async function shopifyFetch({ query, variables }) {
//   const endpoint = 'emmas-examensarbete-2024-med-testdata.myshopify.com'
//   const key = 'process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN'

//   try {
//     const result = await fetch(endpoint, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'X-Shopify-Storefront-Access-Token': key,
//       },
//       body: { query, variables } && JSON.stringify({ query, variables }),
//     })

//     return {
//       status: result.status,
//       body: await result.json(),
//     }
//   } catch (error) {
//     console.error('Error:', error)
//     return {
//       status: 500,
//       error: 'Error receiving data',
//     }
//   }
// }

// export const ProductsContext = createContext({})

// export const ProductsContextProvider = ({ children }) => {
//   const getProducts = () => {
//     const result = shopifyFetch({
//       query: `
//         {
//           products(first: 10) {
//             nodes {
//               id
//               title
//               description
//             }
//           }
//         }
//       `,
//     })
//     return result
//   }

//   const getSingleProduct = (id) => {
//     return shopifyFetch({
//       query: gql`
//         {
//           product(id: ${id}) {
//             title
//             id
//             description
//           }
//         }
//       `,
//     })
//   }

//   const hej = () => {
//     return alert('hejsan')
//   }

//   return (
//     <ProductsContext.Provider value={{ getProducts, getSingleProduct, hej }}>
//       {children}
//     </ProductsContext.Provider>
//   )
// }

// export const useProducts = () => {
//   const context = useContext(ProductsContext)

//   return context
// }
