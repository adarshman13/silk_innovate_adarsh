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
      <div style={styles.loginForm}>
        <h2 style={styles.title}>Login</h2>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputContainer}>
            <input
              type="text"
              placeholder="Email or Phone"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
              style={styles.input}
            />
          </div>
          <div style={styles.inputContainer}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
          </div>
          <div style={styles.buttonContainer}>
            <button type="submit" style={styles.button}>
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#000',  // Black background
    color: '#fff',  // White text
    fontFamily: 'Arial, sans-serif',
  },
  loginForm: {
    backgroundColor: '#222', // Dark form background
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    textAlign: 'center',
    width: '100%',
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxSizing: 'border-box', // Ensure padding is included in width calculation
  },
  title: {
    fontSize: '28px',
    marginBottom: '20px',
    color: '#fff',
    fontWeight: '600',  // Make the title bold
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    display: 'flex',
    marginBottom: '15px',
    width: '100%',
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #444',
    borderRadius: '4px',
    backgroundColor: '#333',  // Dark input background
    color: '#fff',  // White text in the input field
    fontSize: '16px',
    textAlign: 'center',  // Center the input text
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    width: '100%',
    padding: '12px',
    border: 'none',
    backgroundColor: '#007bff', // Button color
    color: '#fff',  // White text
    fontSize: '18px',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    marginTop: '10px',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
  error: {
    color: '#ff4d4d',
    marginBottom: '15px',
    fontSize: '14px',
    textAlign: 'center',
  },
};

export default Login;
