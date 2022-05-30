import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({baseUrl: "http://localhost:7070/api/"}),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (arg) => `users/${arg}`,
    }),
    getPosts: builder.query({
      query: async (arg) => `posts/${arg}`,
    }),
  }),
});

export const {useGetUserQuery, useGetPostsQuery, useUpdateUserMutation} = api;
