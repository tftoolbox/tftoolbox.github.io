import './App.css';
import React from 'react';
import Board from './Board';
import About from './About'; 
import ContactUs from './ContactUs';
import Navigation from './Navigation';
import { puzzlesList } from './Puzzles';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function MinWidth({ children }) {
  return (
    <div>
      <style>{`
        @media (max-width: 1439px) {
          .content {
            display: none;
          }
  
          .message {
            display: block;
          }
        }
        
        @media (min-width: 1440px) and (max-width: 1440px) {
          .content {
            display: block;
          }
          
          .message {
            display: none;
          }
        }

        @media (min-width: 1441px) {
          .content {
            display: none;  
          }
          
          .message {
            display: block;
          }
        }
      `}</style>
      
      <div className="message">
        Please view on a screen that is 1440px wide. Future responsive design for multiple screen widths will be implemented at a later date.
      </div>
      
      <div className="content">
        {children}
      </div>
    </div>
  )
}

function App() {
  const initialPuzzleNumber = getRandomInt(puzzlesList.length);
  const champions = puzzlesList[initialPuzzleNumber];
  const enemyChampions = champions[0];
  const userChampions = champions[1];

  return (
    <Router>
      <Navigation /> 
        <Routes>
          <Route path="/" element={
            <MinWidth>
              <Board enemyChampionsList={enemyChampions} userChampionsList={userChampions} initialPuzzleNumber={initialPuzzleNumber} />
            </MinWidth>
          } />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
    </Router>
  );
}

export default App;
