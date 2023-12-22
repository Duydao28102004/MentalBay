import React from 'react';
import YouTube from 'react-youtube';

const YoutubeComponent = ({ videoId }) => {
  // Options for the YouTube player
  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <div>
      <YouTube videoId={videoId} opts={opts} />
    </div>
  );
};

export default YoutubeComponent;
