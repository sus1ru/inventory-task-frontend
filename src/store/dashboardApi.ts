import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Dashboard } from '../types';
const apiUrl = import.meta.env.VITE_API_URL;

export const DashboardApi = createApi({
  reducerPath: 'dashboardApi',
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
  tagTypes: ['Dashboard'],
  endpoints: (builder) => ({
    getDashboard: builder.query<Dashboard, void>({
      query: () => '/dashboard/',
      providesTags: ['Dashboard'],
    }),
   }),
});

export const {
  useGetDashboardQuery,
} = DashboardApi;
