import React from 'react'
import './App.css'
import { Provider } from 'react-redux'
import { Users } from './components/Users'
import { store } from './utilities/store'
import { AddUser, AddUserButton } from './components/AddUser'
import { SearchUser } from './components/GetUser'

const styles: { [key: string]: React.CSSProperties } = {
  searchAndAddContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}

function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <header className="header">
          Test Beetrack
        </header>
        <main className="main">
          <div className="searchAndAddContainer" style={styles.searchAndAddContainer}>
            <SearchUser />
            <AddUserButton />
            <AddUser />
          </div>
          <Users />
        </main>
      </div>
    </Provider>
  )
}

export default App
