import React, { useEffect, useState } from 'react';
import loadingIcon from '../assets/loading.gif';

const LoadingComponent = ({ spinnerSrc }) => {
  const [loadingText, setLoadingText] = useState('Loading');

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingText((prevText) => {
        switch (prevText) {
          case 'Loading':
            return 'Loading.';
          case 'Loading.':
            return 'Loading..';
          case 'Loading..':
            return 'Loading...';
          case 'Loading...':
            return 'Loading';
          default:
            return 'Loading';
        }
      });
    }, 500);

    return () => clearInterval(interval);

  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200 w-3/5 mx-auto">
      <div className="text-center">
        <p className="font-bold">{loadingText}</p>
      </div>
    </div>
  );
};

export default LoadingComponent;
