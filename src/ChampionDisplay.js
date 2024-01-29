import React from 'react';
import './Board.css';
import Ranged from './Ranged.png';
import { ATTACK_SPEED } from './ChampionsList';
import { GetItemDetails } from './ItemsList';
import { GetAbilityDetails } from './AbilitiesList';

const ChampionDisplay = (champion) => {
  const [showAbility, setShowAbility] = React.useState(false);
  const [showItemOne, setShowItemOne] = React.useState(false);
  const [showItemTwo, setShowItemTwo] = React.useState(false);
  const [showItemThree, setShowItemThree] = React.useState(false);
  const currentChampion = champion.champion;
  const currentChampionItems = currentChampion.items;
  const currentChampionAbility = GetAbilityDetails(currentChampion.type);

  console.log(currentChampionAbility);
  var itemDetailsOne = null;
  var itemDetailsTwo = null;
  var itemDetailsThree = null;

  if (currentChampionItems.length >= 1) {
    itemDetailsOne = GetItemDetails(currentChampionItems[0]);
  } 
  if (currentChampionItems.length >= 2) {
    itemDetailsTwo = GetItemDetails(currentChampionItems[1]);
  }
  if (currentChampionItems.length >= 3) {
    itemDetailsThree = GetItemDetails(currentChampionItems[2]);
  }

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
      <div style={{ paddingTop: '0px', paddingBottom: '0px', paddingLeft: '10px', paddingRight: '10px', margin: '0px', position: 'relative' }}>
      <img
        src={currentChampion.image}
        alt={currentChampion.type}
        style={{
          width: '100%',
          borderRadius: '8px',
          zIndex: 1,
          margin: '0px',
          padding: '0px',
        }}
      />
        <div style={{
          position: 'absolute',
          display: 'flex',
          flexDirection: 'row',
          left: '0',
          right: '0',
          margin: 'auto',
          marginTop: '-65px',
          padding: '0px',
          justifyContent: 'space-evenly',
          zIndex: 2,
        }}>
          {itemDetailsOne && (
            <div
              key={0}
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '50px',
                height: '50px',
                justifyContent: 'center',
                alignItems: 'center',
                border: '1px solid #ffffff',
                borderRadius: '8px',
                background: '#1E3852',
              }}
              onMouseOver={() => setShowItemOne(true)}
              onMouseOut={() => setShowItemOne(false)}
            >
              {showItemOne && (
                <div
                  style={{
                    position: 'absolute',
                    transform: 'translate(-50%, -50%)',
                    width: 'auto',
                    height: 'auto',
                    padding: '10px',
                    background: '#1E3852',
                    color: '#fff',
                    borderRadius: '4px',
                    zIndex: 3
                  }}
                >
                  <b>{itemDetailsOne.type}</b>
                  <br/><br/>
                  {itemDetailsOne.description}
                </div>
              )}
              <img src={itemDetailsOne.image} alt={itemDetailsOne.type} style={{ width: '100%', borderRadius: '8px' }} />
            </div>
          )}
          {itemDetailsTwo && (
            <div
              key={1}
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '50px',
                height: '50px',
                justifyContent: 'center',
                alignItems: 'center',
                border: '1px solid #ffffff',
                borderRadius: '8px',
                background: '#1E3852',
              }}
              onMouseOver={() => setShowItemTwo(true)}
              onMouseOut={() => setShowItemTwo(false)}
            >
              {showItemTwo && (
                <div
                  style={{
                    position: 'absolute',
                    transform: 'translate(-50%, -50%)',
                    width: 'auto',
                    height: 'auto',
                    padding: '10px',
                    background: '#1E3852',
                    color: '#fff',
                    borderRadius: '4px',
                    zIndex: 3
                  }}
                >
                  <b>{itemDetailsTwo.type}</b>
                  <br/><br/>
                  {itemDetailsTwo.description}
                </div>
              )}
              <img src={itemDetailsTwo.image} alt={itemDetailsTwo.type} style={{ width: '100%', borderRadius: '8px' }} />
            </div>
          )}
          {itemDetailsThree && (
            <div
              key={2}
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '50px',
                height: '50px',
                justifyContent: 'center',
                alignItems: 'center',
                border: '1px solid #ffffff',
                borderRadius: '8px',
                background: '#1E3852',
              }}
              onMouseOver={() => setShowItemThree(true)}
              onMouseOut={() => setShowItemThree(false)}
            >
              {showItemThree && (
                <div
                  style={{
                    position: 'absolute',
                    transform: 'translate(-50%, -50%)',
                    width: 'auto',
                    height: 'auto',
                    padding: '10px',
                    background: '#1E3852',
                    color: '#fff',
                    borderRadius: '4px',
                  }}
                >
                  <b>{itemDetailsThree.type}</b>
                  <br/><br/>
                  {itemDetailsThree.description}
                </div>
              )}
              <img src={itemDetailsThree.image} alt={itemDetailsThree.type} style={{ width: '100%', borderRadius: '8px' }} />
            </div>
          )}
        </div>
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
          <span style={{ color: '#ffffff', paddingTop: '2px', fontSize: '14px' }}>{Math.floor(currentChampion.attackDamage)}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', width: '30px', height: '50px', justifyContent: 'center', alignItems: 'center' }}>
          <img src="https://cdn.tft.tools/general/ap.png?w=14" alt="attack-damage" style={{ width: '100%' }} />
          <span style={{ color: '#ffffff', paddingTop: '2px', fontSize: '14px' }}>{Math.floor(currentChampion.abilityPower)}</span>
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
          <span style={{ color: '#ffffff', paddingTop: '2px', fontSize: '14px' }}>{(Math.floor(ATTACK_SPEED/currentChampion.attackSpeed * 100)/100).toFixed(2)}</span>
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
          onMouseOver={() => setShowAbility(true)}
          onMouseOut={() => setShowAbility(false)}
        >
          {showAbility && (
            <div 
              style={{ 
                position: 'absolute', 
                transform: 'translate(-50%, -50%)',
                width: 'auto',
                height: 'auto',
                padding: '10px',
                background: '#1E3852',
                color: '#fff',
                borderRadius: '4px'
              }}
            >
              <div dangerouslySetInnerHTML={{ __html: currentChampionAbility.ability }} />
            </div>
          )}
          <img src={currentChampionAbility.image} alt={currentChampion.type} style={{ width: '100%', borderRadius: '8px' }} />
        </div>
      </div>
    </div>
  );
};

export default ChampionDisplay;
