import { appConfig } from "@/app.config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface UserResponse {
  data: {
    userId: string;
    token: string;
  };
}

export interface SignUpRequest {
  username: string;
}

export interface SignInRequest {
  username: string;
  otp: string;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${appConfig.api.user}`,
  }),
  endpoints: (builder) => ({
    signUp: builder.mutation<UserResponse, SignUpRequest>({
      query: (credentials) => ({
        url: "request-login",
        method: "POST",
        body: credentials,
      }),
    }),
    signIn: builder.mutation<UserResponse, SignInRequest>({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useSignUpMutation, useSignInMutation } = authApi;
