import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import io from 'socket.io-client';
import { useSession } from '../components/IsLoggedIn';
import { useParams, Link } from 'react-router-dom';
import PieChartComponent from '../components/PieChartComponent';

const socket = io('http://localhost:3001'); // Replace with your server URL

function App() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [room, setRoom] = useState('');
  const [username, setUsername] = useState('');
  const { userData } = useSession();
  const { chatId, user } = useParams();
  const messageContainerRef = useRef(null);

  useEffect(() => {
    const userRoom = chatId;
    const userUsername = userData.username;

    setRoom(userRoom);
    setUsername(userUsername);

    socket.emit('join room', { room: userRoom, username: userUsername });

    socket.on('chat message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on('chat history', (history) => {
      setMessages(history);
    });

    return () => {
      socket.off('chat message');
      socket.off('chat history');
    };
  }, [chatId, userData.username]);

  useLayoutEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      socket.emit('chat message', { message: newMessage, room, username });
      setNewMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen">
      
      <div className=" mt-20 flex items-center justify-center">
        <div className="p-4 border border-gray-300 rounded shadow-md w-3/4">
          <h2 className="text-lg font-semibold mb-2">Room: {room}</h2>
          <p className="text-md font-semibold mb-2">Current User: {username}</p>
          <ul className="list-none p-0 max-h-72 overflow-y-auto" ref={messageContainerRef}>
            {messages.map((msg, index) => (
              <li
                key={index}
                className={`mb-2 ${
                  msg.username === userData.username ? 'text-right' : 'text-left'
                }`}
              >
                {msg.username !== userData.username && (
                  <strong className="text-blue-500">{msg.username}:</strong>
                )}
                {msg.message}
              </li>
            ))}
          </ul>
          <div className="flex items-center mt-4">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
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
      </div>
      {userData.userType !== 'user' && <PieChartComponent user={user} />}
      <Link
        to="/"
        className="block w-96 mx-auto mt-4 bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
      >
        &lt;----- Back to Main Menu
      </Link>
    </div>
  );
}

export default App;
