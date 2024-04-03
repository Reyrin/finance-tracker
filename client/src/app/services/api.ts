import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000/api",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");

    if (token) headers.set("authorization", `Bearer ${token}`);

    return headers;
  },
});

export const api = createApi({
  baseQuery,
  endpoints: () => ({}),
});
