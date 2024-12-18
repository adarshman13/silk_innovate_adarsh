import React, { useState } from 'react';
import Dashboard from './components/Dashboard';

const App = () => {
  const [token, setToken] = useState('mock_token');  // Set a mock token directly

  return (
    <div>
      {token ? (
        <Dashboard token={token} />
      ) : (
        <h1>Login Page (Bypass)</h1>  // You can customize this to show the login if needed
      )}
    </div>
  );
};

export default App;
