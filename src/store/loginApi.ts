import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  message: string;
  token: string;
}
interface formData { old_password: string; new_password: string; confirm_password: string }

export const AuthApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/login/',
        method: 'POST',
        body: credentials,
      }),
    }),
    changepassword: builder.mutation<LoginResponse, formData >({
      query: (passwordData) => ({
        url: '/change-password/',
        method: 'POST',
        body: passwordData,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useChangepasswordMutation
} = AuthApi;