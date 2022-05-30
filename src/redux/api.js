import {createApi, fetchBaseQuery, retry} from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: retry(fetchBaseQuery({baseUrl: "http://localhost:7070/api/"}), {maxRetries: 5}),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (arg) => `users/${arg}`,
    }),
    getPosts: builder.query({
      query: async (arg) => `posts/${arg}`,
      extraOptions: {maxRetries: 10}
    }),
  }),
});

export const {useGetUserQuery, useGetPostsQuery, useUpdateUserMutation} = api;
