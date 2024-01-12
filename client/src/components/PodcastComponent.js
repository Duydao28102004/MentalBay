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

    const displayedPodcasts = podcasts.slice(0, 4);

    return (
        <div className='p-4 text-center block justify-between items-center w-3/4 mx-auto mt-10 bg-white rounded-md shadow-md'>
            <h2 className="text-2xl font-bold mb-4">Recent podcasts</h2>
            <div className="flex flex-wrap gap-4">
                {displayedPodcasts.map((podcast) => (
                    <div key={podcast._id} className="w-full md:w-1/2 lg:w-1/5 mx-auto mb-4 p-4 bg-gray-100 rounded-md">
                        <Link to={`/podcasts/detail/${podcast._id}`} className="items-center">
                            <img
                                src={podcast.base64Image}
                                alt={podcast.title}
                                className="w-400 h-400 object-cover rounded-md mr-4"
                            />
                            <div>
                                <strong className="text-lg">{podcast.title}</strong>
                                <p className="text-gray-600">{podcast.topic}</p>
                                <p className="text-gray-600">{podcast.createDate}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>

    );
};

export default PodcastComponent;