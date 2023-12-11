import Header from '../components/Header'
import MoodTracker from '../components/MoodTracker';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
    // Fetch user data after component mounts
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/userdata'); // Replace with your actual endpoint
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);
    return (  
        <div className="home">
            <h2>
                <><h1>Hello, {userData.username}</h1></>
                <Header></Header>
                <MoodTracker></MoodTracker>
            </h2>
        </div>
    )
}

export default Home