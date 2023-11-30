import React from 'react';

const Header = () => {
  return (
    <header className='mt-2'>
      <nav className=" text-white p-4 text-center flex justify-between items-center w-3/4 mx-auto bg-white rounded-md shadow-md">
        <h1 className="text-pink-500 m-0">MentalBay</h1>
        <div className="text-black no-underline mr-4">
          <a className="mx-4" href="/">News</a>
          <a className="mx-4" href="/product">Article</a>
          <a className="mx-4" href="/about">About</a>
          <a className="mx-4" href="/contact">Contact</a>
        </div>
      </nav>
    </header>
  );
};

export default Header;