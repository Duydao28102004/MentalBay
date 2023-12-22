// PodcastDetail.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useCheckAuth } from '../components/checkauth';
import YoutubeComponent from '../components/YoutubeComponent';
import Header from '../components/Header';
import { Link } from 'react-router-dom';


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

  const extractYouTubeVideoId = (link) => {
    // Regular expression to match YouTube video ID
    const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    
    // Use the regular expression to extract the video ID
    const match = link.match(regex);
  
    // Return the video ID or null if not found
    return match ? match[1] : null;
  };

  if (!podcast) 
    return (
      <>
      <Header />
      <p>Loading...</p>
      </>
      
    )

  return (
    <>
    <Header />
    <div className="max-w-2xl mx-auto mt-8 p-4 bg-white rounded shadow-lg">
      <div className="flex items-center mb-4">
        <img
          src={podcast.base64Image}
          alt={podcast.title}
          className="w-16 h-16 object-cover rounded-md mr-4"
        />
        <div>
          <strong className="text-lg">{podcast.title}</strong>
          <p className="text-gray-600">{podcast.topic}</p>
          <p className="text-gray-500">Created on: {podcast.createDate}</p>
        </div>
      </div>
      <YoutubeComponent videoId={extractYouTubeVideoId(podcast.link)} />
      <div className="flex justify-between mt-8">
        <p className="text-gray-700"> <strong>Summary:</strong> {podcast.detail}</p>
      </div>
      <div className="mt-12 text-right">
        <Link to="/podcasts" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none">
          ← Back to Podcast menu
        </Link>
      </div>
    </div>
    </>
  );
};

export default PodcastDetail;
