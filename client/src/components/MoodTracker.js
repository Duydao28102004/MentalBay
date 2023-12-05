import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MoodTracker = () => {
  const [mood, setMood] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [advice, setAdvice] = useState('');
  

  useEffect(() => {
    const hasSubmittedToday = localStorage.getItem('hasSubmittedToday');
    if (hasSubmittedToday) {
      setSubmitted(true);
    }
  }, []);

  const sendApiRequest = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/mood', {
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
        setAdvice('Please select a mood to receive advice.');
    }
    console.log(`User feels: ${mood}`);
    console.log(`Advice: ${advice}`);
    setSubmitted(true);
    sendApiRequest();
  };

  return (
    <div className='p-4 text-center block justify-between items-center w-3/4 mx-auto mt-10 bg-white rounded-md shadow-md'>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Welcome back, username!</h2>
      <div className="mb-4">
        <h2 className="text-lg font-medium text-gray-700 mb-2">How do you feel today?</h2>
        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex items-center justify-center">
            <label className="mr-2">Select your mood:</label>
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
              className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
        ) : (
          <div>
            <p className="text-green-600">Thank you for sharing your mood!</p>
            <p className="text-lg mt-4">{advice}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoodTracker;
