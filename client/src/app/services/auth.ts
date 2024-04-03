import { api } from "./api";
import { LoginData, LoginResponse } from "../types";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginData>({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    registration: builder.mutation<LoginResponse, LoginData>({
      query: (credentials) => ({
        url: "user",
        method: "POST",
        body: credentials,
      }),
    }),
    checkToken: builder.query<LoginResponse, void>({
      query: () => "auth/profile",
    }),
  }),
});

export const { useLoginMutation, useRegistrationMutation, useCheckTokenQuery } =
  authApi;
