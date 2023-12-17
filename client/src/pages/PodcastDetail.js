// PodcastDetail.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useCheckAuth } from '../components/checkauth';


const PodcastDetail = () => {
  const { podcastId } = useParams();
  const [podcast, setPodcast] = useState(null);
  const checkAuth = useCheckAuth();

  useEffect(() => {
    const fetchPodcastDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/getpodcast/${podcastId}`);
        setPodcast(response.data);
      } catch (error) {
        console.error('Error fetching podcast details:', error);
      }
    };

    checkAuth();
    fetchPodcastDetail();
  }, [podcastId, checkAuth]);

  if (!podcast) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4 bg-white rounded shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">{podcast.title}</h2>
      <div className="flex items-center mb-4">
        <img
          src={podcast.base64Image}
          alt={podcast.title}
          className="w-16 h-16 object-cover rounded-md mr-4"
        />
        <div>
          <strong className="text-lg">{podcast.title}</strong>
          <p className="text-gray-600">{podcast.description}</p>
        </div>
      </div>
      <p className="text-gray-700">{podcast.detail}</p>
      <p className="mt-4 text-gray-500">Topic: {podcast.topic}</p>
      <p className="text-gray-500">Link: {podcast.link}</p>
      <p className="text-gray-500">Created on: {podcast.createDate}</p>
    </div>
  );
};

export default PodcastDetail;
