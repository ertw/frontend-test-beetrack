import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from './store'

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
    limit: 5,
  },
}

const addUser = createAsyncThunk<UsersSlice["users"], Omit<User, "id"> | undefined, { state: RootState }>(
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
    return (response.json())
  }
)

const fetchAllUsers = createAsyncThunk<UsersSlice["users"], number | undefined, { state: RootState }>(
  'users/fetchUsers',
  async (page = 1, thunkAPI) => {
    const state = thunkAPI.getState()
    const limit = state?.users?.visibleUsers?.limit ?? initialState.visibleUsers.limit
    const response = await fetch(`${BASE_USERS_API}?_page=${page}&_limit=${limit}`)
    return (response.json())
  }
)

const fetchUserByID = createAsyncThunk<User, number, { state: RootState }>(
  'users/fetchUserByID',
  async (id = 1, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_USERS_API}/${id}`)
      if (response.status !== 200) {
        throw new Error(response.statusText)
      }
      return (response.json())
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
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
      state.users = [action.payload]
    })
    builder.addCase(fetchUserByID.rejected, (state) => {
      state.loading = 'failed'
    })
  }
})

export const actions = {
  addUser,
  fetchAllUsers,
  fetchUserByID,
}
