const items = {
  'B.F. Sword': { image: "https://rerollcdn.com/items/BFSword.png", type: "B.F. Sword", flatStats: { attackDamage: 10 }, percentStats: {}, description: "10 Attack Damage." },
  'Chain Vest': { image: "https://rerollcdn.com/items/ChainVest.png", type: "Chain Vest", flatStats: { armor: 20 }, percentStats: {}, description: "20 Armor." },
  "Giant\'s Belt": { image: "https://rerollcdn.com/items/GiantsBelt.png", type: "Giant's Belt", flatStats: { heatlh: 150, originalHealth: 150 }, percentStats: {}, description: "150 Health."},
  'Needlessly Large Rod': { image: "https://rerollcdn.com/items/NeedlesslyLargeRod.png", type: "Needlessly Large Rod", flatStats: { abilityPower: 10 }, percentStats: {}, description: "10 Ability Power." },
  'Negatron Cloak': { image: "https://rerollcdn.com/items/NegatronCloak.png", type: "Negatron Cloak", flatStats: { magicResist: 20 }, percentStats: {}, description: "20 Magic Resist." },
  'Recurve Bow': { image: "https://rerollcdn.com/items/RecurveBow.png", type: "Recurve Bow", flatStats: {}, percentStats: { attackSpeed: 0.1 }, description: "10% Attack Speed." },
  'Sparring Gloves': { image: "https://rerollcdn.com/items/SparringGloves.png", type: "Sparring Gloves", flatStats: { criticalChance: 0.2 }, percentStats: {}, description: "20% Critical Chance." },
  'Tear of the Goddess': { image: "https://rerollcdn.com/items/TearoftheGoddess.png", type: "Tear of the Goddess", flatStats: { mana: 15 }, percentStats: {}, description: "15 Mana." },
  "Warmog\'s Armor": { image: "https://rerollcdn.com/items/WarmogsArmor.png", type: "Warmog's Armor", flatStats: { health: 800, originalHealth: 800 }, percentStats: {}, description: "800 Health." },
  "Deathblade": { image: "https://rerollcdn.com/items/Deathblade.png", type: "Deathblade", flatStats: {}, percentStats: { attackDamage: 0.66 }, description: "66% Attack Damage." },
}

function GetItemDetails(itemKey) {
	return items[itemKey];
}

function ItemsList(champion) {
  console.log(champion);
  var newChampion = champion;
  const championItems = champion.items;

  if (championItems.length > 0) {
	for (var i = 0; i < championItems.length; i++) {
		for (const [key, value] of Object.entries(items[championItems[i]].flatStats)) {
			newChampion = { ...newChampion, [key]: newChampion[key] + value };
		}
		for (const [key, value] of Object.entries(items[championItems[i]].percentStats)) {
			newChampion = { ...newChampion, [key]: Math.round(newChampion[key] + newChampion[key]*value) };
		}
	}
  }

  return newChampion;
}

export default ItemsList;
export { GetItemDetails };