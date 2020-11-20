import React from 'react';
import './App.css';
import { createSlice, configureStore } from '@reduxjs/toolkit'
import { createSelectorHook, Provider, useDispatch } from 'react-redux'

type SliceState = {
  count: number,
}

const counterSlice = createSlice({
  name: 'counter',
  initialState: { count: 0 } as SliceState,
  reducers: {
    increment: state => ({...state, count: state.count + 1}),
    decrement: state => ({...state, count: state.count - 1}),
  }
})

const store = configureStore({
  reducer: {
    count: counterSlice.reducer,
  } 
})

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useTypedSelector = createSelectorHook<RootState>();

const Count = () => {
  const count = useTypedSelector(state => state.count.count)
  const dispatch = useAppDispatch()
  const { increment, decrement } = counterSlice.actions
  return (
    <div>
      <button onClick={() => dispatch(increment())}>+</button>
      <p>
        COUNT: {count}
      </p>
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  )
}

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <Count />
        </header>
      </div>
    </Provider>
  );
}

export default App;
