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
  }, []);

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
    <div>
      <h2>Chat with Doctors</h2>
      <ul>
        {doctors.map((doctor) => (
          <li key={doctor._id}>
            <button onClick={() => handleChatRoomCreation(doctor.username, userData.username)}>
              Chat with {doctor.username}
            </button>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
};

export default ChatDoctorList;
