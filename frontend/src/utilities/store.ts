import { createSlice, configureStore, createAsyncThunk } from '@reduxjs/toolkit'
import { createSelectorHook, useDispatch } from 'react-redux'

type UsersSlice = {
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  users: {
    name: string
    description: string
    id: number
    photo: string
  }[]
}

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const response = await fetch(`http://localhost:3000/api/users/`)
    return (await response.json())
  }
)

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    loading: 'idle',
    users: [],
  } as UsersSlice,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchUsers.pending, (state, action) => {
      state.loading = 'pending'
      console.log(state, action)
    })
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = 'idle'
      state.users = action.payload
      console.log(state, action)
    })
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = 'idle'
      console.log(state, action)
    })
  }
})

export const store = configureStore({
  reducer: {
    users: usersSlice.reducer,
  }
})

export const actions = {
  ...usersSlice.actions,
}

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useTypedSelector = createSelectorHook<RootState>();
