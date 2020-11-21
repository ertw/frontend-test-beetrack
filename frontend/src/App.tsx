import React from 'react';
import './App.css';
import { Provider } from 'react-redux'
import { Users } from './components/Users';
import { store } from './utilities/store';

function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <header className="header">
          Test Beetrack
        </header>
        <main className="main">
          <input type="text" placeholder="Buscar contacto" />
          <button className="addUser">+ Nuevo Contacto</button>
          <Users />
          <button className="nextPage">Siguiente Página</button>
        </main>
      </div>
    </Provider>
  );
}

export default App;
