const MOVEMENT_SPEED = 30;

const items = {
  'B.F. Sword': { image: "https://rerollcdn.com/items/BFSword.png", type: "B.F. Sword", flatStats: { attackDamage: 10 }, percentStats: {}, description: "10 Attack Damage.", onAttackAbility: {}, oncePerCombat: {}, everyXSeconds: {}, basedOnTarget: {}, statusEffectOnAttack: {}, constantThreshold: {} },
  'Chain Vest': { image: "https://rerollcdn.com/items/ChainVest.png", type: "Chain Vest", flatStats: { armor: 20 }, percentStats: {}, description: "20 Armor.", onAttackAbility: {}, oncePerCombat: {}, everyXSeconds: {}, basedOnTarget: {}, statusEffectOnAttack: {}, constantThreshold: {} },
  "Giant\'s Belt": { image: "https://rerollcdn.com/items/GiantsBelt.png", type: "Giant's Belt", flatStats: { heatlh: 150, originalHealth: 150 }, percentStats: {}, description: "150 Health.", onAttackAbility: {}, oncePerCombat: {}, everyXSeconds: {}, basedOnTarget: {}, statusEffectOnAttack: {}, constantThreshold: {} },
  'Needlessly Large Rod': { image: "https://rerollcdn.com/items/NeedlesslyLargeRod.png", type: "Needlessly Large Rod", flatStats: { abilityPower: 10 }, percentStats: {}, description: "10 Ability Power.", onAttackAbility: {}, oncePerCombat: {}, everyXSeconds: {}, basedOnTarget: {}, statusEffectOnAttack: {}, constantThreshold: {} },
  'Negatron Cloak': { image: "https://rerollcdn.com/items/NegatronCloak.png", type: "Negatron Cloak", flatStats: { magicResist: 20 }, percentStats: {}, description: "20 Magic Resist.", onAttackAbility: {}, oncePerCombat: {}, everyXSeconds: {}, basedOnTarget: {}, statusEffectOnAttack: {}, constantThreshold: {} },
  'Recurve Bow': { image: "https://rerollcdn.com/items/RecurveBow.png", type: "Recurve Bow", flatStats: {}, percentStats: { attackSpeed: 0.1 }, description: "10% Attack Speed.", onAttackAbility: {}, oncePerCombat: {}, everyXSeconds: {}, basedOnTarget: {}, statusEffectOnAttack: {}, constantThreshold: {} },
  'Sparring Gloves': { image: "https://rerollcdn.com/items/SparringGloves.png", type: "Sparring Gloves", flatStats: { criticalChance: 0.2 }, percentStats: {}, description: "20% Critical Chance.", onAttackAbility: {}, oncePerCombat: {}, everyXSeconds: {}, basedOnTarget: {}, statusEffectOnAttack: {}, constantThreshold: {} },
  'Tear of the Goddess': { image: "https://rerollcdn.com/items/TearoftheGoddess.png", type: "Tear of the Goddess", flatStats: { mana: 15 }, percentStats: {}, description: "15 Mana.", onAttackAbility: {}, oncePerCombat: {}, everyXSeconds: {}, basedOnTarget: {}, statusEffectOnAttack: {}, constantThreshold: {} },
  "Warmog's Armor": { image: "https://rerollcdn.com/items/WarmogsArmor.png", type: "Warmog's Armor", flatStats: { health: 800, originalHealth: 800 }, percentStats: {}, description: "800 Health.", onAttackAbility: {}, oncePerCombat: {}, everyXSeconds: {}, basedOnTarget: {}, statusEffectOnAttack: {}, constantThreshold: {} },
  "Deathblade": { image: "https://rerollcdn.com/items/Deathblade.png", type: "Deathblade", flatStats: {}, percentStats: { attackDamage: 0.66 }, description: "66% Attack Damage.", onAttackAbility: {}, oncePerCombat: {}, everyXSeconds: {}, basedOnTarget: {}, statusEffectOnAttack: {}, constantThreshold: {} },
  "Spear of Shojin": { image: "https://rerollcdn.com/items/SpearofShojin.png", type: "Spear of Shojin", flatStats: { mana: 15, abilityPower: 20 }, percentStats: { attackDamage: 0.20 }, description: "Attacks grant 5 bonus Mana.", 
    onAttackAbility: { type: 'mana', value: 5 }, oncePerCombat: {}, everyXSeconds: {}, basedOnTarget: {}, statusEffectOnAttack: {}, constantThreshold: {} }, 
  "Guinsoo's Rageblade": { image: "https://rerollcdn.com/items/GuinsoosRageblade.png", type: "Guinsoo's Rageblade", flatStats: { abilityPower: 10 }, percentStats: { attackSpeed: 0.18 }, description: "Attacks grant 4% bonus Attack Speed.", 
    onAttackAbility: { type: 'attackSpeed', value: 0.04 }, oncePerCombat: {}, everyXSeconds: {}, basedOnTarget: {}, statusEffectOnAttack: {}, constantThreshold: {} },
  "Protector's Vow": { image: "https://rerollcdn.com/items/ProtectorsVow.png", type: "Protector's Vow", flatStats: { mana: 30, armor: 20 }, percentStats: {}, description: "Once per combat at 40% Health, gain a 25% max Health shield that lasts up to 5 seconds and gain 20 Armor and Magic Resist.", 
    onAttackAbility: {}, oncePerCombat: { health: 0.4, type: [ { type: 'armor', value: 20 }, { type: 'magicResist', value: 20 }, { type: 'shield', value: 0.25 } ] }, everyXSeconds: {}, basedOnTarget: {}, statusEffectOnAttack: {}, constantThreshold: {} },
  "Dragon's Claw": { image: "https://rerollcdn.com/items/DragonsClaw.png", type: "Dragon's Claw", flatStats: { magicResist: 65 }, percentStats: {}, description: "Every 2 seconds, regenerate 10% maximum Health.", 
    onAttackAbility: {}, oncePerCombat: {}, everyXSeconds: { type: 'dragonClaw', iteration: 2 * MOVEMENT_SPEED }, basedOnTarget: {}, statusEffectOnAttack: {}, constantThreshold: {} },
  "Giant Slayer": { image: "https://rerollcdn.com/items/GiantSlayer.png", type: "Giant Slayer", flatStats: { abilityPower: 20 }, percentStats: { attackSpeed: 0.10, attackDamage: 0.30 }, description: "Deal 25% more damage to enemies with more than 1600 maximum Health.", 
    onAttackAbility: {}, oncePerCombat: {}, everyXSeconds: {}, basedOnTarget: { type: 'giantSlayer' }, statusEffectOnAttack: {}, constantThreshold: {} },
  "Last Whisper": { image: "https://rerollcdn.com/items/LastWhisper.png", type: "Last Whisper", flatStats: { criticalChance: 0.2 }, percentStats: { attackSpeed: 0.25, attackDamage: 0.15 }, description: "Physical damage 30% Sunders the target for 3 seconds. This effect does not stack.", 
    onAttackAbility: {}, oncePerCombat: {}, everyXSeconds: {}, basedOnTarget: {}, statusEffectOnAttack: { type: 'lastWhisper' }, constantThreshold: {} },
  "Steadfast Heart": { image: "https://rerollcdn.com/items/SteadfastHeart.png", type: "Steadfast Heart", flatStats: { armor: 20, criticalChance: 0.2 }, percentStats: {}, description: "Take 8% less damage. While above 50% Health, take 15% less damage instead.", 
    onAttackAbility: {}, oncePerCombat: {}, everyXSeconds: {}, basedOnTarget: {}, statusEffectOnAttack: {}, constantThreshold: { type: 'steadfastHeart', baseState: true } },
  "Rabadon's Deathcap": { image: "https://rerollcdn.com/items/RabadonsDeathcap.png", type: "Rabadon's Deathcap", flatStats: { damageExtra: 0.2, abilityPower: 50 }, percentStats: {}, description: "Deal 20% bonus damage.", 
    onAttackAbility: {}, oncePerCombat: {}, everyXSeconds: {}, basedOnTarget: {}, statusEffectOnAttack: {}, constantThreshold: {} },
  "Archangel's Staff": { image: "https://rerollcdn.com/items/ArchangelsStaff.png", type: "Archangel's Staff", flatStats: { abilityPower: 20, mana: 15 }, percentStats: {}, description: "Combat start: Gain 30 Ability Power every 5 seconds in combat.", 
    onAttackAbility: {}, oncePerCombat: {}, everyXSeconds: { type: 'archangelStaff', iteration: 5 * MOVEMENT_SPEED }, basedOnTarget: {}, statusEffectOnAttack: {}, constantThreshold: {} },
  "Sterak's Gage": { image: "https://rerollcdn.com/items/SteraksGage.png", type: "Sterak's Gage", flatStats: { health: 200, originalHealth: 200 }, percentStats: { attackDamage: 0.15 }, description: "Once per combat at 60% Health, gain 20% max Health and 35% Attack Damage.", 
    onAttackAbility: {}, oncePerCombat: { health: 0.6, type: [ { type: 'originalHealth', value: 0.2 }, { type: 'attackDamage', value: 0.35 } ] }, everyXSeconds: {}, basedOnTarget: {}, statusEffectOnAttack: {}, constantThreshold: {} },
  "Infinity Edge": { image: "https://rerollcdn.com/items/InfinityEdge.png", type: "Infinity Edge", flatStats: { criticalChance: 0.35 }, percentStats: { attackDamage: 0.35 }, description: "Abilities can critically strike.", 
    onAttackAbility: {}, oncePerCombat: {}, everyXSeconds: {}, basedOnTarget: {}, statusEffectOnAttack: {}, constantThreshold: {} },
  "Jeweled Gauntlet": { image: "https://rerollcdn.com/items/JeweledGauntlet.png", type: "Jeweled Gauntlet", flatStats: { abilityPower: 35, criticalChance: 0.35 }, percentStats: {}, description: "Abilities can critically strike.", 
    onAttackAbility: {}, oncePerCombat: {}, everyXSeconds: {}, basedOnTarget: {}, statusEffectOnAttack: {}, constantThreshold: {} },
  "Crownguard": { image: "https://rerollcdn.com/items/Crownguard.png", type: "Crownguard", flatStats: { health: 100, originalHealth: 100, abilityPower: 20, armor: 20 }, percentStats: {}, description: "Combat start: Gain a 30% max Health Shield for 8 seconds. When the shield expires, gain 35 Ability Power.", 
    onAttackAbility: {}, oncePerCombat: {}, everyXSeconds: { type: 'crownguard', iteration: 8 * MOVEMENT_SPEED, applied: false }, basedOnTarget: {}, statusEffectOnAttack: {}, constantThreshold: {} },
  "Bloodthirster": { image: "https://rerollcdn.com/items/Bloodthirster.png", type: "Bloodthirster", flatStats: { omnivamp: 0.2, abilityPower: 15, magicResist: 20 }, percentStats: { attackDamage: 0.2 }, description: "Gain 20% Omnivamp. Once per combat at 40% Health, gain a 25% maximum Health Shield that lasts up to 5 seconds.", 
    onAttackAbility: {}, oncePerCombat: { health: 0.4, type: [ { type: 'shield', value: 0.25 } ] }, everyXSeconds: {}, basedOnTarget: {}, statusEffectOnAttack: {}, constantThreshold: {} },
  "Hand Of Justice": { image: "https://rerollcdn.com/items/HandofJustice.png", type: "Hand Of Justice", flatStats: { mana: 15, criticalChance: 0.2 }, percentStats: {}, description: "Gain 2 effects: 1) 15% Attack Damage and 15 Ability Power. 2) 15% Omnivamp. Each round, randomly double 1 of these effects.", 
    onAttackAbility: {}, oncePerCombat: {}, everyXSeconds: {}, basedOnTarget: {}, statusEffectOnAttack: {}, constantThreshold: {} },
  "Guardbreaker": { image: "https://rerollcdn.com/items/Guardbreaker.png", type: "Guardbreaker", flatStats: { health: 150, originalHealth: 150, criticalChance: 0.2, abilityPower: 10 }, percentStats: { attackSpeed: 0.2 }, description: "After damaging a Shield, deal 25% more damage for 3 seconds.", 
    onAttackAbility: {}, oncePerCombat: {}, everyXSeconds: {}, basedOnTarget: {}, statusEffectOnAttack: {}, constantThreshold: {} },
}

