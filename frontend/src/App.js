import React from 'react';
import './styles/global.css';

import Routes from './routes'

import UserProvider from './context/context';

function App() {
  return (
    <UserProvider>
        <Routes />
    </UserProvider>
  );
}

export default App;
