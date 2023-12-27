import Header from '../components/Header';
import MoodTracker from '../components/MoodTracker';
import { useSession } from '../components/IsLoggedIn';
import { useCheckAuth } from '../components/checkauth';
import DoctorIncomingMess from '../components/DoctorIncomingMess';

import React, { useEffect} from 'react';
import DoctorButton from '../components/DoctorButton';
import PieChartComponent from '../components/PieChartComponent'
import ArticleComponent from '../components/ArticleComponent';
import PodcastComponent from '../components/PodcastComponent';

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
            <>
            <DoctorIncomingMess />
            <DoctorButton />
            </>
          ) : (
            <>
            <MoodTracker />
            <PieChartComponent user={userData.username} />
            
            </>
        )}
      </h2>
    </div>
    <ArticleComponent></ArticleComponent>
    <PodcastComponent></PodcastComponent>
    <div className="mt-4 flex justify-center">
      <button
      onClick={handleDeleteUserData}
      className="bg-red-500 hover:bg-red-600 mx-auto text-white font-bold py-2 px-4 rounded"
      >
        Log out!
      </button>
    </div>
    </>

  );
};

export default Home;