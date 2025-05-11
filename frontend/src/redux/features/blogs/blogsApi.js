import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// export const blogApi = createApi({
//     reducerPath: 'pokemonApi',
//     baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
//     endpoints: (builder) => ({
//       getPokemonByName: builder.query({
//         query: (name) => `pokemon/${name}`,
//       }),
//     }),
//   });
export const blogApi = createApi({
  reducerPath: 'blogsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.VITE_BACKEND_URL,
    credentials: 'include'
  }),
  tagTypes: ['Blogs'],
  endpoints: (builder) => ({
    fetchBlogs: builder.query({
      query: ({ search = '', category = '', location = '' }) => `/blogs?search=${search}&category=${category}&location=${location}`,
      providesTags: ['Blogs']
    }),
    fetchBlogById: builder.query({
      query: (id) => `/blogs/${id}`
    }),
    fetchRelatedBlogs: builder.query({
      query: (id) => `/blogs//related/${id}`
    }),
    postBlog: builder.mutation({
      query: (newBlog) => ({
        url: `/blogs/create-post`,
        method: "POST",
        body: newBlog,
        credentials: "include",
      })
    }),
    updateBlog: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/blogs/update-post/${id}`,
        method: "PATCH",
        body: rest,
        credentials: "include",
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Blogs', id }],
    }),
    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `blogs/${id}`,
        method: "DELETE",
        credentials: "include"
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Blogs', id }],
    })
  })
});


// createApi function in Redux Toolkit Query (RTK Query)
// automatically generates a set of React hooks for each of the endpoints
// export const {useGetPokemonByNameQuery} = blogApi;

export const { useFetchBlogsQuery, useFetchBlogByIdQuery, useFetchRelatedBlogsQuery, usePostBlogMutation, useUpdateBlogMutation, useDeleteBlogMutation } = blogApi;