import React from 'react';
import './App.css';
import { createSlice, configureStore } from '@reduxjs/toolkit'
import { Provider, useDispatch, useSelector } from 'react-redux'

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

const Count = () => {
  const count = useSelector<RootState>(state => state.count.count)
  const dispatch = useDispatch()
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
