import type { categories } from '@/components/ProductTable';
import type { Category } from '@/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const apiUrl = import.meta.env.VITE_API_URL;

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
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
  tagTypes: ['Category'],
  endpoints: (builder) => ({
    getCategories: builder.query<categories , void>({
      query: () => '/categories/',
      providesTags: ['Category'],
    }),
   }),
});

export const {
  useGetCategoriesQuery,
} = categoryApi;
