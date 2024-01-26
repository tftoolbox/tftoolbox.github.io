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
  'Ahri': { image: "", type: "Ahri", alive: true, attackRange: 4, oneStarHealth: 700, twoStarHealth: 1260, threeStarHealth: 2268, oneStarAD: 40, twoStarAD: 72.0, threeStarAD: 129.6, attackSpeed: 0.75, 
			totalMana: 30, mana: 0, abilityPower: 100, armor: 40, magicResist: 40, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: 0.75, ability: ABILITY_CAST, move: MOVEMENT_SPEED }, attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Akali_KDA': { image: "", type: "Akali_KDA", alive: true, attackRange: 1, oneStarHealth: 900, twoStarHealth: 1620, threeStarHealth: 2916, oneStarAD: 70, twoStarAD: 126.0, threeStarAD: 226.8, attackSpeed: 0.85, 
			totalMana: 70, mana: 20, abilityPower: 100, armor: 55, magicResist: 55, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: 0.85, ability: ABILITY_CAST, move: MOVEMENT_SPEED }, attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Akali_True_Damage': { image: "", type: "Akali_True_Damage", alive: true, attackRange: 1, oneStarHealth: 900, twoStarHealth: 1620, threeStarHealth: 2916, oneStarAD: 70, twoStarAD: 126.0, threeStarAD: 226.8, attackSpeed: 0.85, 
			totalMana: 70, mana: 20, abilityPower: 100, armor: 55, magicResist: 55, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: 0.85, ability: ABILITY_CAST, move: MOVEMENT_SPEED }, attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Amumu': { image: "", type: "Amumu", alive: true, attackRange: 1, oneStarHealth: 850, twoStarHealth: 1530, threeStarHealth: 2754, oneStarAD: 45, twoStarAD: 81.0, threeStarAD: 145.8, attackSpeed: 0.65, 
			totalMana: 50, mana: 0, abilityPower: 100, armor: 45, magicResist: 45, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: 0.65, ability: ABILITY_CAST, move: MOVEMENT_SPEED }, attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Annie': { image: "", type: "Annie", alive: true, attackRange: 4, oneStarHealth: 500, twoStarHealth: 900, threeStarHealth: 1620, oneStarAD: 40, twoStarAD: 72.0, threeStarAD: 129.6, attackSpeed: 0.65, 
			totalMana: 50, mana: 0, abilityPower: 100, armor: 20, magicResist: 20, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: 0.65, ability: ABILITY_CAST, move: MOVEMENT_SPEED }, attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Aphelios': { image: "", type: "Aphelios", alive: true, attackRange: 4, oneStarHealth: 600, twoStarHealth: 1080, threeStarHealth: 1944, oneStarAD: 55, twoStarAD: 99.0, threeStarAD: 178.2, attackSpeed: 0.75, 
			totalMana: 120, mana: 40, abilityPower: 100, armor: 20, magicResist: 20, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: 0.75, ability: ABILITY_CAST, move: MOVEMENT_SPEED }, attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Bard': { image: "", type: "Bard", alive: true, attackRange: 4, oneStarHealth: 550, twoStarHealth: 990, threeStarHealth: 1782, oneStarAD: 40, twoStarAD: 72.0, threeStarAD: 129.6, attackSpeed: 0.7, 
			totalMana: 90, mana: 30, abilityPower: 100, armor: 20, magicResist: 20, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: 0.7, ability: ABILITY_CAST, move: MOVEMENT_SPEED }, attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Blitzcrank': { image: "", type: "Blitzcrank", alive: true, attackRange: 1, oneStarHealth: 1000, twoStarHealth: 1800, threeStarHealth: 3240, oneStarAD: 60, twoStarAD: 108.0, threeStarAD: 194.4, attackSpeed: 0.6, 
			totalMana: 120, mana: 60, abilityPower: 100, armor: 60, magicResist: 60, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: 0.6, ability: ABILITY_CAST, move: MOVEMENT_SPEED }, attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Caitlyn': { image: "", type: "Caitlyn", alive: true, attackRange: 4, oneStarHealth: 700, twoStarHealth: 1260, threeStarHealth: 2268, oneStarAD: 70, twoStarAD: 126.0, threeStarAD: 226.8, attackSpeed: 0.8, 
			totalMana: 90, mana: 0, abilityPower: 100, armor: 30, magicResist: 30, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: 0.8, ability: ABILITY_CAST, move: MOVEMENT_SPEED }, attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Corki': { image: "", type: "Corki", alive: true, attackRange: 4, oneStarHealth: 450, twoStarHealth: 810, threeStarHealth: 1458, oneStarAD: 45, twoStarAD: 81.0, threeStarAD: 145.8, attackSpeed: 0.7, 
			totalMana: 60, mana: 15, abilityPower: 100, armor: 15, magicResist: 15, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: 0.7, ability: ABILITY_CAST, move: MOVEMENT_SPEED }, attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Ekko': { image: "", type: "Ekko", alive: true, attackRange: 1, oneStarHealth: 850, twoStarHealth: 1530, threeStarHealth: 2754, oneStarAD: 50, twoStarAD: 90.0, threeStarAD: 162.0, attackSpeed: 0.65, 
			totalMana: 125, mana: 50, abilityPower: 100, armor: 45, magicResist: 45, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: 0.65, ability: ABILITY_CAST, move: MOVEMENT_SPEED }, attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Evelynn': { image: "", type: "Evelynn", alive: true, attackRange: 1, oneStarHealth: 550, twoStarHealth: 990, threeStarHealth: 1782, oneStarAD: 45, twoStarAD: 81.0, threeStarAD: 145.8, attackSpeed: 0.7, 
			totalMana: 90, mana: 30, abilityPower: 100, armor: 35, magicResist: 35, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: 0.7, ability: ABILITY_CAST, move: MOVEMENT_SPEED }, attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Ezreal': { image: "", type: "Ezreal", alive: true, attackRange: 4, oneStarHealth: 700, twoStarHealth: 1260, threeStarHealth: 2268, oneStarAD: 70, twoStarAD: 126.0, threeStarAD: 226.8, attackSpeed: 0.8, 
			totalMana: 40, mana: 0, abilityPower: 100, armor: 30, magicResist: 30, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: 0.8, ability: ABILITY_CAST, move: MOVEMENT_SPEED }, attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Garen': { image: "", type: "Garen", alive: true, attackRange: 1, oneStarHealth: 750, twoStarHealth: 1350, threeStarHealth: 2430, oneStarAD: 55, twoStarAD: 99.0, threeStarAD: 178.2, attackSpeed: 0.7, 
			totalMana: 100, mana: 50, abilityPower: 100, armor: 45, magicResist: 45, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: 0.7, ability: ABILITY_CAST, move: MOVEMENT_SPEED }, attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Gnar': { image: "", type: "Gnar", alive: true, attackRange: 2, oneStarHealth: 700, twoStarHealth: 1260, threeStarHealth: 2268, oneStarAD: 55, twoStarAD: 99.0, threeStarAD: 178.2, attackSpeed: 0.65, 
			totalMana: 70, mana: 0, abilityPower: 100, armor: 45, magicResist: 45, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: 0.65, ability: ABILITY_CAST, move: MOVEMENT_SPEED }, attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Gragas': { image: "", type: "Gragas", alive: true, attackRange: 1, oneStarHealth: 750, twoStarHealth: 1350, threeStarHealth: 2430, oneStarAD: 50, twoStarAD: 90.0, threeStarAD: 162.0, attackSpeed: 0.6, 
			totalMana: 80, mana: 0, abilityPower: 100, armor: 45, magicResist: 45, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: 0.6, ability: ABILITY_CAST, move: MOVEMENT_SPEED }, attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Illaoi': { image: "", type: "Illaoi", alive: true, attackRange: 1, oneStarHealth: 1100, twoStarHealth: 1980, threeStarHealth: 3564, oneStarAD: 70, twoStarAD: 126.0, threeStarAD: 226.8, attackSpeed: 0.8, 
			totalMana: 150, mana: 70, abilityPower: 100, armor: 70, magicResist: 70, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: 0.8, ability: ABILITY_CAST, move: MOVEMENT_SPEED }, attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Jax': { image: "", type: "Jax", alive: true, attackRange: 1, oneStarHealth: 750, twoStarHealth: 1350, threeStarHealth: 2430, oneStarAD: 55, twoStarAD: 99.0, threeStarAD: 178.2, attackSpeed: 0.85, 
			totalMana: 120, mana: 50, abilityPower: 100, armor: 35, magicResist: 35, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: 0.85, ability: ABILITY_CAST, move: MOVEMENT_SPEED }, attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Jhin': { image: "", type: "Jhin", alive: true, attackRange: 4, oneStarHealth: 850, twoStarHealth: 1530, threeStarHealth: 2754, oneStarAD: 70, twoStarAD: 126.0, threeStarAD: 226.8, attackSpeed: 0.85, 
			totalMana: 30, mana: 0, abilityPower: 100, armor: 30, magicResist: 30, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: 0.85, ability: ABILITY_CAST, move: MOVEMENT_SPEED }, attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Jinx': { image: "", type: "Jinx", alive: true, attackRange: 4, oneStarHealth: 450, twoStarHealth: 810, threeStarHealth: 1458, oneStarAD: 45, twoStarAD: 81.0, threeStarAD: 145.8, attackSpeed: 0.7, 
			totalMana: 50, mana: 0, abilityPower: 100, armor: 15, magicResist: 15, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: 0.7, ability: ABILITY_CAST, move: MOVEMENT_SPEED }, attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'K'Sante': { image: "", type: "K'Sante", alive: true, attackRange: 1, oneStarHealth: 650, twoStarHealth: 1170, threeStarHealth: 2106, oneStarAD: 50, twoStarAD: 90.0, threeStarAD: 162.0, attackSpeed: 0.6, 
			totalMana: 60, mana: 0, abilityPower: 100, armor: 40, magicResist: 40, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: 0.6, ability: ABILITY_CAST, move: MOVEMENT_SPEED }, attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Kai'Sa': { image: "", type: "Kai'Sa", alive: true, attackRange: 5, oneStarHealth: 600, twoStarHealth: 1080, threeStarHealth: 1944, oneStarAD: 50, twoStarAD: 90.0, threeStarAD: 162.0, attackSpeed: 0.75, 
			totalMana: 40, mana: 0, abilityPower: 100, armor: 20, magicResist: 20, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: 0.75, ability: ABILITY_CAST, move: MOVEMENT_SPEED }, attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Karthus': { image: "", type: "Karthus", alive: true, attackRange: 4, oneStarHealth: 700, twoStarHealth: 1260, threeStarHealth: 2268, oneStarAD: 40, twoStarAD: 72.0, threeStarAD: 129.6, attackSpeed: 0.65, 
			totalMana: 125, mana: 25, abilityPower: 100, armor: 30, magicResist: 30, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: 0.65, ability: ABILITY_CAST, move: MOVEMENT_SPEED }, attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Katarina': { image: "", type: "Katarina", alive: true, attackRange: 2, oneStarHealth: 650, twoStarHealth: 1170, threeStarHealth: 2106, oneStarAD: 40, twoStarAD: 72.0, threeStarAD: 129.6, attackSpeed: 0.7, 
			totalMana: 60, mana: 0, abilityPower: 100, armor: 35, magicResist: 35, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: 0.7, ability: ABILITY_CAST, move: MOVEMENT_SPEED }, attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Kayle': { image: "", type: "Kayle", alive: true, attackRange: 4, oneStarHealth: 550, twoStarHealth: 990, threeStarHealth: 1782, oneStarAD: 35, twoStarAD: 63.0, threeStarAD: 113.4, attackSpeed: 0.75, 
			totalMana: 30, mana: 0, abilityPower: 100, armor: 20, magicResist: 20, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: 0.75, ability: ABILITY_CAST, move: MOVEMENT_SPEED }, attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Kayn': { image: "", type: "Kayn", alive: true, attackRange: 1, oneStarHealth: 1100, twoStarHealth: 1980, threeStarHealth: 3564, oneStarAD: 75, twoStarAD: 135.0, threeStarAD: 243.0, attackSpeed: 0.85, 
			totalMana: 50, mana: 0, abilityPower: 100, armor: 60, magicResist: 60, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: 0.85, ability: ABILITY_CAST, move: MOVEMENT_SPEED }, attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Kennen': { image: "", type: "Kennen", alive: true, attackRange: 2, oneStarHealth: 650, twoStarHealth: 1170, threeStarHealth: 2106, oneStarAD: 40, twoStarAD: 72.0, threeStarAD: 129.6, attackSpeed: 0.6, 
			totalMana: 90, mana: 30, abilityPower: 100, armor: 40, magicResist: 40, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: 0.6, ability: ABILITY_CAST, move: MOVEMENT_SPEED }, attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Lillia': { image: "", type: "Lillia", alive: true, attackRange: 1, oneStarHealth: 650, twoStarHealth: 1170, threeStarHealth: 2106, oneStarAD: 50, twoStarAD: 90.0, threeStarAD: 162.0, attackSpeed: 0.5, 
			totalMana: 140, mana: 70, abilityPower: 100, armor: 40, magicResist: 40, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: 0.5, ability: ABILITY_CAST, move: MOVEMENT_SPEED }, attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Lucian': { image: "", type: "Lucian", alive: true, attackRange: 4, oneStarHealth: 850, twoStarHealth: 1530, threeStarHealth: 2754, oneStarAD: 70, twoStarAD: 126.0, threeStarAD: 226.8, attackSpeed: 0.9, 
			totalMana: 125, mana: 50, abilityPower: 100, armor: 30, magicResist: 30, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: 0.9, ability: ABILITY_CAST, move: MOVEMENT_SPEED }, attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Lulu': { image: "", type: "Lulu", alive: true, attackRange: 4, oneStarHealth: 650, twoStarHealth: 1170, threeStarHealth: 2106, oneStarAD: 40, twoStarAD: 72.0, threeStarAD: 129.6, attackSpeed: 0.7, 
			totalMana: 40, mana: 0, abilityPower: 100, armor: 20, magicResist: 20, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: 0.7, ability: ABILITY_CAST, move: MOVEMENT_SPEED }, attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Lux': { image: "", type: "Lux", alive: true, attackRange: 4, oneStarHealth: 700, twoStarHealth: 1260, threeStarHealth: 2268, oneStarAD: 40, twoStarAD: 72.0, threeStarAD: 129.6, attackSpeed: 0.7, 
			totalMana: 75, mana: 15, abilityPower: 100, armor: 20, magicResist: 20, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: 0.7, ability: ABILITY_CAST, move: MOVEMENT_SPEED }, attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Miss_Fortune': { image: "", type: "Miss_Fortune", alive: true, attackRange: 4, oneStarHealth: 650, twoStarHealth: 1170, threeStarHealth: 2106, oneStarAD: 30, twoStarAD: 54.0, threeStarAD: 97.2, attackSpeed: 0.75, 
			totalMana: 60, mana: 0, abilityPower: 100, armor: 20, magicResist: 20, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: 0.75, ability: ABILITY_CAST, move: MOVEMENT_SPEED }, attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Mordekaiser': { image: "", type: "Mordekaiser", alive: true, attackRange: 1, oneStarHealth: 850, twoStarHealth: 1530, threeStarHealth: 2754, oneStarAD: 60, twoStarAD: 108.0, threeStarAD: 194.4, attackSpeed: 0.65, 
			totalMana: 120, mana: 70, abilityPower: 100, armor: 55, magicResist: 55, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: 0.65, ability: ABILITY_CAST, move: MOVEMENT_SPEED }, attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Nami': { image: "", type: "Nami", alive: true, attackRange: 4, oneStarHealth: 450, twoStarHealth: 810, threeStarHealth: 1458, oneStarAD: 40, twoStarAD: 72.0, threeStarAD: 129.6, attackSpeed: 0.75, 
			totalMana: 75, mana: 15, abilityPower: 100, armor: 15, magicResist: 15, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: 0.75, ability: ABILITY_CAST, move: MOVEMENT_SPEED }, attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Neeko': { image: "", type: "Neeko", alive: true, attackRange: 1, oneStarHealth: 850, twoStarHealth: 1530, threeStarHealth: 2754, oneStarAD: 50, twoStarAD: 90.0, threeStarAD: 162.0, attackSpeed: 0.6, 
			totalMana: 90, mana: 0, abilityPower: 100, armor: 50, magicResist: 50, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: 0.6, ability: ABILITY_CAST, move: MOVEMENT_SPEED }, attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Olaf': { image: "", type: "Olaf", alive: true, attackRange: 1, oneStarHealth: 650, twoStarHealth: 1170, threeStarHealth: 2106, oneStarAD: 55, twoStarAD: 99.0, threeStarAD: 178.2, attackSpeed: 0.65, 
			totalMana: 0, mana: 0, abilityPower: 100, armor: 40, magicResist: 40, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: 0.65, ability: ABILITY_CAST, move: MOVEMENT_SPEED }, attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Pantheon': { image: "", type: "Pantheon", alive: true, attackRange: 1, oneStarHealth: 700, twoStarHealth: 1260, threeStarHealth: 2268, oneStarAD: 55, twoStarAD: 99.0, threeStarAD: 178.2, attackSpeed: 0.6, 
			totalMana: 60, mana: 0, abilityPower: 100, armor: 45, magicResist: 45, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: 0.6, ability: ABILITY_CAST, move: MOVEMENT_SPEED }, attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Poppy': { image: "", type: "Poppy", alive: true, attackRange: 1, oneStarHealth: 1000, twoStarHealth: 1800, threeStarHealth: 3240, oneStarAD: 60, twoStarAD: 108.0, threeStarAD: 194.4, attackSpeed: 0.65, 
			totalMana: 100, mana: 30, abilityPower: 100, armor: 65, magicResist: 65, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: 0.65, ability: ABILITY_CAST, move: MOVEMENT_SPEED }, attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Qiyana': { image: "", type: "Qiyana", alive: true, attackRange: 1, oneStarHealth: 950, twoStarHealth: 1710, threeStarHealth: 3078, oneStarAD: 75, twoStarAD: 135.0, threeStarAD: 243.0, attackSpeed: 0.9, 
			totalMana: 40, mana: 0, abilityPower: 100, armor: 60, magicResist: 60, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: 0.9, ability: ABILITY_CAST, move: MOVEMENT_SPEED }, attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Riven': { image: "", type: "Riven", alive: true, attackRange: 1, oneStarHealth: 800, twoStarHealth: 1440, threeStarHealth: 2592, oneStarAD: 60, twoStarAD: 108.0, threeStarAD: 194.4, attackSpeed: 0.75, 
			totalMana: 100, mana: 50, abilityPower: 100, armor: 40, magicResist: 40, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: 0.75, ability: ABILITY_CAST, move: MOVEMENT_SPEED }, attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Samira': { image: "", type: "Samira", alive: true, attackRange: 4, oneStarHealth: 600, twoStarHealth: 1080, threeStarHealth: 1944, oneStarAD: 60, twoStarAD: 108.0, threeStarAD: 194.4, attackSpeed: 0.7, 
			totalMana: 100, mana: 0, abilityPower: 100, armor: 20, magicResist: 20, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: 0.7, ability: ABILITY_CAST, move: MOVEMENT_SPEED }, attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Senna': { image: "", type: "Senna", alive: true, attackRange: 4, oneStarHealth: 600, twoStarHealth: 1080, threeStarHealth: 1944, oneStarAD: 40, twoStarAD: 72.0, threeStarAD: 129.6, attackSpeed: 0.7, 
			totalMana: 90, mana: 30, abilityPower: 100, armor: 20, magicResist: 20, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: 0.7, ability: ABILITY_CAST, move: MOVEMENT_SPEED }, attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Seraphine': { image: "", type: "Seraphine", alive: true, attackRange: 4, oneStarHealth: 550, twoStarHealth: 990, threeStarHealth: 1782, oneStarAD: 40, twoStarAD: 72.0, threeStarAD: 129.6, attackSpeed: 0.7, 
			totalMana: 60, mana: 0, abilityPower: 100, armor: 25, magicResist: 25, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: 0.7, ability: ABILITY_CAST, move: MOVEMENT_SPEED }, attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Sett': { image: "", type: "Sett", alive: true, attackRange: 1, oneStarHealth: 950, twoStarHealth: 1710, threeStarHealth: 3078, oneStarAD: 55, twoStarAD: 99.0, threeStarAD: 178.2, attackSpeed: 0.7, 
			totalMana: 90, mana: 30, abilityPower: 100, armor: 45, magicResist: 45, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: 0.7, ability: ABILITY_CAST, move: MOVEMENT_SPEED }, attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Sona': { image: "", type: "Sona", alive: true, attackRange: 10, oneStarHealth: 850, twoStarHealth: 1530, threeStarHealth: 2754, oneStarAD: 5, twoStarAD: 9.0, threeStarAD: 16.2, attackSpeed: 0.85, 
			totalMana: 170, mana: 0, abilityPower: 100, armor: 40, magicResist: 40, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: 0.85, ability: ABILITY_CAST, move: MOVEMENT_SPEED }, attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Tahm_Kench': { image: "", type: "Tahm_Kench", alive: true, attackRange: 1, oneStarHealth: 650, twoStarHealth: 1170, threeStarHealth: 2106, oneStarAD: 60, twoStarAD: 108.0, threeStarAD: 194.4, attackSpeed: 0.55, 
			totalMana: 0, mana: 0, abilityPower: 100, armor: 35, magicResist: 35, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: 0.55, ability: ABILITY_CAST, move: MOVEMENT_SPEED }, attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Taric': { image: "", type: "Taric", alive: true, attackRange: 1, oneStarHealth: 650, twoStarHealth: 1170, threeStarHealth: 2106, oneStarAD: 55, twoStarAD: 99.0, threeStarAD: 178.2, attackSpeed: 0.55, 
			totalMana: 140, mana: 50, abilityPower: 100, armor: 40, magicResist: 40, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: 0.55, ability: ABILITY_CAST, move: MOVEMENT_SPEED }, attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Thresh': { image: "", type: "Thresh", alive: true, attackRange: 1, oneStarHealth: 1000, twoStarHealth: 1800, threeStarHealth: 3240, oneStarAD: 60, twoStarAD: 108.0, threeStarAD: 194.4, attackSpeed: 0.65, 
			totalMana: 160, mana: 70, abilityPower: 100, armor: 60, magicResist: 60, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: 0.65, ability: ABILITY_CAST, move: MOVEMENT_SPEED }, attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Twisted_Fate': { image: "", type: "Twisted_Fate", alive: true, attackRange: 4, oneStarHealth: 700, twoStarHealth: 1260, threeStarHealth: 2268, oneStarAD: 45, twoStarAD: 81.0, threeStarAD: 145.8, attackSpeed: 0.75, 
			totalMana: 105, mana: 30, abilityPower: 100, armor: 30, magicResist: 30, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: 0.75, ability: ABILITY_CAST, move: MOVEMENT_SPEED }, attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Twitch': { image: "", type: "Twitch", alive: true, attackRange: 4, oneStarHealth: 550, twoStarHealth: 990, threeStarHealth: 1782, oneStarAD: 50, twoStarAD: 90.0, threeStarAD: 162.0, attackSpeed: 0.7, 
			totalMana: 70, mana: 20, abilityPower: 100, armor: 20, magicResist: 20, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: 0.7, ability: ABILITY_CAST, move: MOVEMENT_SPEED }, attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Urgot': { image: "", type: "Urgot", alive: true, attackRange: 2, oneStarHealth: 750, twoStarHealth: 1350, threeStarHealth: 2430, oneStarAD: 60, twoStarAD: 108.0, threeStarAD: 194.4, attackSpeed: 0.75, 
			totalMana: 20, mana: 0, abilityPower: 100, armor: 45, magicResist: 45, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: 0.75, ability: ABILITY_CAST, move: MOVEMENT_SPEED }, attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Vex': { image: "", type: "Vex", alive: true, attackRange: 4, oneStarHealth: 700, twoStarHealth: 1260, threeStarHealth: 2268, oneStarAD: 40, twoStarAD: 72.0, threeStarAD: 129.6, attackSpeed: 0.7, 
			totalMana: 75, mana: 25, abilityPower: 100, armor: 20, magicResist: 20, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: 0.7, ability: ABILITY_CAST, move: MOVEMENT_SPEED }, attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Vi': { image: "", type: "Vi", alive: true, attackRange: 1, oneStarHealth: 700, twoStarHealth: 1260, threeStarHealth: 2268, oneStarAD: 55, twoStarAD: 99.0, threeStarAD: 178.2, attackSpeed: 0.6, 
			totalMana: 80, mana: 40, abilityPower: 100, armor: 45, magicResist: 45, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: 0.6, ability: ABILITY_CAST, move: MOVEMENT_SPEED }, attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Viego': { image: "", type: "Viego", alive: true, attackRange: 1, oneStarHealth: 1000, twoStarHealth: 1800, threeStarHealth: 3240, oneStarAD: 70, twoStarAD: 126.0, threeStarAD: 226.8, attackSpeed: 0.85, 
			totalMana: 120, mana: 70, abilityPower: 100, armor: 60, magicResist: 60, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: 0.85, ability: ABILITY_CAST, move: MOVEMENT_SPEED }, attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Yasuo': { image: "", type: "Yasuo", alive: true, attackRange: 1, oneStarHealth: 600, twoStarHealth: 1080, threeStarHealth: 1944, oneStarAD: 45, twoStarAD: 81.0, threeStarAD: 145.8, attackSpeed: 0.75, 
			totalMana: 50, mana: 0, abilityPower: 100, armor: 40, magicResist: 40, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: 0.75, ability: ABILITY_CAST, move: MOVEMENT_SPEED }, attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Yone': { image: "", type: "Yone", alive: true, attackRange: 1, oneStarHealth: 750, twoStarHealth: 1350, threeStarHealth: 2430, oneStarAD: 65, twoStarAD: 117.0, threeStarAD: 210.6, attackSpeed: 0.8, 
			totalMana: 70, mana: 0, abilityPower: 100, armor: 40, magicResist: 40, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: 0.8, ability: ABILITY_CAST, move: MOVEMENT_SPEED }, attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Yorick': { image: "", type: "Yorick", alive: true, attackRange: 1, oneStarHealth: 1050, twoStarHealth: 1890, threeStarHealth: 3402, oneStarAD: 88, twoStarAD: 158.4, threeStarAD: 285.12, attackSpeed: 0.8, 
			totalMana: 110, mana: 65, abilityPower: 100, armor: 60, magicResist: 60, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: 0.8, ability: ABILITY_CAST, move: MOVEMENT_SPEED }, attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Zac': { image: "", type: "Zac", alive: true, attackRange: 1, oneStarHealth: 1000, twoStarHealth: 1800, threeStarHealth: 3240, oneStarAD: 50, twoStarAD: 90.0, threeStarAD: 162.0, attackSpeed: 0.65, 
			totalMana: 160, mana: 60, abilityPower: 100, armor: 60, magicResist: 60, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: 0.65, ability: ABILITY_CAST, move: MOVEMENT_SPEED }, attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Zed': { image: "", type: "Zed", alive: true, attackRange: 1, oneStarHealth: 1000, twoStarHealth: 1800, threeStarHealth: 3240, oneStarAD: 75, twoStarAD: 135.0, threeStarAD: 243.0, attackSpeed: 0.9, 
			totalMana: 50, mana: 30, abilityPower: 100, armor: 55, magicResist: 55, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: 0.9, ability: ABILITY_CAST, move: MOVEMENT_SPEED }, attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Ziggs': { image: "", type: "Ziggs", alive: true, attackRange: 4, oneStarHealth: 800, twoStarHealth: 1440, threeStarHealth: 2592, oneStarAD: 45, twoStarAD: 81.0, threeStarAD: 145.8, attackSpeed: 0.8, 
			totalMana: 70, mana: 30, abilityPower: 100, armor: 40, magicResist: 40, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: 0.8, ability: ABILITY_CAST, move: MOVEMENT_SPEED }, attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 }
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