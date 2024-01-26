import React from 'react';

const MOVEMENT_SPEED = 30;
const ATTACK_SPEED = 15;
const ABILITY_CAST = 20;
const ATTACK_PROJECTILE = 5;
const ABILITY_PROJECTILE = 5;

const convertToPixels = (coordinate, leftOrTop, even) => {
  if (leftOrTop === 'left') {
    if (even) {
      return 459.75 + 32.7 + ((coordinate + 1) * 2.95) + (coordinate * 62.4) + 62.4 / 2;
    }
    return 459.75 + ((coordinate + 1) * 2.95) + (coordinate * 62.4) + 62.4 / 2;
  }
  if (leftOrTop === 'top') {
    return (coordinate * 20.3) + (coordinate * 36) + 36 + 173.11;
  }
}

const champions = {
  'Ahri': { image: "", type: "Ahri", alive: true, attackRange: 4, oneStarHealth: 700, twoStarHealth: 1260, threeStarHealth: 2268, oneStarAD: 40, twoStarAD: 72, threeStarAD: 129.6, attackSpeed: ATTACK_SPEED/0.75, 
            totalMana: 30, mana: 0, abilityPower: 100, armor: 40, magicResist: 40, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
            iterationsRemaining: { attack: ATTACK_SPEED/0.75, ability: ABILITY_CAST, move: MOVEMENT_SPEED }, attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Akali KDA': { image: "", type: "Akali KDA", alive: true, attackRange: 4, oneStarHealth: 700, twoStarHealth: 1260, threeStarHealth: 2268, oneStarAD: 40, twoStarAD: 72, threeStarAD: 129.6, attackSpeed: ATTACK_SPEED/0.75, 
            totalMana: 30, mana: 0, abilityPower: 100, armor: 40, magicResist: 40, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
            iterationsRemaining: { attack: ATTACK_SPEED/0.75, ability: ABILITY_CAST, move: MOVEMENT_SPEED }, attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 }
}

// index, team, position, starlevel, headliner, health, attackdamage

function ChampionsList(championList, team) {
  var returnList = [];
  var column = 0;
  var row = 7;

  for (var i = 0; i < championList.length; i++) {
    const championPair = championList[i];
    const champion = champions[championPair[0]];
    const starLevel = championPair[1];
    const headliner = championPair[2];
    const items = championPair[3];

    if (starLevel == 1) {
      returnList.push({ ...champion, index: i, team: team, hexagonPosition: { left: column, top: row }, currentPosition: { left: convertToPixels(column, 'left', row%2 == 1) - 25, top: convertToPixels(row, 'top', row%2 == 1) - 25 }, 
                        items: items, headliner: headliner, starLevel: starLevel, health: champion[oneStarHealth], originalHealth: champion[oneStarHealth], attackDamage: champion[oneStarAD] })
    } else if (starLevel == 2) {
      returnList.push({ ...champion, index: i, team: team, hexagonPosition: { left: column, top: row }, currentPosition: { left: convertToPixels(column, 'left', row%2 == 1) - 25, top: convertToPixels(row, 'top', row%2 == 1) - 25 }, 
                        items: items, headliner: headliner, starLevel: starLevel, health: champion[twoStarHealth], originalHealth: champion[twoStarHealth], attackDamage: champion[twoStarAD] })
    } else {
      returnList.push({ ...champion, index: i, team: team, hexagonPosition: { left: column, top: row }, currentPosition: { left: convertToPixels(column, 'left', row%2 == 1) - 25, top: convertToPixels(row, 'top', row%2 == 1) - 25 }, 
                        items: items, headliner: headliner, starLevel: starLevel, health: champion[threeStarHealth], originalHealth: champion[threeStarHealth], attackDamage: champion[threeStarAD] })
    }

    column = column + 1;
    if (column >= 7) {
      column = 0;
      row = 6;
    }
  }
  return returnList;
}

export default ChampionsList;