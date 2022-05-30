import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({baseUrl: "http://localhost:7070/api/"}),
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
      // invalidatesTags: (result, error, {id}) => [{type: "Users", id}],
      async onQueryStarted({id, ...body}, {dispatch, queryFulfilled}) {
        console.log(id)
        const patchResult = dispatch(
            api.util.updateQueryData('getUser', +id, (draft) => Object.assign(draft, body)))
        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
    }),
  }),
});

export const {useGetUserQuery, useGetPostsQuery, useUpdateUserMutation} = api;
