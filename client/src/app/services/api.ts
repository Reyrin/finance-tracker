import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


console.log(111, import.meta.env.VITE_BASE_URL);

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");

    if (token) headers.set("authorization", `Bearer ${token}`);

    return headers;
  },
});

export const api = createApi({
  baseQuery,
  endpoints: () => ({}),
  refetchOnMountOrArgChange: true,
});
