import {
  BaseQueryApi,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react'
import { RootState } from '../store'
import { setUser } from '../user/userSlice'

const baseUrl = import.meta.env.VITE_BASE_URL

const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl,
  // credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState
    const accessToken = state.user.user?.accessToken

    headers.set('ngrok-skip-browser-warning', 'true')
    if (accessToken) {
      headers.set('authorization', `Bearer ${accessToken}`)
    }
    return headers
  },
})

const baseQueryWithReauth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object,
) => {
  const state = api.getState() as RootState
  console.log('baseQueryWithReauth')
  let result = await baseQuery(args, api, extraOptions)
  console.log('result: ', result)
  if (result?.error?.status == 401) {
    console.log('sending refresh token')
    const user = state.user.user
    try {
      const response = await fetch(`${baseUrl}/auth/refreshToken`, {
        method: 'POST',
        headers: {
          'ngrok-skip-browser-warning': 'true',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.accessToken}`,
        },

        body: JSON.stringify({
          refreshToken: user?.refreshToken,
        }),
      })
      const data = await response.json()
      if (response.ok) {
        api.dispatch(setUser({ ...data }))
        result = await baseQuery(args, api, extraOptions)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return result
}

// initialize an empty api service that we'll inject endpoints into later as needed
export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  tagTypes: ['Notification', 'Contract'],
})
