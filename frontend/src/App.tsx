import React from 'react'
import './App.css'
import { Provider } from 'react-redux'
import { Users } from './components/Users'
import { store } from './redux/store'
import { AddUser } from './components/AddUser'
import { css } from '@emotion/css'

function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <header className="header">
          Test Beetrack
        </header>
        <main className="main">
          <div className={css`
            display: flex;
            justify-content: space-between;
          `}>
            <AddUser />
          </div>
          <Users />
        </main>
      </div>
    </Provider>
  )
}

export default App
