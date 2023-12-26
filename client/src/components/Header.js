import React from 'react';
import { Link } from 'react-router-dom';
import { useSession } from '../components/IsLoggedIn';

const Header = () => {
  const { userData } = useSession();

  return (
    <header className="mt-2">
      <nav className="text-white p-4 text-center flex justify-between items-center w-3/4 mx-auto bg-white rounded-md shadow-md">
        <Link to={'/'}>
          <h1 className="text-pink-500 m-0">MentalBay</h1>
        </Link>
        <div className="text-black no-underline mr-4">
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
            <><Link to={'/chatlist'}>
              <a className="mx-4" href="/">
                Messages
              </a>
            </Link>
            <Link to={'/chatbot'}>
              <a className="mx-4" href="/contact">
                Chatbot
              </a>
            </Link></>
          )}        
        </div>
      </nav>
    </header>
  );
};

export default Header;
