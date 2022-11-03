// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { ApiResponse, ListResponse, Product, ProductImage } from '../types'
import constants from '../constants'

// Define a service using a base URL and expected endpoints
export const productApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${constants.baseUrl}/products`,
    }),
    tagTypes: ['Post'],
    endpoints: (builder) => ({
        getProducts: builder.query<ListResponse<Product<string>>, any>({
            query: (params) => ({
                url: `getList`,
                params
            }),
            providesTags: (result, error, arg) => {
                return result
                    ? [...result.data.map(({ id }) => ({ type: 'Post' as const, id })), 'Post']
                    : ['Post']
            },
            transformResponse(baseQueryReturnValue: ListResponse<Product<string>>, meta, arg) {
                if (!meta?.response?.ok) {
                    console.log('JSON Error : ', meta?.response)
                }
                return baseQueryReturnValue
            },
        }),
        getProductDetailsById: builder.query<ApiResponse<Product<ProductImage[]>>, any>({
            query: (params) => ({
                url: `getDetail`,
                params
            }),
            transformResponse(baseQueryReturnValue: ApiResponse<Product<ProductImage[]>>, meta, arg) {
                if (!meta?.response?.ok) {
                    console.log('JSON Error : ', meta?.response)
                }
                return baseQueryReturnValue
            },
        })
    })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetProductsQuery, useGetProductDetailsByIdQuery } = productApi