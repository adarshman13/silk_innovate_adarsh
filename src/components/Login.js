import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const validateInput = () => {
    const phoneRegex = /^(980|981|982|984|985|986)\d{7}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!phoneRegex.test(emailOrPhone) && !emailRegex.test(emailOrPhone)) {
      setError('Enter a valid email or Nepali phone number');
      return false;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInput()) return;
    
    try {
      const response = await fetch('https://api.billin.space/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'App-Authorizer': '647061697361',
            'Accept': 'application/json', 
            'Origin': 'https://silk.billin.space'
        },
        body: JSON.stringify({
          mobile_no: emailOrPhone,
          password,
          fcm_token: 'no_fcm',
        }),
      });

      const result = await response.json();

      // Log the response and the result
      console.log('API Response:', response);
      console.log('API Result:', result);

      if (response.ok) {
        onLogin(result.access_token);
      } else {
        setError(result.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
      console.error('Error:', err);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Login</h1>
      {error && <p style={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Email or Phone"
            value={emailOrPhone}
            onChange={(e) => setEmailOrPhone(e.target.value)}
            style={styles.input}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    width: '300px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '4px',
  },
  input: {
    width: '100%',
    padding: '8px',
    margin: '10px 0',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    fontSize: '14px',
  },
};

export default Login;
