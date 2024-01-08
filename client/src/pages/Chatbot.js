import sendBtn from '../assets/send.svg';
import userIcon from '../assets/user-icon.png';
import { useEffect, useRef, useState } from 'react';
import { sendUserQuestion } from '../components/openai';
import Header from '../components/Header';
import { useCheckAuth } from '../components/checkauth';
import { Link } from 'react-router-dom';

function App() {
  const msgEnd = useRef(null);

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      text: 'Hi, I am your Mental Health Chatbot Assistant.',
      isBot: true,
    },
  ]);

  const checkAuth = useCheckAuth();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    msgEnd.current.scrollIntoView();
  }, [messages]);

  const handleSend = async () => {
    const text = input;
    setInput('');
    setMessages([
      ...messages,
      { text, isBot: false },
    ]);
    const res = await sendUserQuestion(text);
    setMessages([
      ...messages,
      { text, isBot: false },
      { text: res, isBot: true },
    ]);
  };

  const handleEnter = async (e) => {
    if (e.key === 'Enter') await handleSend();
  };

  const handleQuery = async (e) => {
    const text = e.target.value;
    setMessages([
      ...messages,
      { text, isBot: false },
    ]);
    const res = await sendUserQuestion(text);
    setMessages([
      ...messages,
      { text, isBot: false },
      { text: res, isBot: true },
    ]);
  };

  return (
    <>
      <Header />
      <div className="flex h-screen justify-center">
        <div className="mt-10 w-3/4 flex bg-white rounded-md shadow-md">
          <div className="w-1/4 m-5 bg-gray-200 p-4">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold">MentalBay Assistant</span>
              </div>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded"
                onClick={() => window.location.reload()}
              >
                New Chat
              </button>
              <div className="space-y-2">
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 w-full py-2 px-4 rounded"
                  onClick={handleQuery}
                  value={'What is mental health ?'}
                >
                  What is mental health?
                </button>
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 w-full py-2 px-4 rounded"
                  onClick={handleQuery}
                  value={'How to maintain good mental health state ?'}
                >
                  How to maintain good mental health state?
                </button>
              </div>
            </div>
          </div>
          <div className="w-3/4 p-4">
            <div className="chats overflow-y-auto h-4/5">
              {messages.map((message, i) => (
                <div
                  key={i}
                  className={`flex items-center ${
                    message.isBot ? 'justify-start' : 'justify-end'
                  }`}
                >
                  {message.isBot ? null : (
                    <img
                      className="w-8 h-8 rounded-full mr-2"
                      src={userIcon}
                      alt=""
                    />
                  )}
                  <p
                    className={`py-2 px-4 rounded-lg ${
                      message.isBot ? 'bg-blue-500 text-white w-1/2 my-5' : 'bg-gray-300 my-5'
                    }`}
                  >
                    {message.text}
                  </p>
                </div>
              ))}
              <div ref={msgEnd} />
            </div>
            <div className="chatFooter mt-4">
              <div className="flex items-center">
                <input
                  className="flex-1 mr-2 py-2 px-4 rounded-lg border border-gray-300"
                  type="text"
                  placeholder="Send a message"
                  value={input}
                  onKeyDown={handleEnter}
                  onChange={(e) => setInput(e.target.value)}
                />
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg"
                  onClick={handleSend}
                >
                  <img src={sendBtn} alt="Send" className="w-4 h-4" />
                </button>
              </div>
              <div className="mt-12 text-right">
                <Link to="/" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none">
                  ← Back to homepage
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
