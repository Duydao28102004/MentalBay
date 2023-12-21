import React, { useEffect, useState } from 'react';
import { useSession } from '../components/IsLoggedIn';
import axios from 'axios';
import { Link } from 'react-router-dom';

const DoctorIncomingMess = () => {
  const [userChat, setUserChat] = useState([]);
  const { userData } = useSession();

  useEffect(() => {
    const fetchUserIncomingChat = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/chats/${userData.username}`);
        setUserChat(response.data.chatInfo);
      } catch (error) {
        console.error('Error fetching user incoming chat:', error);
        // Log the specific error message
        if (error.response) {
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
        }
      }
    };
  
    fetchUserIncomingChat();
  }, [userData.username]);

  return (
    <div className="max-w-md mt-10 mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">User Incoming Chat:</h2>
      {userChat.length > 0 ? (
        <ul className="list-disc pl-4">
          {userChat.map((chatEntry) => (
            <li key={chatEntry.room} className="mb-2">
              {/* Wrap the content in a Link */}
              <Link to={`/chat/${chatEntry.room}/${chatEntry.user}`} className="text-blue-500 hover:underline">
                <p className="text-lg font-semibold">User: {chatEntry.user}</p>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No incoming chats for the doctor.</p>
      )}
    </div>
  );
};

export default DoctorIncomingMess;
