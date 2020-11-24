import { createSlice } from '@reduxjs/toolkit'

export const modalsSlice = createSlice({
  name: 'modals',
  initialState: { addUserModal: false },
  reducers: {
    toggleAddUserModal: (state) => { state.addUserModal = !state.addUserModal }
  },
})
