import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api',
  }),
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => '/tasks',
    }),

    getTaskById: builder.query({
      query: (id) => `/tasks/${id}`,
    }),
  }),
})

export const { useGetTasksQuery, useGetTaskByIdQuery } = apiSlice
