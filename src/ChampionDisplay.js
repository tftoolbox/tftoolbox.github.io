import React from 'react';
import './Board.css';
import Ranged from './Ranged.png';

const ChampionDisplay = () => {
  return (
    <div style={{ background: '#18222F', marginTop: '10px', marginBottom: '10px', paddingTop: '10px', paddingBottom: '15px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', width: '225px' }}>
      <h2 style={{ color: '#ffffff', textAlign: 'center', marginBottom: '5px', marginTop: '5px', fontSize: '20px' }}>Tahm Kench</h2>
      <div style={{ textAlign: 'center' }}>
        <span style={{ color: 'yellow' }}>★ ★ ★</span>
      </div>
      <div style={{ paddingLeft: '10px', paddingTop: '15px', paddingRight: '10px', paddingBottom: '5px' }}>
        <img src='https://cdn.dak.gg/tft/images2/sets/set10/portraits/TahmKench.jpg' alt="tahm-kench" style={{ width: '100%', borderRadius: '8px' }} />
      </div>
      <div style={{ padding: '10px', paddingBottom: '5px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ flex: '1', backgroundColor: '#ccc', height: '20px', marginRight: '5px' }}>
            <div style={{ backgroundColor: 'green', height: '100%', width: 'calc(599/650 * 100%)' }}></div>
          </div>
          <span style={{ color: '#ffffff', width: '70px', textAlign: 'start', fontSize: '14px' }}>599/650</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', paddingTop: '5px' }}>
          <div style={{ flex: '1', backgroundColor: '#ccc', height: '20px', marginRight: '5px' }}>
            <div style={{ backgroundColor: '#3E92CC', height: '100%', width: 'calc(15/60 * 100%)' }}></div>
          </div>
          <span style={{ color: '#ffffff', width: '70px', textAlign: 'start', fontSize: '14px' }}>15/60</span>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', padding: '10px', paddingBottom: '5px', justifyContent: 'space-around' }}>
        <div style={{ display: 'flex', flexDirection: 'column', width: '30px', height: '50px', justifyContent: 'center', alignItems: 'center' }}>
          <img src="https://cdn.tft.tools/general/ad.png?w=14" alt="attack-damage" style={{ width: '100%' }} />
          <span style={{ color: '#ffffff', paddingTop: '2px', fontSize: '14px' }}>60</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', width: '30px', height: '50px', justifyContent: 'center', alignItems: 'center' }}>
          <img src="https://cdn.tft.tools/general/ap.png?w=14" alt="attack-damage" style={{ width: '100%' }} />
          <span style={{ color: '#ffffff', paddingTop: '2px', fontSize: '14px' }}>100</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', width: '30px', height: '50px', justifyContent: 'center', alignItems: 'center' }}>
          <img src="https://cdn.tft.tools/general/armor.png?w=14" alt="attack-damage" style={{ width: '100%' }} />
          <span style={{ color: '#ffffff', paddingTop: '2px', fontSize: '14px' }}>35</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', width: '30px', height: '50px', justifyContent: 'center', alignItems: 'center' }}>
          <img src="https://cdn.tft.tools/general/mr.png?w=14" alt="attack-damage" style={{ width: '100%' }} />
          <span style={{ color: '#ffffff', paddingTop: '2px', fontSize: '14px' }}>35</span>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', paddingLeft: '10px', paddingRight: '10px', justifyContent: 'space-around' }}>
        <div style={{ display: 'flex', flexDirection: 'column', width: '30px', height: '50px', justifyContent: 'center', alignItems: 'center' }}>
          <img src="https://cdn.tft.tools/general/as.png?w=14" alt="attack-damage" style={{ width: '100%' }} />
          <span style={{ color: '#ffffff', paddingTop: '2px', fontSize: '14px' }}>0.55</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', width: '30px', height: '50px', justifyContent: 'center', alignItems: 'center' }}>
          <img src="https://cdn.tft.tools/general/crit_chance.png?w=14" alt="attack-damage" style={{ width: '100%' }} />
          <span style={{ color: '#ffffff', paddingTop: '2px', fontSize: '14px' }}>25%</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', width: '30px', height: '50px', justifyContent: 'center', alignItems: 'center' }}>
          <img src="https://cdn.tft.tools/general/crit_damage.png?w=14" alt="attack-damage" style={{ width: '100%' }} />
          <span style={{ color: '#ffffff', paddingTop: '2px', fontSize: '14px' }}>140%</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', width: '30px', height: '50px', justifyContent: 'center', alignItems: 'center' }}>
          <img src={Ranged} alt="attack-range" style={{ width: '100%' }} />
          <span style={{ color: '#ffffff', paddingTop: '2px', fontSize: '14px' }}>1</span>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', paddingLeft: '10px', paddingRight: '10px', paddingTop: '15px', justifyContent: 'space-around' }}>
        <div style={{ display: 'flex', flexDirection: 'column', width: '50px', height: '50px', justifyContent: 'center', alignItems: 'center', border: '1px solid #ffffff', borderRadius: '8px' }}>
          <img src="https://cdn.mobalytics.gg/assets/lol/images/dd/champions/abilities/TahmKenchE.png?V3" alt="rawhide" style={{ width: '100%', borderRadius: '8px' }} />
        </div>
      </div>
    </div>
  );
};

export default ChampionDisplay;
