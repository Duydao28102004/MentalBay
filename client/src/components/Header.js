import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSession } from '../components/IsLoggedIn';

const Header = () => {
  const { userData, deleteUserData } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleDeleteUserData = () => {
    deleteUserData();
  };
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className={`mt-2 ${userData && Object.keys(userData).length === 0 ? 'hidden' : ''}`}>
      <nav className="text-white p-4 text-center flex justify-between items-center w-full md:w-3/4 mx-auto relative">
        <Link to={'/'}>
          <h1 className="text-pink-500 m-0 font-serif text-3xl">MentalBay</h1>
        </Link>
        <div className="text-black no-underline mr-4">
          {/* Hamburger menu icon for mobile */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-black focus:outline-none">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>

            {/* Dropdown menu */}
            {menuOpen && (
              <div className="absolute w-3/4 top-full left-0 mx-auto mt-2 p-2 bg-white rounded-md shadow-md">
                <Link to={'/podcasts'} onClick={toggleMenu}>
                  <a className="block py-2 text-2xl" href="/">
                    Podcast
                  </a>
                </Link>
                <Link to={'/articles'} onClick={toggleMenu}>
                  <a className="block py-2 text-2xl" href="/">
                    Article
                  </a>
                </Link>
                {userData.userType !== 'doctor' && (
                  <>
                    <Link to={'/chatlist'} onClick={toggleMenu}>
                      <a className="block py-2 text-2xl" href="/">
                        Messages
                      </a>
                    </Link>
                    <Link to={'/chatbot'} onClick={toggleMenu}>
                      <a className="block py-2 text-2xl" href="/contact">
                        Chatbot
                      </a>
                    </Link>
                  </>
                )}
                <button onClick={handleDeleteUserData} className="block py-2 text-white bg-red-500 mt-2 px-2 rounded-md">
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Navigation links for larger screens */}
          <div className={`text-black hidden md:flex md:items-center`}>
            <Link to={'/podcasts'}>
              <a className="mx-4 text-xl" href="/">
                Podcast
              </a>
            </Link>
            <Link to={'/articles'}>
              <a className="mx-4 text-xl" href="/">
                Article
              </a>
            </Link>
            {userData.userType !== 'doctor' && (
              <>
                <Link to={'/chatlist'}>
                  <a className="mx-4 text-xl" href="/">
                    Messages
                  </a>
                </Link>
                <Link to={'/chatbot'}>
                  <a className="mx-4 text-xl" href="/contact">
                    Chatbot
                  </a>
                </Link>
              </>
            )}
            <button onClick={handleDeleteUserData} className=" ml-2 py-4 px-8 text-white text-xl bg-red-500 rounded-md">
              Logout
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
