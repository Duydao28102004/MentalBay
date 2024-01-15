import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');
  const [userTopic, setUserTopic] = useState('');
  const [error, setError] = useState(null);
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
        userTopic: userTopic,
      });

      console.log('API Response:', response.data);
      // Redirect to the login page after successful registration
      navigate('/login');
    } catch (error) {
      console.error('Error making API request:', error.response.data);

      if (error.response.status) {
        setError('Username already exists. Please choose a different username.');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('userType:', userType);
    console.log('userTopic:', userTopic);
    sendApiRequest();
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded shadow-md w-full md:w-2/5">
        <h1 className="text-pink-500 text-center text-4xl m-0 mb-20">Mental Bay</h1> 
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Username:</label>
            <input
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500 mb-12"
              type="text"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Password:</label>
            <input
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500 mb-12"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">User Type:</label>
            <select
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500 mb-12"
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
              <label className="block text-sm font-semibold mb-2">What is your concern?</label>
              <select
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500 mb-12"
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
          {userType === 'doctor' && (
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Major:</label>
              <select
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500 mb-12"
                value={userTopic}
                onChange={handleUserTopicChange}
              >
                <option value="" disabled selected>
                  --- Select your major ---
                </option>
                <option value="depression">depression</option>
                <option value="anxietydisorders">anxietydisorders</option>
                <option value="bipolardisorders">bipolardisorders</option>
                <option value="ocd">ocd</option>
              </select>
            </div>
          )}
          <div className=" mb-4">
            <span>Already have an account? </span>
            <Link to='/login' className='text-blue-500 hover:text-blue-600'>Login here!</Link>
          </div>
          {error && (
          <div className="mb-4 text-red-500">
            <p>{error}</p>
          </div>
          )}
          <div className="text-center mt-10">
            <button
              className="bg-green-500 text-white px-5 py-2 w-full rounded hover:bg-green-600 focus:outline-none"
              type="submit"
            >
              Register!
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
