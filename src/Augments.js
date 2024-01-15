import React from 'react';
import './Board.css';

const Augments = () => {
  return (
    <div style={{ background: '#18222F', paddingTop: '10px', paddingBottom: '10px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', marginBottom: '10px' }}>
      <h2 style={{ color: '#ffffff', textAlign: 'center', marginBottom: '5px', marginTop: '5px', fontSize: '20px' }}>Augments</h2>
      <div className='augment-section'>
        <img alt='new-recruits' src='https://ap.tft.tools/img/augments/6ForceOfNature3.png?w=28' style={{ width: '40px', height: '40px' }}/>
        <img alt='healing-orbs-2' src='https://ap.tft.tools/img/augments/9HealingOrbsII2.png?w=28' style={{ width: '40px', height: '40px' }}/>
        <img alt='blistering-strikes' src='https://ap.tft.tools/img/augments/9RedBuff1.png?w=28' style={{ width: '40px', height: '40px' }}/>
      </div>
    </div>
  );
};

export default Augments;
