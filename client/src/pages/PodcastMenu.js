// PodcastMenu.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
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
    <Header></Header>
    <div className="max-w-xl mx-auto mt-8 p-4 bg-white rounded shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Podcast Menu</h2>
      <ul>
        {podcasts.map((podcast) => (
          <li key={podcast._id} className="mb-4 p-4 bg-gray-100 rounded-md">
            <Link to={`/podcasts/detail/${podcast._id}`} className="flex items-center">
              <img
                src={podcast.base64Image}
                alt={podcast.title}
                className="w-12 h-12 object-cover rounded-md mr-4"
              />
              <div>
                <strong className="text-lg">{podcast.title}</strong>
                <p className="text-gray-600">Topic: {podcast.topic}</p>
                <p className="text-gray-600">Description: {podcast.description}</p>
                <p className="text-gray-600">{podcast.createDate}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
};

export default PodcastMenu;
