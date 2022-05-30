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
      queryFn: async (data) => {
        const {id, ...body} = data;
        try {
          let response = await fetch(`http://localhost:7070/api/users/${id}`, {
            method: "post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body),
          });
          if (response.ok) return {data: null};
          return {error: "Something bad happened"};
        } catch (e) {
          return {error: "Something bad happened"};
        }
      },
      invalidatesTags: (result, error, {id}) => [{type: "Users", id}],
    }),
  }),
});

export const {useGetUserQuery, useGetPostsQuery, useUpdateUserMutation} = api;
