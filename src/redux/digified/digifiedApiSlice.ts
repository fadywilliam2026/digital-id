import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = import.meta.env.VITE_DIGIFIED_BASE_URL

export const digifiedApiSlice = createApi({
  reducerPath: 'digifiedApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers) => {
      const token = JSON.parse(localStorage.getItem('tokens') || '{}')
      if (token) {
        headers.set('authorization', `Bearer ${token.accessToken}`)
      }
    },
  }),
  endpoints: (builder) => ({
    extract: builder.mutation({
      query: (body) => ({
        url: '/extract',
        method: 'POST',
        body,
      }),
    }),
    match: builder.mutation({
      query: (body) => ({
        url: '/match',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { useExtractMutation, useMatchMutation } = digifiedApiSlice
