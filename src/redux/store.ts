import { configureStore } from '@reduxjs/toolkit'

import { apiSlice } from './api/apiSlice'
import { digifiedApiSlice } from './digified/digifiedApiSlice'

import digifiedSlice from './digified/digifiedSlice'
import notificationSlice from './notification/notificationSlice'
import userSlice from './user/userSlice'

export const store = configureStore({
  reducer: {
    user: userSlice,
    digified: digifiedSlice,
    notification: notificationSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [digifiedApiSlice.reducerPath]: digifiedApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(apiSlice.middleware)
      .concat(digifiedApiSlice.middleware)
  },

  devTools: true,
})

export type RootState = ReturnType<typeof store.getState>
