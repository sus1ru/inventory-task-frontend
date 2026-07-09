import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Dashboard } from '../types';

export const DashboardApi = createApi({
  reducerPath: 'dashboardApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://192.168.18.3:8001/', // Assumed base URL for the API
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
