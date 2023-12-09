// Login.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const sendApiRequest = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/login', {
        username: username,
        password: password,
      });
  
      console.log('API Response:', response.data);
      navigate('/');
    } catch (error) {
      console.error('Error making API request:', error.response.data);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Username:', username);
    console.log('Password:', password);
    sendApiRequest();
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Username:</label>
            <input
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              type="text"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Password:</label>
            <input
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
