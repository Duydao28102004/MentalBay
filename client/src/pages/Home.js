import Header from '../components/Header';
import MoodTracker from '../components/MoodTracker';
import { useSession } from '../components/IsLoggedIn';
import { useCheckAuth } from '../components/checkauth';

import React, { useEffect} from 'react';
import DoctorButton from '../components/DoctorButton';

const Home = () => {
  const { deleteUserData , userData} = useSession();
  
  const handleDeleteUserData = () => {
    deleteUserData();
  };

  const checkAuth = useCheckAuth();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (  
    <><div className="home">
      <h2>
        <Header></Header>
        {userData.userType === 'doctor' ? (
            <DoctorButton />
          ) : (
            <MoodTracker />
        )}
      </h2>
    </div>
    <div>
      <button onClick={handleDeleteUserData}>Delete User Data</button>
    </div></>
  );
};

export default Home