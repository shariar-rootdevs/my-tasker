import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api',
  }),

  tagTypes: ['Tasks' as const],
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => '/tasks',
      providesTags: ['Tasks'], //
    }),

    getTaskById: builder.query({
      query: (id) => `/tasks/${id}`,
    }),

    createTask: builder.mutation({
      query: (newTask) => ({
        url: '/tasks',
        method: 'POST',
        body: newTask,
      }),
      invalidatesTags: ['Tasks'],
    }),

    updateTask: builder.mutation({
      query: ({ id, ...updatedTask }) => ({
        url: `/tasks/${id}`,
        method: 'PUT',
        body: updatedTask,
      }),
      invalidatesTags: ['Tasks'],
    }),

    deleteTask: builder.mutation({
      query: (id: string) => ({
        url: `/tasks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Tasks'],
    }),
  }),
})

export const {
  useGetTasksQuery,
  useGetTaskByIdQuery,
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} = apiSlice
