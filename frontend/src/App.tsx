import React from 'react'
import './App.css'
import { Provider } from 'react-redux'
import { Users } from './components/Users'
import { store } from './redux/store'
import { AddUser } from './components/AddUser'
import { css } from '@emotion/css'
import styled from '@emotion/styled'


const TitleText = styled.span`
font-size: 24px;
`

function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <header className="header">
          <TitleText>Test</TitleText> <TitleText className={css`font-weight: bold`}>Beetrack</TitleText>
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
