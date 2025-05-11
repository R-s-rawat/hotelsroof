    import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// 1 mistake of react library - not imported correctly

const API_BASE_URL = process.env.VITE_BACKEND_URL;

    const commentApi = createApi({
        reducerPath: "commentApi",
        baseQuery: fetchBaseQuery({
            baseUrl: `${API_BASE_URL}/api/comments`,
            credentials: "include"
        }),
        tagTypes: ["Comments"],
        endpoints: (builder) => ({
            postComment: builder.mutation({
                query: (commentData) =>({
                    url: "/post-comment",
                    method: "POST",
                    body: commentData,
                }),
                invalidatesTags: (result, error, {postId}) => [{type: 'Comments', id: postId}],
            }),
            getComments: builder.query({
                query:(commentData) => ({
                    url: "/total-comments",
                    method: "GET",
                }),
            })
        })
    })

    export const {useGetCommentsQuery, usePostCommentMutation} = commentApi;

    export default commentApi;