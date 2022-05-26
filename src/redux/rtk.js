import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const url = "http://localhost:7070/api/";

export const api = createApi({
  reducerPath: "api",
  tagTypes: ["Users","Posts"],
  refetchOnMount: false,
  keepUnusedDataFor: 120,
  pollingInterval: 0,
  endpoints: (builder) => ({
    getUser: builder.query({
      queryFn: async (arg) => {
        try {
          const response = await fetch(url + `users/${arg}`);
          return { data: await response.json() };
        } catch (e) {
          console.log(e);
          return { error: e.message };
        }
      },
      providesTags: (result, error, arg) => {
        return[{ type: 'Users', id:arg }]},
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
      providesTags: (result, error, arg) => [{ type: 'Posts', id:arg }],
    }),

    updateUser: builder.mutation({
      queryFn: async (data) => {
        const { id, ...body } = data;
        try {
          let response = await fetch(url + `users/${id}`, {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          });
         if(response.ok) return {data:null}
         return { error: "Something bad happened" };
        } catch (e) {
          console.log(2)
          return { error: "Something bad happened" };
        }
      },
      invalidatesTags: (result, error, { id }) => [{ type: 'Users', id }],
      async onQueryStarted({ id, ...body }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
            api.util.updateQueryData('getUser', id, (draft) => {
              Object.assign(draft, body)
            })
        )
        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
          //dispatch(api.util.invalidateTags(['Posts']))
        }
      },
    }),
  }),
});

export const { useGetUserQuery, useGetPostsQuery, useUpdateUserMutation } =
  api;
