
import PodcastForm from '../components/PodcastForm';
import React, { useEffect} from 'react';
import { useCheckAuth } from '../components/checkauth';


const CreatePodcast = () => {

  const checkAuth = useCheckAuth();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  
  return (  
    <div className="home">
      <h2>
        <PodcastForm></PodcastForm>
      </h2>
    </div>
  )
}

export default CreatePodcast;