import { apiSlice } from '../api/apiSlice'
import {
  setReadNotifications,
  setUnReadNotifications,
} from './notificationSlice'
import { Notification } from './notificationSlice'

const extendedApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getUnReadNotifications: build.query<Notification[], void>({
      query: () => 'notfication/getUserNotifications?option=unread',
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const response = await queryFulfilled
        dispatch(setUnReadNotifications(response.data))
      },
      providesTags: ['Notification'],
    }),
    getReadNotifications: build.query<Notification[], void>({
      query: () => 'notfication/getUserNotifications?option=read',
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const response = await queryFulfilled
        dispatch(setReadNotifications(response.data))
      },
      providesTags: ['Notification'],
    }),
    markAsSeen: build.mutation<boolean, { notificationIds: number[] }>({
      query: (body) => ({
        url: '/notfication/markAsSeen',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Notification'],
    }),
    deleteNotification: build.mutation<boolean, { notificationIds: number[] }>({
      query: (body) => ({
        url: '/notfication/deleteUserNotification',
        method: 'Delete',
        body,
      }),
      invalidatesTags: ['Notification'],
    }),
  }),
})

export const {
  useGetUnReadNotificationsQuery,
  useGetReadNotificationsQuery,
  useMarkAsSeenMutation,
  useDeleteNotificationMutation,
} = extendedApi
