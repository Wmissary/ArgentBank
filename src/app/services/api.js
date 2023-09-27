import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/api/v1/user/",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: builder => ({
    login: builder.mutation({
      query: credentials => ({
        url: "login",
        method: "POST",
        body: credentials,
      }),
    }),
    getProfile: builder.query({
      query: () => ({ url: "profile", method: "POST" }),
    }),
    updateName: builder.mutation({
      query: ({ firstName, lastName }) => ({
        url: "profile",
        method: "PUT",
        body: { firstName, lastName },
      }),
    }),
  }),
});

export const { useLoginMutation, useGetProfileQuery } = api;
