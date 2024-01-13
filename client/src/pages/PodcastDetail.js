// PodcastDetail.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useCheckAuth } from '../components/checkauth';
import YoutubeComponent from '../components/YoutubeComponent';
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
      <p>Loading...</p>
      </>
      
    )

  return (
    <>
    <div className="w-3/4 mx-auto mt-8 p-4 bg-white rounded shadow-lg">
    
      <div className="flex flex-row">
        <YoutubeComponent videoId={extractYouTubeVideoId(podcast.link)} />
        <div className=" justify-between mt-8 ml-6">
          <div className='mb-6'>
          <strong className="text-lg">{podcast.title}</strong>
          <p className="text-gray-600">Topic: {podcast.topic}
          <span className="text-gray-500 ml-12">Created on: {podcast.createDate}</span></p>
          </div>
          <p className="text-gray-700"> <strong>Summary:</strong> {podcast.detail}</p>
        </div>
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
