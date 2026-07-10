import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  message: string;
  token: string;
}

export const AuthApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://192.168.18.3:8001/',
  }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/login/',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
} = AuthApi;