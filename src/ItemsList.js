import { MOVEMENT_SPEED } from './ChampionsList.js';

const items = {
  'B.F. Sword': { image: "https://rerollcdn.com/items/BFSword.png", type: "B.F. Sword", flatStats: { attackDamage: 10 }, percentStats: {}, description: "10 Attack Damage." },
  'Chain Vest': { image: "https://rerollcdn.com/items/ChainVest.png", type: "Chain Vest", flatStats: { armor: 20 }, percentStats: {}, description: "20 Armor." },
  "Giant\'s Belt": { image: "https://rerollcdn.com/items/GiantsBelt.png", type: "Giant's Belt", flatStats: { heatlh: 150, originalHealth: 150 }, percentStats: {}, description: "150 Health."},
  'Needlessly Large Rod': { image: "https://rerollcdn.com/items/NeedlesslyLargeRod.png", type: "Needlessly Large Rod", flatStats: { abilityPower: 10 }, percentStats: {}, description: "10 Ability Power." },
  'Negatron Cloak': { image: "https://rerollcdn.com/items/NegatronCloak.png", type: "Negatron Cloak", flatStats: { magicResist: 20 }, percentStats: {}, description: "20 Magic Resist." },
  'Recurve Bow': { image: "https://rerollcdn.com/items/RecurveBow.png", type: "Recurve Bow", flatStats: {}, percentStats: { attackSpeed: 0.1 }, description: "10% Attack Speed." },
  'Sparring Gloves': { image: "https://rerollcdn.com/items/SparringGloves.png", type: "Sparring Gloves", flatStats: { criticalChance: 0.2 }, percentStats: {}, description: "20% Critical Chance." },
  'Tear of the Goddess': { image: "https://rerollcdn.com/items/TearoftheGoddess.png", type: "Tear of the Goddess", flatStats: { mana: 15 }, percentStats: {}, description: "15 Mana." },
  "Warmog's Armor": { image: "https://rerollcdn.com/items/WarmogsArmor.png", type: "Warmog's Armor", flatStats: { health: 800, originalHealth: 800 }, percentStats: {}, description: "800 Health." },
  "Deathblade": { image: "https://rerollcdn.com/items/Deathblade.png", type: "Deathblade", flatStats: {}, percentStats: { attackDamage: 0.66 }, description: "66% Attack Damage." },
  "Spear of Shojin": { image: "https://rerollcdn.com/items/SpearofShojin.png", type: "Spear of Shojin", flatStats: { mana: 15, abilityPower: 20 }, percentStats: { attackDamage: 0.20 }, description: "Attacks grant 5 bonus Mana.", 
    onAttackAbility: { mana: 5 }, oncePerCombat: {} }, 
  "Guinsoo's Rageblade": { image: "https://rerollcdn.com/items/GuinsoosRageblade.png", type: "Guinsoo's Rageblade", flatStats: { abilityPower: 10 }, percentStats: { attackSpeed: 0.18 }, description: "Attacks grant 4% bonus Attack Speed.", 
    onAttackAbility: { attackSpeed: 0.04 }, oncePerCombat: {} },
  "Protector's Vow": { image: "https://rerollcdn.com/items/ProtectorsVow.png", type: "Protector's Vow", flatStats: { mana: 30, armor: 20 }, percentStats: {}, description: "Once per combat at 40% Health, gain a 25% max Health shield that lasts up to 5 seconds and gain 20 Armor and Magic Resist.", 
    onAttackAbility: {}, oncePerCombat: { health: 0.4, type: [ { type: 'armor', value: 20 }, { type: 'magicResist', value: 20 }, { type: 'shield', value: 0.25 }] } },
  "Dragon's Claw": { image: "https://rerollcdn.com/items/DragonsClaw.png", type: "Dragon's Claw", flatStats: { abilityPower: 10 }, percentStats: { attackSpeed: 0.18 }, description: "Every 2 seconds, regenerate 10% maximum Health.", 
  onAttackAbility: {}, oncePerCombat: {}, everyXSeconds: { type: 'dragonClaw', iteration: 2 * MOVEMENT_SPEED } },
  "Giant Slayer": { image: "https://rerollcdn.com/items/GiantSlayer.png", type: "Giant Slayer", flatStats: { abilityPower: 10 }, percentStats: { attackSpeed: 0.18 }, description: "Every 2 seconds, regenerate 10% maximum Health.", 
  onAttackAbility: {}, oncePerCombat: {}, everyXSeconds: {}, basedOnTarget: { type: 'giantSlayer' } },
  "Last Whisper": { image: "https://rerollcdn.com/items/LastWhisper.png", type: "Giant Slayer", flatStats: { abilityPower: 10 }, percentStats: { attackSpeed: 0.18 }, description: "Physical damage 30% Sunders the target for 3 seconds. This effect does not stack.", 
  onAttackAbility: {}, oncePerCombat: {}, everyXSeconds: {}, basedOnTarget: {}, statusEffectOnAttack: { type: 'lastWhisper' } },
  "Steadfast Heart": { image: "https://rerollcdn.com/items/LastWhisper.png", type: "Giant Slayer", flatStats: { abilityPower: 10 }, percentStats: { attackSpeed: 0.18 }, description: "Take 8% less damage. While above 50% Health, take 15% less damage instead.", 
  onAttackAbility: {}, oncePerCombat: {}, everyXSeconds: {}, basedOnTarget: {}, statusEffectOnAttack: {}, constantThreshold: { type: 'steadfastHeart', baseState: true } },
  "Rabadon's Deathcap": { image: "https://rerollcdn.com/items/LastWhisper.png", type: "Giant Slayer", flatStats: { damageExtra: 0.2 }, percentStats: {}, description: "Take 8% less damage. While above 50% Health, take 15% less damage instead.", 
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
        newChampion = { ...newChampion, [key]: Math.round(newChampion[key] + newChampion[key] * value) };
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
    }
  }

  return newChampion;
}

export default ItemsList;
export { GetItemDetails };