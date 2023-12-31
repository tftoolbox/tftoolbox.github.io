import React from 'react';
import './Hexagon.css'; 

function Hexagon ({ player, onDragOver, onDrop, hexagonCoordinates }) {
  const hexagonClassName = `hex ${player}`;

  return (
    <div className={hexagonClassName} onDragOver={onDragOver} onDrop={(e) => onDrop(e, hexagonCoordinates, player)}>
      <div className="top"></div>
      <div className="middle"></div>
      <div className="bottom"></div>
    </div>
  );
};

export default Hexagon;
