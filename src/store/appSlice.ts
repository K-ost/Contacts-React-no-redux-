import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { objToken } from '../helpers/helpers'
import { contact } from '../interfaces'

export interface CounterState {
  token: string
  users: contact[]
}

// middleware - fetchToken
export const fetchToken = createAsyncThunk(
  'app/fetchToken',
  async () => {
    const response = await fetch('https://api-teams.chatdaddy.tech/token', {
      method: 'POST',
      body: JSON.stringify(objToken)
    })
    const data = await response.json()
    return data.access_token
  }
)
export const fetchUsers = createAsyncThunk(
  'app/fetchUsers',
  async () => {
    const response = await fetch('https://api-teams.chatdaddy.tech/contacts', {
      method: 'GET'
    })
    const data = await response.json()
    return data
  }
)

const initialState: CounterState = {
  token: '',
  users: []
}

export const appSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      // state
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchToken.fulfilled, (state, action) => {
      state.token = action.payload
    })
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload
    })
  },
})

// Action creators are generated for each case reducer function
export const { increment } = appSlice.actions

export default appSlice.reducer