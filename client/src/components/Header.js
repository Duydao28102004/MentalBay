import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSession } from '../components/IsLoggedIn';

const Header = () => {
  const { userData } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="mt-2">
      <nav className="text-white p-4 text-center flex justify-between items-center w-3/4 mx-auto bg-white rounded-md shadow-md relative">
        <Link to={'/'}>
          <h1 className="text-pink-500 m-0">MentalBay</h1>
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
              <div className="absolute top-full left-0 mt-2 p-2 bg-white rounded-md shadow-md">
                <Link to={'/podcasts'} onClick={toggleMenu}>
                  <a className="block py-2" href="/">
                    Podcast
                  </a>
                </Link>
                <Link to={'/articles'} onClick={toggleMenu}>
                  <a className="block py-2" href="/">
                    Article
                  </a>
                </Link>
                {userData.userType !== 'doctor' && (
                  <>
                    <Link to={'/chatlist'} onClick={toggleMenu}>
                      <a className="block py-2" href="/">
                        Messages
                      </a>
                    </Link>
                    <Link to={'/chatbot'} onClick={toggleMenu}>
                      <a className="block py-2" href="/contact">
                        Chatbot
                      </a>
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Navigation links for larger screens */}
          <div className={`text-black hidden md:flex md:items-center`}>
            <Link to={'/podcasts'}>
              <a className="mx-4" href="/">
                Podcast
              </a>
            </Link>
            <Link to={'/articles'}>
              <a className="mx-4" href="/">
                Article
              </a>
            </Link>
            {userData.userType !== 'doctor' && (
              <>
                <Link to={'/chatlist'}>
                  <a className="mx-4" href="/">
                    Messages
                  </a>
                </Link>
                <Link to={'/chatbot'}>
                  <a className="mx-4" href="/contact">
                    Chatbot
                  </a>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
