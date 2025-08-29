import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for making API requests
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user session is still valid (i.e., not expired)
    const expirationTime = localStorage.getItem('expirationTime');
    if (expirationTime && new Date().getTime() > expirationTime) {
      // If the current time exceeds the expiration time, clear the session
      localStorage.removeItem('authenticated');
      localStorage.removeItem('expirationTime');
    }
  }, []);

  const handleLogin = async () => {
    try {
      // Send a POST request to your login API
      const response = await axios.post('https://technow-overseasbackend.vercel.app/auth/login', {
        email: username, // Assuming your API expects email instead of username
        password: password
      });

      // If login is successful, save the token and set expiration
      if (response.data.token) {
        // Set authentication token in localStorage
        localStorage.setItem('authenticated', 'true');
        localStorage.setItem('token', response.data.token);

        // Set expiration time to 24 hours from the current time
        const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000; // 24 hours
        localStorage.setItem('expirationTime', expirationTime);

        // Redirect to the admin panel
        navigate('/admin');
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      // Handle error from the API
      setError('Invalid username or password');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login</h2>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default Login;
