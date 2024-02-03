import ItemsList from './ItemsList';

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
    return (coordinate * 20.3) + (coordinate * 36) + 36 + 158.11;
  }
}

const champions = {
  'Ahri': { image: "https://cdn.mobalytics.gg/assets/tft/images/champions/thumbnail/set10/ahri.jpg?v=52", type: "Ahri", alive: true, attackRange: 4, oneStarHealth: 700, twoStarHealth: 1260, threeStarHealth: 2268, oneStarAD: 40, twoStarAD: 72.0, threeStarAD: 129.6, attackSpeed: Math.round(ATTACK_SPEED/0.75), 
			totalMana: 30, mana: 0, abilityPower: 100, armor: 40, magicResist: 40, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: Math.round(ATTACK_SPEED/0.75), ability: ABILITY_CAST, move: MOVEMENT_SPEED }, traits: ["K/DA", "Spellweaver"], attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Akali KDA': { image: "https://cdn.mobalytics.gg/assets/tft/images/champions/thumbnail/set10/akali.jpg?v=52", type: "Akali KDA", alive: true, attackRange: 1, oneStarHealth: 900, twoStarHealth: 1620, threeStarHealth: 2916, oneStarAD: 70, twoStarAD: 126.0, threeStarAD: 226.8, attackSpeed: Math.round(ATTACK_SPEED/0.85), 
			totalMana: 70, mana: 20, abilityPower: 100, armor: 55, magicResist: 55, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: Math.round(ATTACK_SPEED/0.85), ability: ABILITY_CAST, move: MOVEMENT_SPEED }, traits: ["K/DA", "Executioner", "Breakout"], attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Akali True Damage': { image: "https://cdn.mobalytics.gg/assets/tft/images/champions/thumbnail/set10/akali-true-damage.jpg?v=52", type: "Akali True Damage", alive: true, attackRange: 1, oneStarHealth: 900, twoStarHealth: 1620, threeStarHealth: 2916, oneStarAD: 70, twoStarAD: 126.0, threeStarAD: 226.8, attackSpeed: Math.round(ATTACK_SPEED/0.85), 
			totalMana: 70, mana: 20, abilityPower: 100, armor: 55, magicResist: 55, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: Math.round(ATTACK_SPEED/0.85), ability: ABILITY_CAST, move: MOVEMENT_SPEED }, traits: ["True Damage", "Executioner", "Breakout"], attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Amumu': { image: "https://cdn.mobalytics.gg/assets/tft/images/champions/thumbnail/set10/amumu.jpg?v=52", type: "Amumu", alive: true, attackRange: 1, oneStarHealth: 850, twoStarHealth: 1530, threeStarHealth: 2754, oneStarAD: 45, twoStarAD: 81.0, threeStarAD: 145.8, attackSpeed: Math.round(ATTACK_SPEED/0.65), 
			totalMana: 50, mana: 0, abilityPower: 100, armor: 45, magicResist: 45, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: Math.round(ATTACK_SPEED/0.65), ability: ABILITY_CAST, move: MOVEMENT_SPEED }, traits: ["Emo", "Guardian"], attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Annie': { image: "https://cdn.mobalytics.gg/assets/tft/images/champions/thumbnail/set10/annie.jpg?v=52", type: "Annie", alive: true, attackRange: 4, oneStarHealth: 500, twoStarHealth: 900, threeStarHealth: 1620, oneStarAD: 40, twoStarAD: 72.0, threeStarAD: 129.6, attackSpeed: Math.round(ATTACK_SPEED/0.65), 
			totalMana: 50, mana: 0, abilityPower: 100, armor: 20, magicResist: 20, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: Math.round(ATTACK_SPEED/0.65), ability: ABILITY_CAST, move: MOVEMENT_SPEED }, traits: ["Emo", "Spellweaver"], attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Aphelios': { image: "https://cdn.mobalytics.gg/assets/tft/images/champions/thumbnail/set10/aphelios.jpg?v=52", type: "Aphelios", alive: true, attackRange: 4, oneStarHealth: 600, twoStarHealth: 1080, threeStarHealth: 1944, oneStarAD: 55, twoStarAD: 99.0, threeStarAD: 178.2, attackSpeed: Math.round(ATTACK_SPEED/0.75), 
			totalMana: 120, mana: 40, abilityPower: 100, armor: 20, magicResist: 20, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: Math.round(ATTACK_SPEED/0.75), ability: ABILITY_CAST, move: MOVEMENT_SPEED }, traits: ["Heartsteel", "Rapidfire"], attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Bard': { image: "https://cdn.mobalytics.gg/assets/tft/images/champions/thumbnail/set10/bard.jpg?v=52", type: "Bard", alive: true, attackRange: 4, oneStarHealth: 550, twoStarHealth: 990, threeStarHealth: 1782, oneStarAD: 40, twoStarAD: 72.0, threeStarAD: 129.6, attackSpeed: Math.round(ATTACK_SPEED/0.7), 
			totalMana: 90, mana: 30, abilityPower: 100, armor: 20, magicResist: 20, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: Math.round(ATTACK_SPEED/0.7), ability: ABILITY_CAST, move: MOVEMENT_SPEED }, traits: ["Jazz", "Dazzler"], attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Blitzcrank': { image: "https://cdn.mobalytics.gg/assets/tft/images/champions/thumbnail/set10/blitzcrank.jpg?v=52", type: "Blitzcrank", alive: true, attackRange: 1, oneStarHealth: 1000, twoStarHealth: 1800, threeStarHealth: 3240, oneStarAD: 60, twoStarAD: 108.0, threeStarAD: 194.4, attackSpeed: Math.round(ATTACK_SPEED/0.6), 
			totalMana: 120, mana: 60, abilityPower: 100, armor: 60, magicResist: 60, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: Math.round(ATTACK_SPEED/0.6), ability: ABILITY_CAST, move: MOVEMENT_SPEED }, traits: ["Disco", "Sentinel"], attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Caitlyn': { image: "https://cdn.mobalytics.gg/assets/tft/images/champions/thumbnail/set10/caitlyn.jpg?v=52", type: "Caitlyn", alive: true, attackRange: 4, oneStarHealth: 700, twoStarHealth: 1260, threeStarHealth: 2268, oneStarAD: 70, twoStarAD: 126.0, threeStarAD: 226.8, attackSpeed: Math.round(ATTACK_SPEED/0.8), 
			totalMana: 90, mana: 0, abilityPower: 100, armor: 30, magicResist: 30, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: Math.round(ATTACK_SPEED/0.8), ability: ABILITY_CAST, move: MOVEMENT_SPEED }, traits: ["8-bit", "Rapidfire"], attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Corki': { image: "https://cdn.mobalytics.gg/assets/tft/images/champions/thumbnail/set10/corki.jpg?v=52", type: "Corki", alive: true, attackRange: 4, oneStarHealth: 450, twoStarHealth: 810, threeStarHealth: 1458, oneStarAD: 45, twoStarAD: 81.0, threeStarAD: 145.8, attackSpeed: Math.round(ATTACK_SPEED/0.7), 
			totalMana: 60, mana: 15, abilityPower: 100, armor: 15, magicResist: 15, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: Math.round(ATTACK_SPEED/0.7), ability: ABILITY_CAST, move: MOVEMENT_SPEED }, traits: ["8-bit", "Big Shot"], attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Ekko': { image: "https://cdn.mobalytics.gg/assets/tft/images/champions/thumbnail/set10/ekko.jpg?v=52", type: "Ekko", alive: true, attackRange: 1, oneStarHealth: 850, twoStarHealth: 1530, threeStarHealth: 2754, oneStarAD: 50, twoStarAD: 90.0, threeStarAD: 162.0, attackSpeed: Math.round(ATTACK_SPEED/0.65), 
			totalMana: 125, mana: 50, abilityPower: 100, armor: 45, magicResist: 45, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: Math.round(ATTACK_SPEED/0.65), ability: ABILITY_CAST, move: MOVEMENT_SPEED }, traits: ["True Damage", "Spellweaver", "Sentinel"], attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Evelynn': { image: "https://cdn.mobalytics.gg/assets/tft/images/champions/thumbnail/set10/evelynn.jpg?v=52", type: "Evelynn", alive: true, attackRange: 1, oneStarHealth: 550, twoStarHealth: 990, threeStarHealth: 1782, oneStarAD: 45, twoStarAD: 81.0, threeStarAD: 145.8, attackSpeed: Math.round(ATTACK_SPEED/0.7), 
			totalMana: 90, mana: 30, abilityPower: 100, armor: 35, magicResist: 35, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: Math.round(ATTACK_SPEED/0.7), ability: ABILITY_CAST, move: MOVEMENT_SPEED }, traits: ["K/DA", "Crowd Diver"], attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Ezreal': { image: "https://cdn.mobalytics.gg/assets/tft/images/champions/thumbnail/set10/ezreal.jpg?v=52", type: "Ezreal", alive: true, attackRange: 4, oneStarHealth: 700, twoStarHealth: 1260, threeStarHealth: 2268, oneStarAD: 70, twoStarAD: 126.0, threeStarAD: 226.8, attackSpeed: Math.round(ATTACK_SPEED/0.8), 
			totalMana: 40, mana: 0, abilityPower: 100, armor: 30, magicResist: 30, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: Math.round(ATTACK_SPEED/0.8), ability: ABILITY_CAST, move: MOVEMENT_SPEED }, traits: ["Heartsteel", "Big Shot"], attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Garen': { image: "https://cdn.mobalytics.gg/assets/tft/images/champions/thumbnail/set10/garen.jpg?v=52", type: "Garen", alive: true, attackRange: 1, oneStarHealth: 750, twoStarHealth: 1350, threeStarHealth: 2430, oneStarAD: 55, twoStarAD: 99.0, threeStarAD: 178.2, attackSpeed: Math.round(ATTACK_SPEED/0.7), 
			totalMana: 100, mana: 50, abilityPower: 100, armor: 45, magicResist: 45, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: Math.round(ATTACK_SPEED/0.7), ability: ABILITY_CAST, move: MOVEMENT_SPEED }, traits: ["8-bit", "Sentinel"], attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Gnar': { image: "https://cdn.mobalytics.gg/assets/tft/images/champions/thumbnail/set10/gnar.jpg?v=52", type: "Gnar", alive: true, attackRange: 2, oneStarHealth: 700, twoStarHealth: 1260, threeStarHealth: 2268, oneStarAD: 55, twoStarAD: 99.0, threeStarAD: 178.2, attackSpeed: Math.round(ATTACK_SPEED/0.65), 
			totalMana: 70, mana: 0, abilityPower: 100, armor: 45, magicResist: 45, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: Math.round(ATTACK_SPEED/0.65), ability: ABILITY_CAST, move: MOVEMENT_SPEED }, traits: ["Pentakill", "Superfan", "Mosher"], attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Gragas': { image: "https://cdn.mobalytics.gg/assets/tft/images/champions/thumbnail/set10/gragas.jpg?v=52", type: "Gragas", alive: true, attackRange: 1, oneStarHealth: 750, twoStarHealth: 1350, threeStarHealth: 2430, oneStarAD: 50, twoStarAD: 90.0, threeStarAD: 162.0, attackSpeed: Math.round(ATTACK_SPEED/0.6), 
			totalMana: 80, mana: 0, abilityPower: 100, armor: 45, magicResist: 45, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: Math.round(ATTACK_SPEED/0.6), ability: ABILITY_CAST, move: MOVEMENT_SPEED }, traits: ["Disco", "Spellweaver", "Bruiser"], attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Illaoi': { image: "https://cdn.mobalytics.gg/assets/tft/images/champions/thumbnail/set10/illaoi.jpg?v=52", type: "Illaoi", alive: true, attackRange: 1, oneStarHealth: 1100, twoStarHealth: 1980, threeStarHealth: 3564, oneStarAD: 70, twoStarAD: 126.0, threeStarAD: 226.8, attackSpeed: Math.round(ATTACK_SPEED/0.8), 
			totalMana: 150, mana: 70, abilityPower: 100, armor: 70, magicResist: 70, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: Math.round(ATTACK_SPEED/0.8), ability: ABILITY_CAST, move: MOVEMENT_SPEED }, traits: ["ILLBEATS", "Bruiser"], attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Jax': { image: "https://cdn.mobalytics.gg/assets/tft/images/champions/thumbnail/set10/jax.jpg?v=52", type: "Jax", alive: true, attackRange: 1, oneStarHealth: 750, twoStarHealth: 1350, threeStarHealth: 2430, oneStarAD: 55, twoStarAD: 99.0, threeStarAD: 178.2, attackSpeed: Math.round(ATTACK_SPEED/0.85), 
			totalMana: 120, mana: 50, abilityPower: 100, armor: 35, magicResist: 35, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: Math.round(ATTACK_SPEED/0.85), ability: ABILITY_CAST, move: MOVEMENT_SPEED }, traits: ["EDM", "Mosher"], attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Jhin': { image: "https://cdn.mobalytics.gg/assets/tft/images/champions/thumbnail/set10/jhin.jpg?v=52", type: "Jhin", alive: true, attackRange: 4, oneStarHealth: 850, twoStarHealth: 1530, threeStarHealth: 2754, oneStarAD: 70, twoStarAD: 126.0, threeStarAD: 226.8, attackSpeed: Math.round(ATTACK_SPEED/0.85), 
			totalMana: 30, mana: 0, abilityPower: 100, armor: 30, magicResist: 30, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: Math.round(ATTACK_SPEED/0.85), ability: ABILITY_CAST, move: MOVEMENT_SPEED }, traits: ["Maestro", "Big Shot"], attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Jinx': { image: "https://cdn.mobalytics.gg/assets/tft/images/champions/thumbnail/set10/jinx.jpg?v=52", type: "Jinx", alive: true, attackRange: 4, oneStarHealth: 450, twoStarHealth: 810, threeStarHealth: 1458, oneStarAD: 45, twoStarAD: 81.0, threeStarAD: 145.8, attackSpeed: Math.round(ATTACK_SPEED/0.7), 
			totalMana: 50, mana: 0, abilityPower: 100, armor: 15, magicResist: 15, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: Math.round(ATTACK_SPEED/0.7), ability: ABILITY_CAST, move: MOVEMENT_SPEED }, traits: ["Punk", "Rapidfire"], attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'K\'Sante': { image: "https://cdn.mobalytics.gg/assets/tft/images/champions/thumbnail/set10/ksante.jpg?v=52", type: "K'Sante", alive: true, attackRange: 1, oneStarHealth: 650, twoStarHealth: 1170, threeStarHealth: 2106, oneStarAD: 50, twoStarAD: 90.0, threeStarAD: 162.0, attackSpeed: Math.round(ATTACK_SPEED/0.6), 
			totalMana: 60, mana: 0, abilityPower: 100, armor: 40, magicResist: 40, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: Math.round(ATTACK_SPEED/0.6), ability: ABILITY_CAST, move: MOVEMENT_SPEED }, traits: ["Heartsteel", "Sentinel"], attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Kai\'Sa': { image: "https://cdn.mobalytics.gg/assets/tft/images/champions/thumbnail/set10/kaisa.jpg?v=52", type: "Kai'Sa", alive: true, attackRange: 5, oneStarHealth: 600, twoStarHealth: 1080, threeStarHealth: 1944, oneStarAD: 50, twoStarAD: 90.0, threeStarAD: 162.0, attackSpeed: Math.round(ATTACK_SPEED/0.75), 
			totalMana: 40, mana: 0, abilityPower: 100, armor: 20, magicResist: 20, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: Math.round(ATTACK_SPEED/0.75), ability: ABILITY_CAST, move: MOVEMENT_SPEED }, traits: ["K/DA", "Big Shot"], attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Karthus': { image: "https://cdn.mobalytics.gg/assets/tft/images/champions/thumbnail/set10/karthus.jpg?v=52", type: "Karthus", alive: true, attackRange: 4, oneStarHealth: 700, twoStarHealth: 1260, threeStarHealth: 2268, oneStarAD: 40, twoStarAD: 72.0, threeStarAD: 129.6, attackSpeed: Math.round(ATTACK_SPEED/0.65), 
			totalMana: 125, mana: 25, abilityPower: 100, armor: 30, magicResist: 30, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: Math.round(ATTACK_SPEED/0.65), ability: ABILITY_CAST, move: MOVEMENT_SPEED }, traits: ["Pentakill", "Executioner"], attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Katarina': { image: "https://cdn.mobalytics.gg/assets/tft/images/champions/thumbnail/set10/katarina.jpg?v=52", type: "Katarina", alive: true, attackRange: 2, oneStarHealth: 650, twoStarHealth: 1170, threeStarHealth: 2106, oneStarAD: 40, twoStarAD: 72.0, threeStarAD: 129.6, attackSpeed: Math.round(ATTACK_SPEED/0.7), 
			totalMana: 60, mana: 0, abilityPower: 100, armor: 35, magicResist: 35, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: Math.round(ATTACK_SPEED/0.7), ability: ABILITY_CAST, move: MOVEMENT_SPEED }, traits: ["Country", "Crowd Diver"], attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Kayle': { image: "https://cdn.mobalytics.gg/assets/tft/images/champions/thumbnail/set10/kayle.jpg?v=52", type: "Kayle", alive: true, attackRange: 4, oneStarHealth: 550, twoStarHealth: 990, threeStarHealth: 1782, oneStarAD: 35, twoStarAD: 63.0, threeStarAD: 113.4, attackSpeed: Math.round(ATTACK_SPEED/0.75), 
			totalMana: 30, mana: 0, abilityPower: 100, armor: 20, magicResist: 20, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: Math.round(ATTACK_SPEED/0.75), ability: ABILITY_CAST, move: MOVEMENT_SPEED }, traits: ["Pentakill", "Edgelord"], attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Kayn': { image: "https://cdn.mobalytics.gg/assets/tft/images/champions/thumbnail/set10/kayn.jpg?v=52", type: "Kayn", alive: true, attackRange: 1, oneStarHealth: 1100, twoStarHealth: 1980, threeStarHealth: 3564, oneStarAD: 75, twoStarAD: 135.0, threeStarAD: 243.0, attackSpeed: Math.round(ATTACK_SPEED/0.85), 
			totalMana: 50, mana: 0, abilityPower: 100, armor: 60, magicResist: 60, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: Math.round(ATTACK_SPEED/0.85), ability: ABILITY_CAST, move: MOVEMENT_SPEED }, traits: ["Heartsteel", "Edgelord", "Wildcard"], attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Kennen': { image: "https://cdn.mobalytics.gg/assets/tft/images/champions/thumbnail/set10/kennen.jpg?v=52", type: "Kennen", alive: true, attackRange: 2, oneStarHealth: 650, twoStarHealth: 1170, threeStarHealth: 2106, oneStarAD: 40, twoStarAD: 72.0, threeStarAD: 129.6, attackSpeed: Math.round(ATTACK_SPEED/0.6), 
			totalMana: 90, mana: 30, abilityPower: 100, armor: 40, magicResist: 40, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: Math.round(ATTACK_SPEED/0.6), ability: ABILITY_CAST, move: MOVEMENT_SPEED }, traits: ["True Damage", "Superfan", "Guardian"], attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Lillia': { image: "https://cdn.mobalytics.gg/assets/tft/images/champions/thumbnail/set10/lillia.jpg?v=52", type: "Lillia", alive: true, attackRange: 1, oneStarHealth: 650, twoStarHealth: 1170, threeStarHealth: 2106, oneStarAD: 50, twoStarAD: 90.0, threeStarAD: 162.0, attackSpeed: Math.round(ATTACK_SPEED/0.5), 
			totalMana: 140, mana: 70, abilityPower: 100, armor: 40, magicResist: 40, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: Math.round(ATTACK_SPEED/0.5), ability: ABILITY_CAST, move: MOVEMENT_SPEED }, traits: ["K/DA", "Superfan", "Sentinel"], attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Lucian': { image: "https://cdn.mobalytics.gg/assets/tft/images/champions/thumbnail/set10/lucian.jpg?v=52", type: "Lucian", alive: true, attackRange: 4, oneStarHealth: 850, twoStarHealth: 1530, threeStarHealth: 2754, oneStarAD: 70, twoStarAD: 126.0, threeStarAD: 226.8, attackSpeed: Math.round(ATTACK_SPEED/0.9), 
			totalMana: 125, mana: 50, abilityPower: 100, armor: 30, magicResist: 30, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: Math.round(ATTACK_SPEED/0.9), ability: ABILITY_CAST, move: MOVEMENT_SPEED }, traits: ["Jazz", "Rapidfire"], attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Lulu': { image: "https://cdn.mobalytics.gg/assets/tft/images/champions/thumbnail/set10/lulu.jpg?v=52", type: "Lulu", alive: true, attackRange: 4, oneStarHealth: 650, twoStarHealth: 1170, threeStarHealth: 2106, oneStarAD: 40, twoStarAD: 72.0, threeStarAD: 129.6, attackSpeed: Math.round(ATTACK_SPEED/0.7), 
			totalMana: 40, mana: 0, abilityPower: 100, armor: 20, magicResist: 20, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: Math.round(ATTACK_SPEED/0.7), ability: ABILITY_CAST, move: MOVEMENT_SPEED }, traits: ["Hyperpop", "Spellweaver"], attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Lux': { image: "https://cdn.mobalytics.gg/assets/tft/images/champions/thumbnail/set10/lux.jpg?v=52", type: "Lux", alive: true, attackRange: 4, oneStarHealth: 700, twoStarHealth: 1260, threeStarHealth: 2268, oneStarAD: 40, twoStarAD: 72.0, threeStarAD: 129.6, attackSpeed: Math.round(ATTACK_SPEED/0.7), 
			totalMana: 75, mana: 15, abilityPower: 100, armor: 20, magicResist: 20, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: Math.round(ATTACK_SPEED/0.7), ability: ABILITY_CAST, move: MOVEMENT_SPEED }, traits: ["EDM", "Dazzler"], attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Miss Fortune': { image: "https://cdn.mobalytics.gg/assets/tft/images/champions/thumbnail/set10/missfortune.jpg?v=52", type: "Miss Fortune", alive: true, attackRange: 4, oneStarHealth: 650, twoStarHealth: 1170, threeStarHealth: 2106, oneStarAD: 30, twoStarAD: 54.0, threeStarAD: 97.2, attackSpeed: Math.round(ATTACK_SPEED/0.75), 
			totalMana: 60, mana: 0, abilityPower: 100, armor: 20, magicResist: 20, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: Math.round(ATTACK_SPEED/0.75), ability: ABILITY_CAST, move: MOVEMENT_SPEED }, traits: ["Jazz", "Big Shot"], attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Mordekaiser': { image: "https://cdn.mobalytics.gg/assets/tft/images/champions/thumbnail/set10/mordekaiser.jpg?v=52", type: "Mordekaiser", alive: true, attackRange: 1, oneStarHealth: 850, twoStarHealth: 1530, threeStarHealth: 2754, oneStarAD: 60, twoStarAD: 108.0, threeStarAD: 194.4, attackSpeed: Math.round(ATTACK_SPEED/0.65), 
			totalMana: 120, mana: 70, abilityPower: 100, armor: 55, magicResist: 55, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: Math.round(ATTACK_SPEED/0.65), ability: ABILITY_CAST, move: MOVEMENT_SPEED }, traits: ["Pentakill", "Sentinel"], attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Nami': { image: "https://cdn.mobalytics.gg/assets/tft/images/champions/thumbnail/set10/nami.jpg?v=52", type: "Nami", alive: true, attackRange: 4, oneStarHealth: 450, twoStarHealth: 810, threeStarHealth: 1458, oneStarAD: 40, twoStarAD: 72.0, threeStarAD: 129.6, attackSpeed: Math.round(ATTACK_SPEED/0.75), 
			totalMana: 75, mana: 15, abilityPower: 100, armor: 15, magicResist: 15, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: Math.round(ATTACK_SPEED/0.75), ability: ABILITY_CAST, move: MOVEMENT_SPEED }, traits: ["Disco", "Dazzler"], attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Neeko': { image: "https://cdn.mobalytics.gg/assets/tft/images/champions/thumbnail/set10/neeko.jpg?v=52", type: "Neeko", alive: true, attackRange: 1, oneStarHealth: 850, twoStarHealth: 1530, threeStarHealth: 2754, oneStarAD: 50, twoStarAD: 90.0, threeStarAD: 162.0, attackSpeed: Math.round(ATTACK_SPEED/0.6), 
			totalMana: 90, mana: 0, abilityPower: 100, armor: 50, magicResist: 50, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: Math.round(ATTACK_SPEED/0.6), ability: ABILITY_CAST, move: MOVEMENT_SPEED }, traits: ["K/DA", "Superfan", "Guardian"], attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Olaf': { image: "https://cdn.mobalytics.gg/assets/tft/images/champions/thumbnail/set10/olaf.jpg?v=52", type: "Olaf", alive: true, attackRange: 1, oneStarHealth: 650, twoStarHealth: 1170, threeStarHealth: 2106, oneStarAD: 55, twoStarAD: 99.0, threeStarAD: 178.2, attackSpeed: Math.round(ATTACK_SPEED/0.65), 
			totalMana: 0, mana: 0, abilityPower: 100, armor: 40, magicResist: 40, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: Math.round(ATTACK_SPEED/0.65), ability: ABILITY_CAST, move: MOVEMENT_SPEED }, traits: ["Pentakill", "Bruiser"], attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Pantheon': { image: "https://cdn.mobalytics.gg/assets/tft/images/champions/thumbnail/set10/pantheon.jpg?v=52", type: "Pantheon", alive: true, attackRange: 1, oneStarHealth: 700, twoStarHealth: 1260, threeStarHealth: 2268, oneStarAD: 55, twoStarAD: 99.0, threeStarAD: 178.2, attackSpeed: Math.round(ATTACK_SPEED/0.6), 
			totalMana: 60, mana: 0, abilityPower: 100, armor: 45, magicResist: 45, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: Math.round(ATTACK_SPEED/0.6), ability: ABILITY_CAST, move: MOVEMENT_SPEED }, traits: ["Punk", "Guardian"], attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Poppy': { image: "https://cdn.mobalytics.gg/assets/tft/images/champions/thumbnail/set10/poppy.jpg?v=52", type: "Poppy", alive: true, attackRange: 1, oneStarHealth: 1000, twoStarHealth: 1800, threeStarHealth: 3240, oneStarAD: 60, twoStarAD: 108.0, threeStarAD: 194.4, attackSpeed: Math.round(ATTACK_SPEED/0.65), 
			totalMana: 100, mana: 30, abilityPower: 100, armor: 65, magicResist: 65, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: Math.round(ATTACK_SPEED/0.65), ability: ABILITY_CAST, move: MOVEMENT_SPEED }, traits: ["Emo", "Mosher"], attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Qiyana': { image: "https://cdn.mobalytics.gg/assets/tft/images/champions/thumbnail/set10/qiyana.jpg?v=52", type: "Qiyana", alive: true, attackRange: 1, oneStarHealth: 950, twoStarHealth: 1710, threeStarHealth: 3078, oneStarAD: 75, twoStarAD: 135.0, threeStarAD: 243.0, attackSpeed: Math.round(ATTACK_SPEED/0.9), 
			totalMana: 40, mana: 0, abilityPower: 100, armor: 60, magicResist: 60, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: Math.round(ATTACK_SPEED/0.9), ability: ABILITY_CAST, move: MOVEMENT_SPEED }, traits: ["True Damage", "Crowd Diver"], attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Riven': { image: "https://cdn.mobalytics.gg/assets/tft/images/champions/thumbnail/set10/riven.jpg?v=52", type: "Riven", alive: true, attackRange: 1, oneStarHealth: 800, twoStarHealth: 1440, threeStarHealth: 2592, oneStarAD: 60, twoStarAD: 108.0, threeStarAD: 194.4, attackSpeed: Math.round(ATTACK_SPEED/0.75), 
			totalMana: 100, mana: 50, abilityPower: 100, armor: 40, magicResist: 40, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: Math.round(ATTACK_SPEED/0.75), ability: ABILITY_CAST, move: MOVEMENT_SPEED }, traits: ["8-bit", "Edgelord"], attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Samira': { image: "https://cdn.mobalytics.gg/assets/tft/images/champions/thumbnail/set10/samira.jpg?v=52", type: "Samira", alive: true, attackRange: 4, oneStarHealth: 600, twoStarHealth: 1080, threeStarHealth: 1944, oneStarAD: 60, twoStarAD: 108.0, threeStarAD: 194.4, attackSpeed: Math.round(ATTACK_SPEED/0.7), 
			totalMana: 100, mana: 0, abilityPower: 100, armor: 20, magicResist: 20, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: Math.round(ATTACK_SPEED/0.7), ability: ABILITY_CAST, move: MOVEMENT_SPEED }, traits: ["Country", "Executioner"], attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Senna': { image: "https://cdn.mobalytics.gg/assets/tft/images/champions/thumbnail/set10/senna.jpg?v=52", type: "Senna", alive: true, attackRange: 4, oneStarHealth: 600, twoStarHealth: 1080, threeStarHealth: 1944, oneStarAD: 40, twoStarAD: 72.0, threeStarAD: 129.6, attackSpeed: Math.round(ATTACK_SPEED/0.7), 
			totalMana: 90, mana: 30, abilityPower: 100, armor: 20, magicResist: 20, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: Math.round(ATTACK_SPEED/0.7), ability: ABILITY_CAST, move: MOVEMENT_SPEED }, traits: ["True Damage", "Rapidfire"], attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Seraphine': { image: "https://cdn.mobalytics.gg/assets/tft/images/champions/thumbnail/set10/seraphine.jpg?v=52", type: "Seraphine", alive: true, attackRange: 4, oneStarHealth: 550, twoStarHealth: 990, threeStarHealth: 1782, oneStarAD: 40, twoStarAD: 72.0, threeStarAD: 129.6, attackSpeed: Math.round(ATTACK_SPEED/0.7), 
			totalMana: 60, mana: 0, abilityPower: 100, armor: 25, magicResist: 25, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: Math.round(ATTACK_SPEED/0.7), ability: ABILITY_CAST, move: MOVEMENT_SPEED }, traits: ["K/DA", "Spellweaver"], attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Sett': { image: "https://cdn.mobalytics.gg/assets/tft/images/champions/thumbnail/set10/sett.jpg?v=52", type: "Sett", alive: true, attackRange: 1, oneStarHealth: 950, twoStarHealth: 1710, threeStarHealth: 3078, oneStarAD: 55, twoStarAD: 99.0, threeStarAD: 178.2, attackSpeed: Math.round(ATTACK_SPEED/0.7), 
			totalMana: 90, mana: 30, abilityPower: 100, armor: 45, magicResist: 45, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: Math.round(ATTACK_SPEED/0.7), ability: ABILITY_CAST, move: MOVEMENT_SPEED }, traits: ["Heartsteel", "Bruiser", "Mosher"], attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Sona': { image: "https://cdn.mobalytics.gg/assets/tft/images/champions/thumbnail/set10/sona.jpg?v=52", type: "Sona", alive: true, attackRange: 10, oneStarHealth: 850, twoStarHealth: 1530, threeStarHealth: 2754, oneStarAD: 5, twoStarAD: 9.0, threeStarAD: 16.2, attackSpeed: Math.round(ATTACK_SPEED/0.85), 
			totalMana: 170, mana: 0, abilityPower: 100, armor: 40, magicResist: 40, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: Math.round(ATTACK_SPEED/0.85), ability: ABILITY_CAST, move: MOVEMENT_SPEED }, traits: ["Mixmaster", "Spellweaver"], attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Tahm Kench': { image: "https://cdn.mobalytics.gg/assets/tft/images/champions/thumbnail/set10/tahmkench.jpg?v=52", type: "Tahm Kench", alive: true, attackRange: 1, oneStarHealth: 650, twoStarHealth: 1170, threeStarHealth: 2106, oneStarAD: 60, twoStarAD: 108.0, threeStarAD: 194.4, attackSpeed: Math.round(ATTACK_SPEED/0.55), 
			totalMana: 0, mana: 0, abilityPower: 100, armor: 35, magicResist: 35, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: Math.round(ATTACK_SPEED/0.55), ability: ABILITY_CAST, move: MOVEMENT_SPEED }, traits: ["Country", "Bruiser"], attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Taric': { image: "https://cdn.mobalytics.gg/assets/tft/images/champions/thumbnail/set10/taric.jpg?v=52", type: "Taric", alive: true, attackRange: 1, oneStarHealth: 650, twoStarHealth: 1170, threeStarHealth: 2106, oneStarAD: 55, twoStarAD: 99.0, threeStarAD: 178.2, attackSpeed: Math.round(ATTACK_SPEED/0.55), 
			totalMana: 140, mana: 50, abilityPower: 100, armor: 40, magicResist: 40, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: Math.round(ATTACK_SPEED/0.55), ability: ABILITY_CAST, move: MOVEMENT_SPEED }, traits: ["Disco", "Guardian"], attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Thresh': { image: "https://cdn.mobalytics.gg/assets/tft/images/champions/thumbnail/set10/tresh.jpg?v=52", type: "Thresh", alive: true, attackRange: 1, oneStarHealth: 1000, twoStarHealth: 1800, threeStarHealth: 3240, oneStarAD: 60, twoStarAD: 108.0, threeStarAD: 194.4, attackSpeed: Math.round(ATTACK_SPEED/0.65), 
			totalMana: 160, mana: 70, abilityPower: 100, armor: 60, magicResist: 60, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: Math.round(ATTACK_SPEED/0.65), ability: ABILITY_CAST, move: MOVEMENT_SPEED }, traits: ["Country", "Guardian"], attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Twisted Fate': { image: "https://cdn.mobalytics.gg/assets/tft/images/champions/thumbnail/set10/twistedfate.jpg?v=52", type: "Twisted Fate", alive: true, attackRange: 4, oneStarHealth: 700, twoStarHealth: 1260, threeStarHealth: 2268, oneStarAD: 45, twoStarAD: 81.0, threeStarAD: 145.8, attackSpeed: Math.round(ATTACK_SPEED/0.75), 
			totalMana: 105, mana: 30, abilityPower: 100, armor: 30, magicResist: 30, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: Math.round(ATTACK_SPEED/0.75), ability: ABILITY_CAST, move: MOVEMENT_SPEED }, traits: ["Disco", "Dazzler"], attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Twitch': { image: "https://cdn.mobalytics.gg/assets/tft/images/champions/thumbnail/set10/twitch.jpg?v=52", type: "Twitch", alive: true, attackRange: 4, oneStarHealth: 550, twoStarHealth: 990, threeStarHealth: 1782, oneStarAD: 50, twoStarAD: 90.0, threeStarAD: 162.0, attackSpeed: Math.round(ATTACK_SPEED/0.7), 
			totalMana: 70, mana: 20, abilityPower: 100, armor: 20, magicResist: 20, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: Math.round(ATTACK_SPEED/0.7), ability: ABILITY_CAST, move: MOVEMENT_SPEED }, traits: ["Punk", "Executioner"], attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Urgot': { image: "https://cdn.mobalytics.gg/assets/tft/images/champions/thumbnail/set10/urgot.jpg?v=52", type: "Urgot", alive: true, attackRange: 2, oneStarHealth: 750, twoStarHealth: 1350, threeStarHealth: 2430, oneStarAD: 60, twoStarAD: 108.0, threeStarAD: 194.4, attackSpeed: Math.round(ATTACK_SPEED/0.75), 
			totalMana: 20, mana: 0, abilityPower: 100, armor: 45, magicResist: 45, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: Math.round(ATTACK_SPEED/0.75), ability: ABILITY_CAST, move: MOVEMENT_SPEED }, traits: ["Country", "Mosher"], attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Vex': { image: "https://cdn.mobalytics.gg/assets/tft/images/champions/thumbnail/set10/vex.jpg?v=52", type: "Vex", alive: true, attackRange: 4, oneStarHealth: 700, twoStarHealth: 1260, threeStarHealth: 2268, oneStarAD: 40, twoStarAD: 72.0, threeStarAD: 129.6, attackSpeed: Math.round(ATTACK_SPEED/0.7), 
			totalMana: 75, mana: 25, abilityPower: 100, armor: 20, magicResist: 20, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: Math.round(ATTACK_SPEED/0.7), ability: ABILITY_CAST, move: MOVEMENT_SPEED }, traits: ["Emo", "Executioner"], attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Vi': { image: "https://cdn.mobalytics.gg/assets/tft/images/champions/thumbnail/set10/vi.jpg?v=52", type: "Vi", alive: true, attackRange: 1, oneStarHealth: 700, twoStarHealth: 1260, threeStarHealth: 2268, oneStarAD: 55, twoStarAD: 99.0, threeStarAD: 178.2, attackSpeed: Math.round(ATTACK_SPEED/0.6), 
			totalMana: 80, mana: 40, abilityPower: 100, armor: 45, magicResist: 45, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: Math.round(ATTACK_SPEED/0.6), ability: ABILITY_CAST, move: MOVEMENT_SPEED }, traits: ["Punk", "Mosher"], attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Viego': { image: "https://cdn.mobalytics.gg/assets/tft/images/champions/thumbnail/set10/viego.jpg?v=52", type: "Viego", alive: true, attackRange: 1, oneStarHealth: 1000, twoStarHealth: 1800, threeStarHealth: 3240, oneStarAD: 70, twoStarAD: 126.0, threeStarAD: 226.8, attackSpeed: Math.round(ATTACK_SPEED/0.85), 
			totalMana: 120, mana: 70, abilityPower: 100, armor: 60, magicResist: 60, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: Math.round(ATTACK_SPEED/0.85), ability: ABILITY_CAST, move: MOVEMENT_SPEED }, traits: ["Pentakill", "Edgelord"], attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Yasuo': { image: "https://cdn.mobalytics.gg/assets/tft/images/champions/thumbnail/set10/yasuo.jpg?v=52", type: "Yasuo", alive: true, attackRange: 1, oneStarHealth: 600, twoStarHealth: 1080, threeStarHealth: 1944, oneStarAD: 45, twoStarAD: 81.0, threeStarAD: 145.8, attackSpeed: Math.round(ATTACK_SPEED/0.75), 
			totalMana: 50, mana: 0, abilityPower: 100, armor: 40, magicResist: 40, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: Math.round(ATTACK_SPEED/0.75), ability: ABILITY_CAST, move: MOVEMENT_SPEED }, traits: ["True Damage", "Edgelord"], attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Yone': { image: "https://cdn.mobalytics.gg/assets/tft/images/champions/thumbnail/set10/yone.jpg?v=52", type: "Yone", alive: true, attackRange: 1, oneStarHealth: 750, twoStarHealth: 1350, threeStarHealth: 2430, oneStarAD: 65, twoStarAD: 117.0, threeStarAD: 210.6, attackSpeed: Math.round(ATTACK_SPEED/0.8), 
			totalMana: 70, mana: 0, abilityPower: 100, armor: 40, magicResist: 40, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: Math.round(ATTACK_SPEED/0.8), ability: ABILITY_CAST, move: MOVEMENT_SPEED }, traits: ["Heartsteel", "Edgelord", "Crowd Diver"], attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Yorick': { image: "https://cdn.mobalytics.gg/assets/tft/images/champions/thumbnail/set10/yorick.jpg?v=52", type: "Yorick", alive: true, attackRange: 1, oneStarHealth: 1050, twoStarHealth: 1890, threeStarHealth: 3402, oneStarAD: 88, twoStarAD: 158.4, threeStarAD: 285.12, attackSpeed: Math.round(ATTACK_SPEED/0.8), 
			totalMana: 110, mana: 65, abilityPower: 100, armor: 60, magicResist: 60, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: Math.round(ATTACK_SPEED/0.8), ability: ABILITY_CAST, move: MOVEMENT_SPEED }, traits: ["Pentakill", "Mosher", "Guardian"], attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Zac': { image: "https://cdn.mobalytics.gg/assets/tft/images/champions/thumbnail/set10/zac.jpg?v=52", type: "Zac", alive: true, attackRange: 1, oneStarHealth: 1000, twoStarHealth: 1800, threeStarHealth: 3240, oneStarAD: 50, twoStarAD: 90.0, threeStarAD: 162.0, attackSpeed: Math.round(ATTACK_SPEED/0.65), 
			totalMana: 160, mana: 60, abilityPower: 100, armor: 60, magicResist: 60, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: Math.round(ATTACK_SPEED/0.65), ability: ABILITY_CAST, move: MOVEMENT_SPEED }, traits: ["EDM", "Bruiser"], attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Zed': { image: "https://cdn.mobalytics.gg/assets/tft/images/champions/thumbnail/set10/zed.jpg?v=52", type: "Zed", alive: true, attackRange: 1, oneStarHealth: 1000, twoStarHealth: 1800, threeStarHealth: 3240, oneStarAD: 75, twoStarAD: 135.0, threeStarAD: 243.0, attackSpeed: Math.round(ATTACK_SPEED/0.9), 
			totalMana: 50, mana: 30, abilityPower: 100, armor: 55, magicResist: 55, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: Math.round(ATTACK_SPEED/0.9), ability: ABILITY_CAST, move: MOVEMENT_SPEED }, traits: ["EDM", "Crowd Diver"], attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 },
  'Ziggs': { image: "https://cdn.mobalytics.gg/assets/tft/images/champions/thumbnail/set10/ziggs.jpg?v=52", type: "Ziggs", alive: true, attackRange: 4, oneStarHealth: 800, twoStarHealth: 1440, threeStarHealth: 2592, oneStarAD: 45, twoStarAD: 81.0, threeStarAD: 145.8, attackSpeed: Math.round(ATTACK_SPEED/0.8), 
			totalMana: 70, mana: 30, abilityPower: 100, armor: 40, magicResist: 40, castingAttack: false, castingAbility: false, projectiles: [], abilityCastTime: ABILITY_CAST, movementSpeed: MOVEMENT_SPEED, 
			iterationsRemaining: { attack: Math.round(ATTACK_SPEED/0.8), ability: ABILITY_CAST, move: MOVEMENT_SPEED }, traits: ["Hyperpop", "Dazzler"], attackProjectileSpeed: ATTACK_PROJECTILE, abilityProjectileSpeed: ABILITY_PROJECTILE, stats: [], criticalChance: 0.25, criticalDamage: 1.40 }
}

