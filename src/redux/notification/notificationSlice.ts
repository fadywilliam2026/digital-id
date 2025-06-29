import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

export type Notification = {
  id: number
  createdAt: string
  updatedAt: string
  userId: number
  isNew: boolean
  isSeen: boolean
  otherOptions: {
    companyName: string
  }
  notificationTemplateId: number
  notificationTemplate: {
    title: string
    body: string
  }
}

interface NotificationState {
  readNotifications: Notification[]
  unReadNotifications: Notification[]
}

const initialState: NotificationState = {
  readNotifications: [],
  unReadNotifications: [],
}

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setReadNotifications: (state, action) => {
      state.readNotifications = action.payload
    },
    setUnReadNotifications: (state, action) => {
      state.unReadNotifications = action.payload
    },
  },
})

export const { setReadNotifications, setUnReadNotifications } =
  notificationSlice.actions

export default notificationSlice.reducer

export const selectReadNotifications = (state: RootState) =>
  state.notification.readNotifications

export const selectUnReadNotifications = (state: RootState) =>
  state.notification.unReadNotifications
