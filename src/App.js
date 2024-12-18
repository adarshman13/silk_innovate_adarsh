import React, { useState } from 'react';
import Login from './components/Login.js';

const App = () => {
  const [token, setToken] = useState(null);

  return (
    <div>
      {!token ? (
        <Login onLogin={(token) => setToken(token)} />
      ) : (
        <h1>Welcome to the Dashboard</h1>
      )}
    </div>
  );
};

export default App;
