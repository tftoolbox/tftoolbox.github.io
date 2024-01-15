import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import Board from './Board';
import Champion from './Champion';

const convertToPixels = (coordinate, leftOrTop, even) => {
  if (leftOrTop === 'left') {
    if (even) {
      return 360 + 32.7 + ((coordinate + 1) * 2.95) + (coordinate * 62.4) + 62.4 / 2;
    }
    return 360 + ((coordinate + 1) * 2.95) + (coordinate * 62.4) + 62.4 / 2;
  }
  if (leftOrTop === 'top') {
    return (coordinate * 20.3) + (coordinate * 36) + 36;
  }
}

function App() {
  const enemyChampions = [
    { index: 2, team: 'enemy', hexagonPosition: { left: 0, top: 0 }, currentPosition: { left: convertToPixels(0, 'left', false) - 25, top: convertToPixels(0, 'top', false) - 25 }, image: "https://dotesports.com/wp-content/uploads/2023/11/Corki.png?w=640", type: "corki", starLevel: 1, headliner: false, items: [], alive: true, attackRange: 2, health: 500, attackDamage: 100, attackSpeed: 30, totalMana: 60, mana: 15, abilityPower: 100, armor: 20, magicResist: 20, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: 30, movementSpeed: 30, iterationsRemaining: { attack: 21, ability: 15, move: 30 }, attackProjectileSpeed: 5, abilityProjectileSpeed: 5, stats: [] },
    { index: 3, team: 'enemy', hexagonPosition: { left: 1, top: 1 }, currentPosition: { left: convertToPixels(1, 'left', true) - 25, top: convertToPixels(1, 'top', true) - 25 }, image: "https://prod.api.assets.riotgames.com/public/v1/asset/lol/13.24.1/CHAMPION_SKIN/223020/SPLASH?width=1920&height=1080&format=auto&auto=webp", type: "tahm-kench", starLevel: 2, headliner: false, items: [], alive: true, attackRange: 1, health: 1000, attackDamage: 75, attackSpeed: 30, totalMana: null, mana: null, abilityPower: 100, armor: 20, magicResist: 20, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: null, movementSpeed: 30, iterationsRemaining: { attack: 17, ability: null, move: 30 }, attackProjectileSpeed: 0, abilityProjectileSpeed: null, stats: [] },
  ];

  const userChampions = [
    { index: 0, team: 'user', hexagonPosition: { left: 4, top: 4 }, currentPosition: { left: convertToPixels(4, 'left', false) - 25, top: convertToPixels(4, 'top', false) - 25 }, image: "https://prod.api.assets.riotgames.com/public/v1/asset/lol/13.24.1/CHAMPION_SKIN/223020/SPLASH?width=1920&height=1080&format=auto&auto=webp", type: "tahm-kench", starLevel: 1, headliner: false, items: [], alive: true, attackRange: 1, health: 700, attackDamage: 50, attackSpeed: 30, totalMana: null, mana: null, abilityPower: 100, armor: 20, magicResist: 20, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: null, movementSpeed: 30, iterationsRemaining: { attack: 17, ability: null, move: 30 }, attackProjectileSpeed: 0, abilityProjectileSpeed: null, stats: [] },
    { index: 1, team: 'user', hexagonPosition: { left: 6, top: 7 }, currentPosition: { left: convertToPixels(6, 'left', true) - 25, top: convertToPixels(7, 'top', true) - 25 }, image: "https://dotesports.com/wp-content/uploads/2023/11/Corki.png?w=640", type: "corki", starLevel: 1, headliner: false, items: [], alive: true, attackRange: 2, health: 500, attackDamage: 100, attackSpeed: 30, totalMana: 60, mana: 15, abilityPower: 100, armor: 20, magicResist: 20, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: 30, movementSpeed: 30, iterationsRemaining: { attack: 21, ability: 15, move: 30 }, attackProjectileSpeed: 5, abilityProjectileSpeed: 5, stats: [] },
  ];

  return (
    <div className="App">
      <Board enemyChampionsList={enemyChampions} userChampionsList={userChampions} />
    </div>
  );
}

export default App;
