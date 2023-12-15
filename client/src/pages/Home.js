import Header from '../components/Header';
import MoodTracker from '../components/MoodTracker';
import { useSession } from '../components/IsLoggedIn';
import React from 'react';

const Home = () => {
  const { deleteUserData } = useSession();
  const handleDeleteUserData = () => {
    deleteUserData();
  };
  return (  
        <><div className="home">
      <h2>
        <Header></Header>
        <MoodTracker></MoodTracker>
      </h2>
    </div><div>
        <button onClick={handleDeleteUserData}>Delete User Data</button>
      </div></>
  )
}

export default Home