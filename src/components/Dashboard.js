import React, { useState, useEffect } from 'react';
import MemoryGame from './MemoryGame';  // Import the memory game component

const Dashboard = ({ token }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('https://api.billin.space/api/user', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'App-Authorizer': '647061697361',
            'Content-Type': 'application/json',
          },
        });
        const result = await response.json();
        setUser(result);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (token) {
      fetchUserData();
    }
  }, [token]);

  return (
    <div style={styles.container}>
      <h1>Welcome to the Dashboard</h1>
      {user ? (
        <div>
          <img src={user.avatar} alt="User Avatar" style={styles.avatar} />
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Phone: {user.mobile_no}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
      <MemoryGame /> {/* Add the memory game to the dashboard */}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    textAlign: 'center',
  },
  avatar: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
  },
};

export default Dashboard;