import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

type digifiedToken = string | null

type CurrentState = 'init' | 'extract' | 'match' | 'done'

interface digifiedState {
  currentState: CurrentState
  digifiedToken: digifiedToken
}

const initialState: digifiedState = {
  currentState: localStorage.getItem('state')
    ? (localStorage.getItem('state') as CurrentState)
    : 'init',
  digifiedToken: localStorage.getItem('digi_token')
    ? localStorage.getItem('digi_token')
    : null,
}

export const digifiedSlice = createSlice({
  name: 'digified',
  initialState,
  reducers: {
    setDigiState: (state, action) => {
      state.currentState = action.payload
    },
    setDigifiedToken: (state, action) => {
      const { token } = action.payload
      state.digifiedToken = token
    },
    removeDigifiedToken: (state) => {
      state.digifiedToken = null
    },
  },
})

export const { setDigifiedToken, removeDigifiedToken, setDigiState } =
  digifiedSlice.actions

export default digifiedSlice.reducer

export const selectDigifiedToken = (state: RootState) =>
  state.digified.digifiedToken
export const selectDigiState = (state: RootState) => state.digified.currentState
