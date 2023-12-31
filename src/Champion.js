import React from 'react';
import './Champion.css'; 

function Champion({ key, team, startingPosition, currentPosition, image, type, starLevel, headliner, items }) {
  return (
    <div
      className={"champion"}
      style={{ 
        left: 0 + 'px', 
        top: 0 + 'px', 
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover', 
      }}
    ></div>
  );
}

export default Champion;
