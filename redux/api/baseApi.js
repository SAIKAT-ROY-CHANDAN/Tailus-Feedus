import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  // baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/" }),
  baseQuery: fetchBaseQuery({ baseUrl: "https://tailus-feedus-jade.vercel.app/api/" }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: ({ email, phone, password }) => ({
        url: "/auth/sign-up",
        method: "POST",
        body: { email, phone, password },
      }),
    }),
    login: builder.mutation({
      query: ({ email, password }) => {
        return {
          url: "/auth/login",
          method: "POST",
          body: { email, password },
        };
      },
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = baseApi;
