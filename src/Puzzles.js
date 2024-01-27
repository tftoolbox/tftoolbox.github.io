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
]

function Puzzles(puzzleNumber) {
  const champions = puzzlesList[puzzleNumber];
  return [champions[0], champions[1]];
}

export { puzzlesList, Puzzles };