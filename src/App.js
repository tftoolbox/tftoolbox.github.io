import './App.css';
import React from 'react';
import Board from './Board';
import { puzzlesList } from './Puzzles';

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function App() {
  const initialPuzzleNumber = getRandomInt(puzzlesList.length);
  const champions = puzzlesList[initialPuzzleNumber];
  const enemyChampions = champions[0];
  const userChampions = champions[1];

  return (
    <div className="App">
      <Board enemyChampionsList={enemyChampions} userChampionsList={userChampions} initialPuzzleNumber={initialPuzzleNumber} />
    </div>
  );
}

export default App;
