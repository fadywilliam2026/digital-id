import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { User, UserConfig } from '../../model/userModel'

interface UserState {
  user: User | null
  config: UserConfig
}

const persistUser = localStorage.getItem('user')

const initialState: UserState = {
  user: persistUser ? JSON.parse(persistUser) : null,
  config: { appLanguage: localStorage.getItem('i18nextLng') || 'ar' },
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = { ...state.user, ...action.payload }
      localStorage.setItem('user', JSON.stringify(state.user))
    },
    logOut: (state) => {
      state.user = initialState.user
    },
    setLanguage: (state, action) => {
      state.config.appLanguage = action.payload
    },
    setDevice: (state, action) => {
      state.config.deviceId = action.payload.deviceId
      state.config.deviceToken = action.payload.deviceToken
    },
  },
})

export const { setUser, logOut, setLanguage, setDevice } = userSlice.actions

export default userSlice.reducer

// Selectors
export const selectCurrentUser = (state: RootState) => state.user.user
export const selectCurrentUserStatus = (state: RootState) =>
  state.user.user?.status

export const selectLanguage = (state: RootState) =>
  state.user.config.appLanguage

export const selectUserConfig = (state: RootState) => state.user.config

export const selectDevices = (state: RootState) => {
  state.user.config.deviceId, state.user.config.deviceToken
}
