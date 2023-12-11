// Register.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');
  const [userTopic, setUserTopic] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };
  const handleUserTopicChange = (e) => {
    setUserTopic(e.target.value);
  };

  const sendApiRequest = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/register', {
        username: username,
        password: password,
        userType: userType,
      });
  
      console.log('API Response:', response.data);
      // Redirect to the login page after successful registration
      navigate('/login');
    } catch (error) {
      console.error('Error making API request:', error.response.data);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('userType:', userType);
    console.log('userTopic:', userTopic);
    sendApiRequest();
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6">Register</h2>
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
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">User Type:</label>
            <select
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
            value={userType}
            onChange={handleUserTypeChange}
            >
                <option value="" disabled selected>
                --- Select your role ---
                </option>
                <option value="doctor">Doctor</option>
                <option value="user">User</option>
           </select>
          </div>
          {userType === 'user' && (
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">User Topic:</label>
              <select
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                value={userTopic}
                onChange={handleUserTopicChange}
              >
                <option value="" disabled selected>
                  --- Select your topic ---
                </option>
                <option value="depression">Appetite, sleep disturbances, and fatigue.</option>
                <option value="anxietydisorders">Excessive worry, fear, and avoidance behaviors.</option>
                <option value="bipolardisorders">Mood swings, ranging from manic to depressive episodes.</option>
                <option value="ocd">Persistent, repetitive behaviors or mental acts (compulsions).</option>
              </select>
            </div>
          )}
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
            type="submit"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