function GetItemDetails(itemKey) {
	return items[itemKey];
}

function ItemsList(champion) {
  var newChampion = champion;
  const championItems = champion.items;

  if (championItems.length > 0) {
    for (var i = 0; i < championItems.length; i++) {
      for (const [key, value] of Object.entries(items[championItems[i]].flatStats)) {
        if (key === 'mana') {
          newChampion = { ...newChampion, [key]: Math.min(newChampion.totalMana, Math.round(newChampion[key] + value)) };
        } else {
          newChampion = { ...newChampion, [key]: newChampion[key] + value };
        }
      }

      for (const [key, value] of Object.entries(items[championItems[i]].percentStats)) {
        if (key === 'attackSpeed') {
          newChampion = { ...newChampion, [key]: Math.round(newChampion[key] - newChampion[key] * value) };
        } else {
          newChampion = { ...newChampion, [key]: Math.round(newChampion[key] + newChampion[key] * value) };
        }
      }

      if (Object.keys(items[championItems[i]].oncePerCombat).length > 0) {
        newChampion = { ...newChampion, oncePerCombat: [ ...newChampion.oncePerCombat, items[championItems[i]].oncePerCombat ] };
      }

      if (Object.keys(items[championItems[i]].basedOnTarget).length > 0) {
        newChampion = { ...newChampion, basedOnTarget: [ ...newChampion.basedOnTarget, items[championItems[i]].basedOnTarget ] };
      }

      if (Object.keys(items[championItems[i]].onAttackAbility).length > 0) {
        newChampion = { ...newChampion, onAttackAbility: [ ...newChampion.onAttackAbility, items[championItems[i]].onAttackAbility ] };
      }

      if (Object.keys(items[championItems[i]].everyXSeconds).length > 0) {
        newChampion = { ...newChampion, stats: [ ...newChampion.stats, items[championItems[i]].everyXSeconds ] };
      }

      if (Object.keys(items[championItems[i]].statusEffectOnAttack).length > 0) {
        newChampion = { ...newChampion, statusEffectOnAttack: [ ...newChampion.statusEffectOnAttack, items[championItems[i]].statusEffectOnAttack ] };
      }

      if (Object.keys(items[championItems[i]].constantThreshold).length > 0) {
        newChampion = { ...newChampion, constantThreshold: [ ...newChampion.constantThreshold, items[championItems[i]].constantThreshold ] };
        if (items[championItems[i]].constantThreshold.type === 'steadfastHeart') {
          newChampion = { ...newChampion, damageReduction: newChampion.damageReduction + 0.15 };
        }
      }

      if (items[championItems[i]].type === "Infinity Edge" || items[championItems[i]].type === "Jeweled Gauntlet") {
        newChampion = { ...newChampion, abilityCrit: true };
      }

      if (items[championItems[i]].type === "Hand Of Justice") {
        const randomValue = Math.random();
        if (randomValue < 0.5) {
          newChampion = { ...newChampion, omnivamp: newChampion.omnivamp + 0.30, attackDamage: newChampion.attackDamage + newChampion.attackDamage * 0.15, abilityPower: newChampion.abilityPower + 15 };
        } else {
          newChampion = { ...newChampion, omnivamp: newChampion.omnivamp + 0.15, attackDamage: newChampion.attackDamage + newChampion.attackDamage * 0.30, abilityPower: newChampion.abilityPower + 30 };
        }
      }

      if (items[championItems[i]].type === "Guardbreaker") {
        newChampion = { ...newChampion, onShieldAttackProcItem: true };
      }
    }
  }

  return newChampion;
}

export default ItemsList;
export { GetItemDetails, MOVEMENT_SPEED };