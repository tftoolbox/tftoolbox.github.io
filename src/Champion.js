import React from 'react';
import './Champion.css'; 

function Champion({ key, team, index, hexagonPosition, currentPosition, image, type, starLevel, headliner, items, alive, attackRange, health, attackDamage }) {
  const healthTextStyle = {
    color: team === 'enemy' ? 'red' : 'lightgreen',
    fontSize: '12px', 
  };

  const starStyle = {
    color: 'yellow',
    fontSize: '16px',  
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < starLevel; i++) {
      stars.push(<span key={i} style={starStyle}>★</span>);
    }
    return stars;
  };

  return (
    <div
      className={"champion"}
      style={{ 
        left: 0 + 'px', 
        top: 0 + 'px', 
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover', 
      }}
    >
      <div className="health-overlay">
        <span className="health-text" style={healthTextStyle}>{health}</span>
      </div>
      <div className="star-overlay">
        {renderStars()}
      </div>
    </div>
  );
}

export default Champion;
