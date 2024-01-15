import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useSession } from '../components/IsLoggedIn';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { updateUserData } = useSession();

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
      updateUserData(response.data.user);
      navigate('/');
    } catch (error) {
      console.error('Error making API request:', error.response.data);
      if (error.response.status === 401) {
        // Unauthorized (wrong username or password)
        setError(error.response.data.error);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    console.log('Username:', username);
    console.log('Password:', password);
    sendApiRequest();
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded shadow-md w-full md:w-2/5">
        <h1 className="text-pink-500 text-center text-3xl m-0 mb-20">Mental Bay</h1>
        
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
          <div className=" mb-4">
            <span>Do not have an account? </span>
            <Link to='/register' className='text-blue-500 hover:text-blue-600'>Register here!</Link>
          </div>
          {error && (
          <div className="mb-4 text-red-500">
            <p>{error}</p>
          </div>
          )}
          <div className="text-center mt-10">
            <button
              className="bg-blue-500 text-white px-5 py-2 w-full rounded hover:bg-blue-600 focus:outline-none"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
