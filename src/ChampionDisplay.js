import React from 'react';
import './Board.css';
import Ranged from './Ranged.png';
import { ATTACK_SPEED } from './ChampionsList';

const ChampionDisplay = (champion) => {
  const [showAbility, setShowAbility] = React.useState(false);
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });
  const currentChampion = champion.champion;
  
  return (
    <div style={{ background: '#18222F', marginTop: '10px', marginBottom: '10px', paddingTop: '10px', paddingBottom: '15px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', width: '225px' }}>
      <h2 style={{ color: '#ffffff', textAlign: 'center', marginBottom: '0px', marginTop: '0px', padding: '0px', fontSize: '20px' }}>
        {currentChampion.type}
      </h2>
      <div style={{ textAlign: 'center', marginTop: '0px', marginBottom: '10px', padding: '0px' }}>
        {currentChampion.starLevel === 1 && (
          <span style={{ color: 'yellow' }}>★</span>
        )}
        {currentChampion.starLevel === 2 && (
          <span style={{ color: 'yellow' }}>★ ★</span>
        )}
        {currentChampion.starLevel === 3 && (
          <span style={{ color: 'yellow' }}>★ ★ ★</span>
        )}
      </div>
      <div style={{ paddingLeft: '10px', paddingRight: '10px' }}>
        <img src={currentChampion.image} alt={currentChampion.type} style={{ width: '100%', borderRadius: '8px' }} />
      </div>
      <div style={{ paddingLeft: '10px', paddingRight: '10px', marginTop: '10px', marginBottom: '15px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ flex: '1', backgroundColor: '#ccc', height: '20px', marginRight: '5px' }}>
            <div style={{ backgroundColor: 'green', height: '100%', width: `calc(${(currentChampion.health / currentChampion.originalHealth) * 100}%` }}></div>
          </div>
          <span style={{ color: '#ffffff', width: '70px', textAlign: 'start', fontSize: '14px' }}>{Math.round(currentChampion.health)}/{Math.round(currentChampion.originalHealth)}</span>
        </div>
        {currentChampion.totalMana > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', paddingTop: '5px' }}>
            <div style={{ flex: '1', backgroundColor: '#ccc', height: '20px', marginRight: '5px' }}>
              <div style={{ backgroundColor: '#3E92CC', height: '100%', width: `${(currentChampion.mana / currentChampion.totalMana) * 100}%` }}></div>
            </div>
            <span style={{ color: '#ffffff', width: '70px', textAlign: 'start', fontSize: '14px' }}>{Math.round(currentChampion.mana)}/{Math.round(currentChampion.totalMana)}</span>
          </div>
        )}
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', paddingLeft: '10px', paddingRight: '10px', justifyContent: 'space-around' }}>
        <div style={{ display: 'flex', flexDirection: 'column', width: '30px', height: '50px', justifyContent: 'center', alignItems: 'center' }}>
          <img src="https://cdn.tft.tools/general/ad.png?w=14" alt="attack-damage" style={{ width: '100%' }} />
          <span style={{ color: '#ffffff', paddingTop: '2px', fontSize: '14px' }}>{Math.round(currentChampion.attackDamage)}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', width: '30px', height: '50px', justifyContent: 'center', alignItems: 'center' }}>
          <img src="https://cdn.tft.tools/general/ap.png?w=14" alt="attack-damage" style={{ width: '100%' }} />
          <span style={{ color: '#ffffff', paddingTop: '2px', fontSize: '14px' }}>{Math.round(currentChampion.abilityPower)}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', width: '30px', height: '50px', justifyContent: 'center', alignItems: 'center' }}>
          <img src="https://cdn.tft.tools/general/armor.png?w=14" alt="attack-damage" style={{ width: '100%' }} />
          <span style={{ color: '#ffffff', paddingTop: '2px', fontSize: '14px' }}>{Math.round(currentChampion.armor)}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', width: '30px', height: '50px', justifyContent: 'center', alignItems: 'center' }}>
          <img src="https://cdn.tft.tools/general/mr.png?w=14" alt="attack-damage" style={{ width: '100%' }} />
          <span style={{ color: '#ffffff', paddingTop: '2px', fontSize: '14px' }}>{Math.round(currentChampion.magicResist)}</span>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', paddingLeft: '10px', paddingRight: '10px', justifyContent: 'space-around', marginTop: '2px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', width: '30px', height: '50px', justifyContent: 'center', alignItems: 'center' }}>
          <img src="https://cdn.tft.tools/general/as.png?w=14" alt="attack-damage" style={{ width: '100%' }} />
          <span style={{ color: '#ffffff', paddingTop: '2px', fontSize: '14px' }}>{Math.round(ATTACK_SPEED/currentChampion.attackSpeed * 100)/100}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', width: '30px', height: '50px', justifyContent: 'center', alignItems: 'center' }}>
          <img src="https://cdn.tft.tools/general/crit_chance.png?w=14" alt="attack-damage" style={{ width: '100%' }} />
          <span style={{ color: '#ffffff', paddingTop: '2px', fontSize: '14px' }}>{Math.round(currentChampion.criticalChance*100)}%</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', width: '30px', height: '50px', justifyContent: 'center', alignItems: 'center' }}>
          <img src="https://cdn.tft.tools/general/crit_damage.png?w=14" alt="attack-damage" style={{ width: '100%' }} />
          <span style={{ color: '#ffffff', paddingTop: '2px', fontSize: '14px' }}>{Math.round(currentChampion.criticalDamage*100)}%</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', width: '30px', height: '50px', justifyContent: 'center', alignItems: 'center' }}>
          <img src={Ranged} alt="attack-range" style={{ width: '100%' }} />
          <span style={{ color: '#ffffff', paddingTop: '2px', fontSize: '14px' }}>{Math.round(currentChampion.attackRange)}</span>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', paddingLeft: '10px', paddingRight: '10px', marginTop: '15px', justifyContent: 'space-around' }}>
        <div 
          style={{ display: 'flex', flexDirection: 'column', width: '50px', height: '50px', justifyContent: 'center', alignItems: 'center', border: '1px solid #ffffff', borderRadius: '8px' }}
          onMouseOver={(e) => {
            setShowAbility(true);
            setMousePos({ 
              x: e.clientX - 500, 
              y: e.clientY - 100
            });
          }}
          onMouseOut={() => setShowAbility(false)}
        >
          {showAbility && (
            <div 
              style={{ 
                position: 'absolute', 
                left: `${mousePos.x}px`,
                top: `${mousePos.y}px`,
                padding: '10px',
                background: '#1E3852',
                color: '#fff',
                borderRadius: '4px'
              }}
            >
              <b>Rawhide</b>
              <br /><br />
              Passive: Tahm Kench reduces each instance of incoming damage.
              <br /><br />
              Headliner Effect: +300 bonus Health.
            </div>
          )}
          <img src="https://cdn.mobalytics.gg/assets/lol/images/dd/champions/abilities/TahmKenchE.png?V3" alt="rawhide" style={{ width: '100%', borderRadius: '8px' }} />
        </div>
      </div>
    </div>
  );
};

export default ChampionDisplay;