function ChampionsList(championList, team, enemyPositions=[]) {
  var returnList = [];
  var column = 0;
  var row = 7;

  if (team === 'enemy') {
    for (var i = 0; i < championList.length; i++) {
      const championPair = championList[i];
      const champion = champions[championPair[0]];
      const starLevel = championPair[1];
      const headliner = championPair[2];
      const items = championPair[3];

      const left = enemyPositions[i][0];
      const top = enemyPositions[i][1];

      if (starLevel === 1) {
        const newChampion = { ...champion, index: i, team: team, hexagonPosition: { left: left, top: top }, currentPosition: { left: convertToPixels(left, 'left', top%2 === 1) - 25, top: convertToPixels(top, 'top', top%2 === 1) - 25 }, 
                          items: items, headliner: headliner, starLevel: starLevel, health: champion.oneStarHealth, originalHealth: champion.oneStarHealth, attackDamage: champion.oneStarAD };
        returnList.push(ItemsList(newChampion));
      } else if (starLevel === 2) {
        const newChampion = { ...champion, index: i, team: team, hexagonPosition: { left: left, top: top }, currentPosition: { left: convertToPixels(left, 'left', top%2 === 1) - 25, top: convertToPixels(top, 'top', top%2 === 1) - 25 }, 
                          items: items, headliner: headliner, starLevel: starLevel, health: champion.twoStarHealth, originalHealth: champion.twoStarHealth, attackDamage: champion.twoStarAD };
        returnList.push(ItemsList(newChampion));
      } else {
        const newChampion = { ...champion, index: i, team: team, hexagonPosition: { left: left, top: top }, currentPosition: { left: convertToPixels(left, 'left', top%2 === 1) - 25, top: convertToPixels(top, 'top', top%2 === 1) - 25 }, 
                          items: items, headliner: headliner, starLevel: starLevel, health: champion.threeStarHealth, originalHealth: champion.threeStarHealth, attackDamage: champion.threeStarAD };
        returnList.push(ItemsList(newChampion));
      }
    }
  } else {
    for (var i = 0; i < championList.length; i++) {
      const championPair = championList[i];
      const champion = champions[championPair[0]];
      const starLevel = championPair[1];
      const headliner = championPair[2];
      const items = championPair[3];
  
      if (starLevel === 1) {
        const newChampion = { ...champion, index: i, team: team, hexagonPosition: { left: column, top: row }, currentPosition: { left: convertToPixels(column, 'left', row%2 === 1) - 25, top: convertToPixels(row, 'top', row%2 === 1) - 25 }, 
                          items: items, headliner: headliner, starLevel: starLevel, health: champion.oneStarHealth, originalHealth: champion.oneStarHealth, attackDamage: champion.oneStarAD, originalMagicResist: champion.magicResist,
                          originalArmor: champion.armor, shield: 0, damageReduction: 0, damageExtra: 0, oncePerCombat: [], basedOnTarget: [], onAttackAbility: [], statusEffectOnAttack: [], constantThreshold: [] };
        returnList.push(ItemsList(newChampion));
      } else if (starLevel === 2) {
        const newChampion = { ...champion, index: i, team: team, hexagonPosition: { left: column, top: row }, currentPosition: { left: convertToPixels(column, 'left', row%2 === 1) - 25, top: convertToPixels(row, 'top', row%2 === 1) - 25 }, 
                          items: items, headliner: headliner, starLevel: starLevel, health: champion.twoStarHealth, originalHealth: champion.twoStarHealth, attackDamage: champion.twoStarAD, originalMagicResist: champion.magicResist,
                          originalArmor: champion.armor, shield: 0, damageReduction: 0, damageExtra: 0, oncePerCombat: [], basedOnTarget: [], onAttackAbility: [], statusEffectOnAttack: [], constantThreshold: [] };
        returnList.push(ItemsList(newChampion));
      } else {
        const newChampion = { ...champion, index: i, team: team, hexagonPosition: { left: column, top: row }, currentPosition: { left: convertToPixels(column, 'left', row%2 === 1) - 25, top: convertToPixels(row, 'top', row%2 === 1) - 25 }, 
                          items: items, headliner: headliner, starLevel: starLevel, health: champion.threeStarHealth, originalHealth: champion.threeStarHealth, attackDamage: champion.threeStarAD, originalMagicResist: champion.magicResist,
                          originalArmor: champion.armor, shield: 0, damageReduction: 0, damageExtra: 0, oncePerCombat: [], basedOnTarget: [], onAttackAbility: [], statusEffectOnAttack: [], constantThreshold: [] };
        returnList.push(ItemsList(newChampion));
      }
  
      column = column + 1;
      if (column >= 7) {
        column = 0;
        row = row - 1;
      }
    }
  }
  return returnList;
}

export default ChampionsList;
export { ATTACK_SPEED, MOVEMENT_SPEED };