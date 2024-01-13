import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCheckAuth } from './checkauth';
import { useSession } from './IsLoggedIn';
import axios from 'axios';

const PodcastComponent = () => {
    const [podcasts, setPodcasts] = useState([]);
    const { userData } = useSession();
    const checkAuth = useCheckAuth();

    useEffect(() => {
        // Fetch podcasts from the server
        const fetchPodcasts = async () => {
            try {
                let response;
                if (userData.userType === 'doctor') {
                    response = await axios.get('http://localhost:3001/api/podcast');
                } else {
                    response = await axios.get(`http://localhost:3001/api/podcast/${userData.userTopic}`);
                }
                setPodcasts(response.data);
            } catch (error) {
                console.error('Error fetching podcasts:', error);
            }
        };
        checkAuth();
        fetchPodcasts();
    }, [checkAuth, userData]);

    const displayedPodcasts = userData.userType === 'doctor' ? podcasts.slice(0, 4) : podcasts.slice(0, 1);

    return (
        <><div className="mb-10">
            <h1 className="text-4xl text-center font-bold mb-10">Podcasts</h1>
            <div className="flex flex-col">
                {displayedPodcasts.map((podcast) => (
                    <>
                    <div className='flex flex-row my-10'>
                      <div className='w-1/2'>
                          <h2 className="text-3xl font-bold mb-4">{podcast.title}</h2>
                          <p className="mb-4">{podcast.createDate}</p>
                          <p className="mb-4">{podcast.detail.substring(0, 400)}{podcast.detail.length > 400 ? "..." : ""}</p>
                          {/* Add more text as needed */}
                          <Link to={`/podcasts/detail/${podcast._id}`} className="items-center">
                              <button className="px-4 py-2 bg-green-300 text-white rounded-md hover:bg-green-400">
                                Read More
                              </button>
                          </Link>
                      </div>
                      <img src={podcast.base64Image}  alt={podcast.title}className="w-full md:w-1/2 h-auto md:ml-8 mb-4 md:mb-0"/>
                    </div>
                        
                    </>
                ))}
            </div>
        </div></>
    );
};

export default PodcastComponent;