import React from 'react';
import './Champion.css'; 

function Champion({ key, team, index, hexagonPosition, currentPosition, image, type, starLevel, headliner, items, alive, attackRange, health, originalHealth,attackDamage, totalMana, mana, abilityPower, armor, magicResist }) {
  // const healthTextStyle = {
  //   color: team === 'enemy' ? 'red' : 'lightgreen',
  //   fontSize: '12px', 
  // };

  // const manaTextStyle = {
  //   color: 'lightblue',
  //   fontSize: '12px',
  // };

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

  // const roundedHealth = Math.ceil(health);
  // const roundedMana = Math.ceil(mana);

  const borderColor = team === 'user' ? 'blue' : 'red';

  return (
    <div
      className={"champion"}
      style={{ 
        left: -2 + 'px', 
        top: -2 + 'px', 
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover', 
        border: `2px solid ${borderColor}`
      }}
    >
      <div style={{  }}>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '-2.5px' }}>
          <div style={{ flex: '1', backgroundColor: 'rgba(0,0,0,0.5)', height: '7.5px' }}>
            <div style={{ backgroundColor: 'green', height: '100%', width: `calc(${(health / originalHealth) * 100}%` }}></div>
          </div>
        </div>
        {totalMana > 0 && (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ flex: '1', backgroundColor: 'rgba(0,0,0,0.5)', height: '7.5px' }}>
              <div style={{ backgroundColor: '#3E92CC', height: '100%', width: `${(mana / totalMana) * 100}%` }}></div>
            </div>
          </div>
        )}
      </div>
      <div className="star-overlay">
        {renderStars()}
      </div>
    </div>
  );
}

export default Champion;
