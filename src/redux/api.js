import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const url = "http://localhost:7070/api/";

export const api = createApi({
  reducerPath: "api",
  endpoints: (builder) => ({
    getUser: builder.query({
      queryFn: async (arg) => {
        try {
          const response = await fetch(url + `users/${arg}`);
          return { data: await response.json() };
        } catch (e) {
          return { error: e.message };
        }
      },
    }),
    getPosts: builder.query({
      queryFn: async (arg) => {
        try {
          const response = await fetch(url + `posts/${arg}`);
          return { data: await response.json() };
        } catch (e) {
          return { error: "Something bad happened" };
        }
      },
    }),
  }),
});

export const { useGetUserQuery, useGetPostsQuery, useUpdateUserMutation } =
  api;
