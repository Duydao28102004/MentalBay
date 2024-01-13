import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from './IsLoggedIn';

const MoodTracker = () => {
  const [mood, setMood] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [advice, setAdvice] = useState('');
  const { userData } = useSession();
  

  useEffect(() => {
    const fetchMood = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/gettodaymood/${userData.userId}`);
        console.log("API respone: " + response);
        const todayMood = response.data;
        if (!todayMood) {
          return;
        } else {
          setMood(todayMood.Mood);
          setAdviceByMood(mood);
          setSubmitted(true);
        }
      } catch (error) {
        console.error('Error fetching mood:', error);
      }
    };
  
    fetchMood(); // Call the async function inside useEffect
  }, [mood, userData]);
  
  const setAdviceByMood = (mood) => {
    switch (mood) {
      case 'happy':
        setAdvice('Great to hear that you are feeling happy! Enjoy your day!');
        break;
      case 'sad':
        setAdvice('Im sorry to hear that you are feeling sad. Reach out to friends or family for support.');
        break;
      case 'excited':
        setAdvice('Awesome! Embrace the excitement and make the most of your day!');
        break;
      case 'calm':
        setAdvice('Feeling calm is wonderful. Take a moment to relax and enjoy tranquility.');
        break;
      default:
        setAdvice('You have submitted today mood.');
    }
  }

  const sendApiRequest = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/mood', {
        userId: userData.userId,
        mood: mood,
      });
  
      console.log('API Response:', response.data);
    } catch (error) {
      console.error('Error making API request:', error);
    }
  };
  
  const handleInputChange = (e) => {
    setMood(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAdviceByMood(mood);
    console.log(`User feels: ${mood}`);
    console.log(`Advice: ${advice}`);
    setSubmitted(true);
    sendApiRequest();
  };

  return (
    <div className='p-4 text-center block justify-between items-center w-full mx-auto mt-10 mb-10'>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Welcome back, {userData.username}!</h2>
      <div className="mb-4">
        <h2 className="text-2xl font-medium text-gray-700 mb-2">How do you feel <span className='text-green-500'>today</span>?</h2>
        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex items-center justify-center">
            <label className="mr-2 text-2xl">Select your mood:</label>
            <select
              value={mood}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select...</option>
              <option value="happy">Happy</option>
              <option value="sad">Sad</option>
              <option value="excited">Excited</option>
              <option value="calm">Calm</option>
            </select>
            <button
              type="submit"
              className="ml-2 px-4 py-2 bg-green-200 text-white rounded-md hover:bg-green-500"
            >
              Submit
            </button>
          </form>
        ) : (
          <div>
            <p className="text-green-600 text-2xl">Thank you for sharing your mood!</p>
            <p className="mt-4 text-2xl">{advice}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoodTracker;
