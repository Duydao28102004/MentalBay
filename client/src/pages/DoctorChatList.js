// ChatDoctorList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../components/IsLoggedIn';

const ChatDoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const { userData } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (userData.userType === 'doctor') {
      navigate('/');
    }
    // Fetch the list of doctors from your server
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/doctors');
        setDoctors(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, [navigate, userData.userType]);

  const handleChatRoomCreation = async (doctorname, username) => {
    try {
      console.log(doctorname,username);
        
      // Call the API to create a chat room
      const response = await axios.post('http://localhost:3001/api/create-chat-room', {
        doctorname,
        username,
      });
      console.log(response.data);
      const chatname = response.data;
      navigate(`/chat/${chatname.room}`);
    } catch (error) {
      console.error('Error creating chat room:', error);
    }
  };

  return (
    <>
      <Header></Header>
      <div className="flex items-center justify-center ">
        <div className="p-4 w-3/4">
          <h2 className="text-2xl font-bold mb-4">Chat with Doctors</h2>
          <ul className="space-y-4">
            {doctors.map((doctor) => (
              <li key={doctor._id} className="flex items-center justify-between bg-white rounded p-4 shadow-md">
                <span className="text-lg font-semibold">{doctor.username} - {doctor.userTopic}</span>
                <button
                  onClick={() => handleChatRoomCreation(doctor.username, userData.username)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                >
                  Chat
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
  
};

export default ChatDoctorList;
