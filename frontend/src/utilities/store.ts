import { configureStore } from '@reduxjs/toolkit'
import { createSelectorHook, useDispatch } from 'react-redux'
import { modalsSlice } from './modalsSlice'
import { actions as userSliceActions, usersSlice } from './usersSlice'

export const store = configureStore({
  reducer: {
    users: usersSlice.reducer,
    modals: modalsSlice.reducer,
  }
})

export const actions = {
  ...userSliceActions,
  ...modalsSlice.actions,
}

export type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useTypedSelector = createSelectorHook<RootState>();
