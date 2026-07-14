import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { AddProductRequest, EditProductRequest, GetProductsQuery, Product, ProductsResponse } from '../types';
const apiUrl = import.meta.env.VITE_API_URL;


export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl, // Use the API URL from environment variables
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Product'],
  endpoints: (builder) => ({
   getProducts: builder.query<ProductsResponse, GetProductsQuery>({
  query: (query) => {
    if (typeof query === "string") {
    if (query.startsWith("http")) {
      const search = new URL(query).search;
      console.log(search,"asdasdsearch")
      return `/products/${search}`;
    }

    return `/products/?search=${encodeURIComponent(query)}`;
  }
    if (typeof query === "number") {
      return `/products/?category=${query}`;
    }

    return "/products/";
  },
  providesTags: ["Product"],
}),
    addProduct: builder.mutation<Product, Omit<AddProductRequest, 'id'>>({
      query: (body) => ({
        url: '/products/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Product'],
    }),
    updateProduct: builder.mutation<Product, EditProductRequest>({
      query: ({ id, ...body }) => ({
        url: `/products/${id}/`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Product'],
    }),
    deleteProduct: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Product'],
    }),
  }),

});

export const {
  useGetProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;
