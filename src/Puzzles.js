import ChampionsList from './ChampionsList';

const puzzlesList = [
	[ChampionsList([['Corki', 1, false, []], ['Tahm Kench', 1, false, []]], 'enemy', [[0,0], [2, 2]]),
	 ChampionsList([['Corki', 1, false, []], ['Tahm Kench', 2, false, []]], 'user')],
	[ChampionsList([['Jinx', 1, false, []], ['Taric', 1, false, []], ['Evelynn', 2, false, []]], 'enemy', [[5,0], [2, 3], [3, 3]]),
	ChampionsList([['Annie', 2, false, []], ['Yasuo', 1, false, []], ['Olaf', 1, false, []]], 'user')],
	[ChampionsList([['Annie', 1, false, []], ['Taric', 1, false, []], ['Olaf', 2, false, []]], 'enemy', [[3,0], [3, 3], [3, 2]]),
	ChampionsList([['Jinx', 1, false, []], ['Yasuo', 2, false, []], ['Tahm Kench', 1, false, []]], 'user')],
	[ChampionsList([['Nami', 1, false, []], ['Lillia', 1, false, []]], 'enemy', [[3,0], [3, 3], [3, 2]]),
	ChampionsList([['Kennen', 2, false, []], ["K\'Sante", 1, false, []]], 'user')],
	[ChampionsList([['Olaf', 1, false, []], ['Vi', 1, false, []]], 'enemy', [[0,2], [1, 2]]),
	 ChampionsList([['Kennen', 1, false, []], ['Yasuo', 1, false, []]], 'user')],
	[ChampionsList([['Jinx', 2, false, []], ['Vi', 2, false, []], ['Kennen', 1, false, []]], 'enemy', [[2,0], [3, 3], [6,0]]),
	 ChampionsList([['Tahm Kench', 2, false, []], ["K\'Sante", 1, false, []], ['Olaf', 2, false, []]], 'user')],
	[ChampionsList([['Olaf', 2, false, ["Giant\'s Belt"]], ['Kennen', 1, false, []], ['Lillia', 1, false, []]], 'enemy', [[3,3], [3, 2], [4,3]]),
	 ChampionsList([['Aphelios', 1, false, []], ["K\'Sante", 1, false, []], ['Olaf', 1, false, ["Recurve Bow"]]], 'user')],
	[ChampionsList([['Senna', 1, false, []], ['Jinx', 2, false, []], ['Aphelios', 1, false, []]], 'enemy', [[0,0], [4, 0], [6,0]]),
	 ChampionsList([['Aphelios', 1, false, []], ["K\'Sante", 1, false, []], ['Yasuo', 2, false, []]], 'user')],
	[ChampionsList([['Jinx', 2, false, []], ['Vi', 2, false, []], ['Kennen', 1, false, []]], 'enemy', [[2,0], [3, 3], [6,0]]),
	 ChampionsList([['Tahm Kench', 2, false, []], ["K\'Sante", 1, false, []], ['Olaf', 2, false, []]], 'user')],
	[ChampionsList([['Corki', 1, false, []], ['Olaf', 1, false, []], ['Tahm Kench', 2, false, ["Warmog\'s Armor"]]], 'enemy', [[6,0], [2, 3], [3,3]]),
	 ChampionsList([['Taric', 2, false, ["Chain Vest"]], ["Nami", 1, false, []], ['Yasuo', 1, false, []]], 'user')],
	[ChampionsList([['Aphelios', 1, false, []], ['Jinx', 2, false, ["B. F. Sword"]], ['Vi', 2, false, []]], 'enemy', [[5,0], [6, 0], [4,3]]),
	 ChampionsList([['Taric', 2, false, ["Chain Vest"]], ['Yasuo', 2, false, []], ['Nami', 1, false, []]], 'user')],
	[ChampionsList([['Seraphine', 1, false, []], ['Aphelios', 2, false, ["Tear of the Goddess"]], ['Evelynn', 1, false, []], ['Lillia', 2, false, []]], 'enemy', [[4,0], [6, 0], [2,3], [4,3]]),
	 ChampionsList([['Taric', 1, false, []], ['Kennen', 2, false, ["Chain Vest"]], ['Nami', 2, false, ["B. F. Sword"]], ["Jinx", 2, false, ["Recurve Bow"]]], 'user')],
	[ChampionsList([['Senna', 1, false, []], ['Yasuo', 2, false, ["Sparring Gloves"]], ['Kennen', 2, false, []], ["Taric", 1, false, []]], 'enemy', [[6,0], [4, 2],[4,3], [2,3]]),
	 ChampionsList([['Jinx', 2, false, ["Sparring Gloves"]], ['Kennen', 1, false, []], ["Lillia", 1, false, []]], 'user')],
	[ChampionsList([['Kennen', 1, false, ["Needlessly Large Rod"]], ["K\'Sante", 1, false, []], ['Yasuo', 1, false,[]], ['Lillia', 1, false, []]], 'enemy', [[3,3], [4, 3], [5,3], [6,3]]),
	 ChampionsList([['Kennen', 1, false, []], ['Senna', 1, false, []], ['Corki', 2, false, []], ['Aphelios', 1, false, []]], 'user')],
	[ChampionsList([['Olaf', 2, false, []], ['Yasuo', 2, false, []], ['Kennen', 1, false, []], ['Lillia', 2, false, []]], 'enemy', [[3,2], [4, 2], [2, 3], [3,3]]),
	 ChampionsList([['Corki', 1, false, []], ['Olaf', 2, false, []], ['Lillia', 1, false, []], ["K\'Sante", 2, false, []]], 'user')],
	[ChampionsList([['Nami', 2, false, []], ['Lillia', 1, false, []], ['Garen', 1, false, []], ['Taric', 2, false, []]], 'enemy', [[6,0], [4, 1], [5, 2], [6,2]]),
	 ChampionsList([['Garen', 1, false, []], ['Annie', 2, false, ["Recurve Bow"]], ['Seraphine', 1, false, []], ["K\'Sante", 2, false, []]], 'user')],
]

function Puzzles(puzzleNumber) {
  const champions = puzzlesList[puzzleNumber];
  return [champions[0], champions[1]];
}

export { puzzlesList, Puzzles };