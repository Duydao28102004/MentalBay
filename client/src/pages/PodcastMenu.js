// PodcastMenu.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useSession } from '../components/IsLoggedIn';
import { useCheckAuth } from '../components/checkauth';


const PodcastMenu = () => {
  const [podcasts, setPodcasts] = useState([]);
  const { userData } = useSession();
  const checkAuth = useCheckAuth();

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        if (userData.userType === 'doctor') {
          const response = await axios.get('http://localhost:3001/api/podcast');
          setPodcasts(response.data);
        } else {
          const response = await axios.get(`http://localhost:3001/api/podcast/${userData.userTopic}`);
          setPodcasts(response.data);
        }
      } catch (error) {
        console.error('Error fetching podcasts:', error);
      }
      
    };

    checkAuth();
    fetchPodcasts();
  }, [checkAuth, userData]);

  return (
    <>
      <div className="w-3/5 mx-auto mt-8 p-4">
        <h2 className="text-2xl font-semibold mb-4">Podcast Menu</h2>
        <ul>
          {podcasts.map((podcast) => (
            <div key={podcast._id} className='flex mb-10'>
              <div className="flex flex-col bg-gray-100 px-4 py-4 rounded">
                <img
                  src={podcast.base64Image}
                  alt={podcast.title}
                  className="w-full"
                />
                <h1 className='text-3xl font-serif mt-10'>{podcast.title}</h1>
                <div>
                  <p className="text-gray-500">
                    Topic: {podcast.topic === 'anxietydisorders' ? 'Anxiety Disorders' :
                      podcast.topic === 'bipolardisorders' ? 'Bipolar Disorders' :
                        podcast.topic === 'ocd' ? 'Obsessive-Compulsive Disorder' :
                          podcast.topic === 'depression' ? 'Depression' :
                            podcast.topic}
                    <span className='ml-12'>Created date: {podcast.createDate}</span>
                  </p>
                  <p className="my-4">{podcast.detail.substring(0, 400)}{podcast.detail.length > 400 ? "..." : ""}</p>
                </div>
                <Link to={`/podcasts/detail/${podcast._id}`}>
                  <button className="px-4 py-2 bg-blue-300 text-white rounded-md hover:bg-blue-400">
                    Read More
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
};

export default PodcastMenu;
