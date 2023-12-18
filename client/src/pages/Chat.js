import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useSession } from '../components/IsLoggedIn';
import { useParams } from 'react-router-dom';

const socket = io('http://localhost:3001'); // Replace with your server URL

function App() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [room, setRoom] = useState('');
  const [username, setUsername] = useState('');
  const { userData } = useSession();
  const { chatId } = useParams();


  useEffect(() => {
    const userRoom = chatId; // Prompt for a room, default to 'general'
    const userUsername = userData.username; // Prompt for a username, default to 'Guest'

    setRoom(userRoom);
    setUsername(userUsername);

    // Join the room with username
    socket.emit('join room', { room: userRoom, username: userUsername });

    // Listen for messages in the joined room
    socket.on('chat message', (message) => {
      setMessages([...messages, message]);
    });

    // Listen for chat history when joining the room
    socket.on('chat history', (history) => {
      setMessages(history);
    });

    // Clean up socket listeners when component unmounts
    return () => {
      socket.off('chat message');
      socket.off('chat history');
    };

  }, [chatId, messages, userData.username]);

  const handleSendMessage = () => {
    socket.emit('chat message', { message: newMessage, room, username });
    setNewMessage('');
  };

  return (
    <div className="p-4 border border-gray-300 rounded shadow-md w-3/4">
      <h2 className="text-lg font-semibold mb-2">Room: {room}</h2>
      <ul className="list-none p-0">
        {messages.map((msg, index) => (
          <li key={index} className="mb-2">
            <strong className="text-blue-500">{msg.username}:</strong> {msg.message}
          </li>
        ))}
      </ul>
      <div className="flex items-center mt-4">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-grow border border-gray-300 p-2 rounded-l"
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white p-2 rounded-r hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default App;
