import {createApi, fetchBaseQuery, retry} from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: retry(fetchBaseQuery({baseUrl: "http://localhost:7070/api/"}), {maxRetries: 5}),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (arg) => `users/${arg}`,
      providesTags: (result, error, arg) => [{type: "Users", id: arg}],
    }),
    getPosts: builder.query({
      query: (arg) => `posts/${arg}`,
      providesTags: (result, error, arg) => [{type: "Posts", id: arg}],
    }),
    updateUser: builder.mutation({
      query: ({id, ...body}) => ({
        url: `users/${id}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: (result, error, {id}) => [{type: "Users", id}],
    }),
  }),
});

export const {useGetUserQuery, useGetPostsQuery, useUpdateUserMutation} = api;
