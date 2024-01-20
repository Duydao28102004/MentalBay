import React from 'react';
import { useSession } from '../components/IsLoggedIn';

const Footer = () => {
  const { userData } = useSession();

  return (
    <footer className={`bg-gray-900 text-white py-8 w-full mt-10 self-end ${userData && Object.keys(userData).length === 0 ? 'hidden' : ''}`}>
      <div className="container mx-auto flex flex-col items-center">
        <p className="text-lg mb-4">Stay Connected</p>
      <div className="flex space-x-4">
      <a href="/" className="text-gray-300 hover:text-white">
        Twitter
      </a>
      <a href="/" className="text-gray-300 hover:text-white">
        Facebook
      </a>
      <a href="/" className="text-gray-300 hover:text-white">
        Instagram
      </a>
      </div>
        <p className="mt-4">&copy; 2024 MentalBay. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;