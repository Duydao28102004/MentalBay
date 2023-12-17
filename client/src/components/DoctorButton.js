import React from 'react';
import { Link } from 'react-router-dom';

const DoctorButton = () => {
  return (
    <div className="flex justify-center items-center mt-10">
        <p>Doctor functions: </p>
      <Link to="/createarticle">
        <button className="my-2 mx-2 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
          Create Article
        </button>
      </Link>
      <Link to="/createpodcast">
        <button className="my-2 mx-2 bg-green-500 text-white p-2 rounded-md hover:bg-green-600">
          Create Podcast
        </button>
      </Link>
    </div>
  );
};

export default DoctorButton;
