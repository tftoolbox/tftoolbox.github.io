import React, { useState } from 'react';

const DualButton = () => {
  const [activeSide, setActiveSide] = useState('enemy');

  const handleSideClick = (side) => {
    setActiveSide(side);
  };

  return (
    <div style={{ display: 'flex', width: '225px', height: '50px', marginTop: '10px' }}>
      <button
        style={{
          flex: '1',
          padding: '10px',
          borderRadius: '15px 0 0 15px',
          backgroundColor: activeSide === 'enemy' ? '#2A628F' : '#13293D',
          color: '#ffffff',
          fontSize: '16px',
          fontWeight: 'bold', 
        }}
        onClick={() => handleSideClick('enemy')}
      >
        Enemy
      </button>
      <button
        style={{
          flex: '1',
          padding: '10px',
          borderRadius: '0 15px 15px 0',
          backgroundColor: activeSide === 'user' ? '#2A628F' : '#13293D',
          color: '#ffffff',
          fontSize: '16px', 
          fontWeight: 'bold', 
        }}
        onClick={() => handleSideClick('user')}
      >
        User
      </button>
    </div>
  );
};

export default DualButton;
