// Deprecated

// import { createSlice } from '@reduxjs/toolkit'
// import { User } from '../../model/userModel'
// import { RootState } from '../store'

// interface AuthState {
//   user: User | undefined
// }

// const initialState: AuthState = {
//   user: JSON.parse(localStorage.getItem('user') || '{}') || undefined,
// }

// export const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     setUser: (state, action: { type: string; payload: User }) => {
//       state.user = action.payload
//     },
//     logOut: (state) => {
//       state.user = undefined
//     },
//   },
// })

// export const { setUser, logOut } = authSlice.actions

// export default authSlice.reducer

// export const selectCurrentUser = (state: RootState) => state.auth.user
// export const selectToken = (state: RootState) => state.auth.user?.accessToken
