import { createSlice, configureStore, createAsyncThunk } from '@reduxjs/toolkit'
import { createSelectorHook, useDispatch } from 'react-redux'

const BASE_USERS_API = 'http://localhost:3000/api/users/'

interface User {
  name: string
  description: string
  id: number
  photo: string
}

interface UsersSlice {
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  users: User[]
  visibleUsers: {
    limit: number
  },
}

const initialState: UsersSlice = {
  loading: 'idle',
  users: [],
  visibleUsers: {
    limit: 2,
  },
}

export const addUser = createAsyncThunk<UsersSlice["users"], Omit<User, "id"> | undefined, { state: RootState }>(
  'users/addUser',
  async (user = {
    name: "test name",
    description: "test description",
    photo: "test photo",
  }) => {
    const response = await fetch(BASE_USERS_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    return (await response.json())
  }
)

export const fetchAllUsers = createAsyncThunk<UsersSlice["users"], number | undefined, { state: RootState }>(
  'users/fetchUsers',
  async (page = 1, thunkAPI) => {
    const state = thunkAPI.getState()
    const limit = state?.users?.visibleUsers?.limit ?? initialState.visibleUsers.limit
    const response = await fetch(`${BASE_USERS_API}?_page=${page}&_limit=${limit}`)
    return (await response.json())
  }
)

export const fetchUserByID = createAsyncThunk<User, number, { state: RootState }>(
  'users/fetchUserByID',
  async (id = 1) => {
    const response = await fetch(`${BASE_USERS_API}/${id}`)
    return (await response.json())
  }
)

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(addUser.pending, (state) => {
      state.loading = 'pending'
    })
    builder.addCase(addUser.fulfilled, (state) => {
      state.loading = 'idle'
    })
    builder.addCase(addUser.rejected, (state) => {
      state.loading = 'failed'
    })
    builder.addCase(fetchAllUsers.pending, (state) => {
      state.loading = 'pending'
    })
    builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
      state.loading = 'idle'
      state.users = action.payload
    })
    builder.addCase(fetchAllUsers.rejected, (state) => {
      state.loading = 'failed'
    })
    builder.addCase(fetchUserByID.pending, (state) => {
      state.loading = 'pending'
    })
    builder.addCase(fetchUserByID.fulfilled, (state, action) => {
      state.loading = 'idle'
      state.users = isFinite(action.payload.id) ? [action.payload] : []
    })
    builder.addCase(fetchUserByID.rejected, (state) => {
      state.loading = 'failed'
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
