import React, { useState } from 'react';
import './Board.css';
import Hexagon from './Hexagon';
import Champion from './Champion';

const CIRCLE_DIAMETER = 50;

function Board({ enemyChampionsList, userChampionsList }) {
  const [isDragging, setDragging] = useState(false);
  const [enemyChampions, setEnemyChampions] = useState(enemyChampionsList);
  const [userChampions, setUserChampions] = useState(userChampionsList);
  const [draggedPlayer, setDraggedPlayer] = useState(null);
  const [dragStartIndex, setDragStartIndex] = useState(null);

  const areChampionsOverlapping = (champion1, champion2) => {
    const dx = champion1.currentPosition.left - champion2.currentPosition.left;
    const dy = champion1.currentPosition.top - champion2.currentPosition.top;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < CIRCLE_DIAMETER; 
  };

  const handleCircleDragStart = (event, player, index) => {
    if (player === 'enemy') {
      event.preventDefault(); // prevent dragging for enemy circles
      return;
    }

    event.dataTransfer.setData('text/plain', 'champion'); 
    setDragging(true);
    setDraggedPlayer(player);
    setDragStartIndex(index);
  };

  const handleCircleDragEnd = () => {
    setDragging(false);
    setDraggedPlayer(null);
    setDragStartIndex(null);
  };

  const handleDragOver = (event) => {
    event.dataTransfer.effectAllowed = 'none';
    event.preventDefault();
  };

  const convertToPixels = (coordinate, leftOrTop, even) => {
    if (leftOrTop === 'left') {
      if (even) {
        return 32.7 + ((coordinate + 1) * 2.95) + (coordinate * 62.4) + 62.4 / 2;
      }
      return ((coordinate + 1) * 2.95) + (coordinate * 62.4) + 62.4 / 2;
    }
    if (leftOrTop === 'top') {
      return (coordinate * 20.3) + (coordinate * 36) + 36;
    }
  }

  const handleDrop = (event, hexagonCoordinates, player) => {
    event.preventDefault();

    if (draggedPlayer === 'enemy') {
      return;
    }
    if (player === 'user' && dragStartIndex !== null) {
      const hexagonCenterX = convertToPixels(hexagonCoordinates.left, 'left', hexagonCoordinates.top % 2 === 1);
      const hexagonCenterY = convertToPixels(hexagonCoordinates.top, 'top', hexagonCoordinates.top % 2 === 1);

      const targetHexagon = {
        currentPosition: {
          left: hexagonCenterX - (CIRCLE_DIAMETER / 2),
          top: hexagonCenterY - (CIRCLE_DIAMETER / 2)
        }
      };

      const overlappingIndex = userChampions.findIndex(
        (champion, index) => index !== dragStartIndex && areChampionsOverlapping(champion, targetHexagon)
      );

      if (overlappingIndex !== -1) {
        setUserChampions((prevUserChampions) => {
          const updatedUserChampions = [...prevUserChampions];
          updatedUserChampions[overlappingIndex] = {
            ...prevUserChampions[overlappingIndex], 
            startingPosition: { left: prevUserChampions[dragStartIndex].startingPosition.left, top: prevUserChampions[dragStartIndex].startingPosition.top },
            currentPosition: { left: prevUserChampions[dragStartIndex].currentPosition.left, top: prevUserChampions[dragStartIndex].currentPosition.top }
          };
          updatedUserChampions[dragStartIndex] = {
            ...prevUserChampions[dragStartIndex],
            startingPosition: { left: targetHexagon.currentPosition.left, top: targetHexagon.currentPosition.top },
            currentPosition: { left: targetHexagon.currentPosition.left, top: targetHexagon.currentPosition.top }
          };
          return updatedUserChampions;
        });
      } else {
        setUserChampions((prevUserChampions) => {
          const updatedUserChampions = [...prevUserChampions];
          updatedUserChampions[dragStartIndex] = {
            ...prevUserChampions[dragStartIndex],
            startingPosition: { left: targetHexagon.currentPosition.left, top: targetHexagon.currentPosition.top },
            currentPosition: { left: targetHexagon.currentPosition.left, top: targetHexagon.currentPosition.top },
            image: updatedUserChampions[dragStartIndex].image
          };
          return updatedUserChampions;
        });
      }
    }
  };

  const handleCircleDrop = (event, circleCoordinates) => {
    event.preventDefault();

    if (draggedPlayer === 'enemy') {
      return;
    }
    if (circleCoordinates.top >= 230 && dragStartIndex !== null) {
      const targetChampion = {
        currentPosition: {
          left: circleCoordinates.left,
          top: circleCoordinates.top
        }
      };

      const overlappingIndex = userChampions.findIndex(
        (champion, index) => index !== dragStartIndex && areChampionsOverlapping(champion, targetChampion)
      );

      if (overlappingIndex !== -1) {
        setUserChampions((prevUserChampions) => {
          const updatedUserChampions = [...prevUserChampions];
          updatedUserChampions[overlappingIndex] = {
            ...prevUserChampions[overlappingIndex], 
            startingPosition: { left: prevUserChampions[dragStartIndex].startingPosition.left, top: prevUserChampions[dragStartIndex].startingPosition.top },
            currentPosition: { left: prevUserChampions[dragStartIndex].currentPosition.left, top: prevUserChampions[dragStartIndex].currentPosition.top }
          };
          updatedUserChampions[dragStartIndex] = {
            ...prevUserChampions[dragStartIndex],
            startingPosition: { left: targetChampion.currentPosition.left, top: targetChampion.currentPosition.top },
            currentPosition: { left: targetChampion.currentPosition.left, top: targetChampion.currentPosition.top }
          };
          return updatedUserChampions;
        });
      } else {
        setUserChampions((prevUserChampions) => {
          const updatedUserChampions = [...prevUserChampions];
          updatedUserChampions[dragStartIndex] = {
            ...prevUserChampions[dragStartIndex],
            startingPosition: { left: targetChampion.currentPosition.left, top: targetChampion.currentPosition.top },
            currentPosition: { left: targetChampion.currentPosition.left, top: targetChampion.currentPosition.top },
            image: updatedUserChampions[dragStartIndex].image
          };
          return updatedUserChampions;
        });
      }
    }
  };

  return (
      <div>
        <div className='hex-row'>
          {enemyChampions.map((champion, index) => (
            <div
              key={index}
              className={`circle-overlay ${isDragging && draggedPlayer === 'enemy' ? 'dragging' : ''}`}
              style={{ left: champion.currentPosition.left + 'px', top: champion.currentPosition.top + 'px' }}
              draggable
              onDragStart={(e) => handleCircleDragStart(e, 'enemy', index)}
              onDragEnd={handleCircleDragEnd}
              onDragOver={(e) => handleDragOver(e)}
              onDrop={(e) => handleCircleDrop(e, { left: champion.currentPosition.left, top: champion.currentPosition.top }, 'enemy')}
            >
              <Champion
                key={index}
                team={'enemy'}
                startingPosition={champion.startingPosition}
                currentPosition={champion.currentPosition}
                image={champion.image}
                type={champion.type}
                starLevel={champion.starLevel}
                headliner={champion.headliner}
                items={champion.items}
              ></Champion>
            </div>
          ))}
          <Hexagon player='enemy' onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, { left: 0, top: 0, even: 0 }, 'enemy')} hexagonCoordinates={{ left: 0, top: 0, even: 0 }}/>
          <Hexagon player='enemy' onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, { left: 1, top: 0, even: 0 }, 'enemy')} hexagonCoordinates={{ left: 1, top: 0, even: 0 }}/>
          <Hexagon player='enemy' onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, { left: 2, top: 0, even: 0 }, 'enemy')} hexagonCoordinates={{ left: 2, top: 0, even: 0 }}/>
          <Hexagon player='enemy' onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, { left: 3, top: 0, even: 0 }, 'enemy')} hexagonCoordinates={{ left: 3, top: 0, even: 0 }}/>
          <Hexagon player='enemy' onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, { left: 4, top: 0, even: 0 }, 'enemy')} hexagonCoordinates={{ left: 4, top: 0, even: 0 }}/>
          <Hexagon player='enemy' onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, { left: 5, top: 0, even: 0 }, 'enemy')} hexagonCoordinates={{ left: 5, top: 0, even: 0 }}/>
          <Hexagon player='enemy' onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, { left: 6, top: 0, even: 0 }, 'enemy')} hexagonCoordinates={{ left: 6, top: 0, even: 0 }}/>
        </div>
        <div className='hex-row even'>
          <Hexagon player='enemy' onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, { left: 0, top: 1, even: 32.7 }, 'enemy')} hexagonCoordinates={{ left: 0, top: 1, even: 32.7 }}/>
          <Hexagon player='enemy' onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, { left: 1, top: 1, even: 32.7 }, 'enemy')} hexagonCoordinates={{ left: 1, top: 1, even: 32.7 }}/>
          <Hexagon player='enemy' onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, { left: 2, top: 1, even: 32.7 }, 'enemy')} hexagonCoordinates={{ left: 2, top: 1, even: 32.7 }}/>
          <Hexagon player='enemy' onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, { left: 3, top: 1, even: 32.7 }, 'enemy')} hexagonCoordinates={{ left: 3, top: 1, even: 32.7 }}/>
          <Hexagon player='enemy' onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, { left: 4, top: 1, even: 32.7 }, 'enemy')} hexagonCoordinates={{ left: 4, top: 1, even: 32.7 }}/>
          <Hexagon player='enemy' onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, { left: 5, top: 1, even: 32.7 }, 'enemy')} hexagonCoordinates={{ left: 5, top: 1, even: 32.7 }}/>
          <Hexagon player='enemy' onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, { left: 6, top: 1, even: 32.7 }, 'enemy')} hexagonCoordinates={{ left: 6, top: 1, even: 32.7 }}/>
        </div>
        <div className='hex-row'> 
          <Hexagon player='enemy' onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, { left: 0, top: 2, even: 0 }, 'enemy')} hexagonCoordinates={{ left: 0, top: 2, even: 0 }}/>
          <Hexagon player='enemy' onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, { left: 1, top: 2, even: 0 }, 'enemy')} hexagonCoordinates={{ left: 1, top: 2, even: 0 }}/>
          <Hexagon player='enemy' onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, { left: 2, top: 2, even: 0 }, 'enemy')} hexagonCoordinates={{ left: 2, top: 2, even: 0 }}/>
          <Hexagon player='enemy' onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, { left: 3, top: 2, even: 0 }, 'enemy')} hexagonCoordinates={{ left: 3, top: 2, even: 0 }}/>
          <Hexagon player='enemy' onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, { left: 4, top: 2, even: 0 }, 'enemy')} hexagonCoordinates={{ left: 4, top: 2, even: 0 }}/>
          <Hexagon player='enemy' onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, { left: 5, top: 2, even: 0 }, 'enemy')} hexagonCoordinates={{ left: 5, top: 2, even: 0 }}/>
          <Hexagon player='enemy' onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, { left: 6, top: 2, even: 0 }, 'enemy')} hexagonCoordinates={{ left: 6, top: 2, even: 0 }}/>
        </div>
        <div className='hex-row even'>
          <Hexagon player='enemy' onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, { left: 0, top: 3, even: 32.7 }, 'enemy')} hexagonCoordinates={{ left: 0, top: 3, even: 32.7 }}/>
          <Hexagon player='enemy' onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, { left: 1, top: 3, even: 32.7 }, 'enemy')} hexagonCoordinates={{ left: 1, top: 3, even: 32.7 }}/>
          <Hexagon player='enemy' onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, { left: 2, top: 3, even: 32.7 }, 'enemy')} hexagonCoordinates={{ left: 2, top: 3, even: 32.7 }}/>
          <Hexagon player='enemy' onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, { left: 3, top: 3, even: 32.7 }, 'enemy')} hexagonCoordinates={{ left: 3, top: 3, even: 32.7 }}/>
          <Hexagon player='enemy' onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, { left: 4, top: 3, even: 32.7 }, 'enemy')} hexagonCoordinates={{ left: 4, top: 3, even: 32.7 }}/>
          <Hexagon player='enemy' onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, { left: 5, top: 3, even: 32.7 }, 'enemy')} hexagonCoordinates={{ left: 5, top: 3, even: 32.7 }}/>
          <Hexagon player='enemy' onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, { left: 6, top: 3, even: 32.7 }, 'enemy')} hexagonCoordinates={{ left: 6, top: 3, even: 32.7 }}/>
        </div>
        <div className='hex-row'>
          <Hexagon player='user' onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, { left: 0, top: 4, even: 0 }, 'user')} hexagonCoordinates={{ left: 0, top: 4, even: 0 }}/>
          <Hexagon player='user' onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, { left: 1, top: 4, even: 0 }, 'user')} hexagonCoordinates={{ left: 1, top: 4, even: 0 }}/>
          <Hexagon player='user' onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, { left: 2, top: 4, even: 0 }, 'user')} hexagonCoordinates={{ left: 2, top: 4, even: 0 }}/>
          <Hexagon player='user' onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, { left: 3, top: 4, even: 0 }, 'user')} hexagonCoordinates={{ left: 3, top: 4, even: 0 }}/>
          <Hexagon player='user' onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, { left: 4, top: 4, even: 0 }, 'user')} hexagonCoordinates={{ left: 4, top: 4, even: 0 }}/>
          <Hexagon player='user' onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, { left: 5, top: 4, even: 0 }, 'user')} hexagonCoordinates={{ left: 5, top: 4, even: 0 }}/>
          <Hexagon player='user' onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, { left: 6, top: 4, even: 0 }, 'user')} hexagonCoordinates={{ left: 6, top: 4, even: 0 }}/>
        </div>
        <div className='hex-row even'>
          <Hexagon player='user' onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, { left: 0, top: 5, even: 32.7 }, 'user')} hexagonCoordinates={{ left: 0, top: 5, even: 32.7 }}/>
          <Hexagon player='user' onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, { left: 1, top: 5, even: 32.7 }, 'user')} hexagonCoordinates={{ left: 1, top: 5, even: 32.7 }}/>
          <Hexagon player='user' onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, { left: 2, top: 5, even: 32.7 }, 'user')} hexagonCoordinates={{ left: 2, top: 5, even: 32.7 }}/>
          <Hexagon player='user' onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, { left: 3, top: 5, even: 32.7 }, 'user')} hexagonCoordinates={{ left: 3, top: 5, even: 32.7 }}/>
          <Hexagon player='user' onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, { left: 4, top: 5, even: 32.7 }, 'user')} hexagonCoordinates={{ left: 4, top: 5, even: 32.7 }}/>
          <Hexagon player='user' onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, { left: 5, top: 5, even: 32.7 }, 'user')} hexagonCoordinates={{ left: 5, top: 5, even: 32.7 }}/>
          <Hexagon player='user' onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, { left: 6, top: 5, even: 32.7 }, 'user')} hexagonCoordinates={{ left: 6, top: 5, even: 32.7 }}/>
        </div>
        <div className='hex-row'>
          <Hexagon player='user' onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, { left: 0, top: 6, even: 0 }, 'user')} hexagonCoordinates={{ left: 0, top: 6, even: 0 }}/>
          <Hexagon player='user' onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, { left: 1, top: 6, even: 0 }, 'user')} hexagonCoordinates={{ left: 1, top: 6, even: 0 }}/>
          <Hexagon player='user' onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, { left: 2, top: 6, even: 0 }, 'user')} hexagonCoordinates={{ left: 2, top: 6, even: 0 }}/>
          <Hexagon player='user' onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, { left: 3, top: 6, even: 0 }, 'user')} hexagonCoordinates={{ left: 3, top: 6, even: 0 }}/>
          <Hexagon player='user' onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, { left: 4, top: 6, even: 0 }, 'user')} hexagonCoordinates={{ left: 4, top: 6, even: 0 }}/>
          <Hexagon player='user' onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, { left: 5, top: 6, even: 0 }, 'user')} hexagonCoordinates={{ left: 5, top: 6, even: 0 }}/>
          <Hexagon player='user' onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, { left: 6, top: 6, even: 0 }, 'user')} hexagonCoordinates={{ left: 6, top: 6, even: 0 }}/>
        </div>
        <div className='hex-row even'>
          {userChampions.map((champion, index) => (
            <div
              key={index}
              className={`circle-overlay ${isDragging && draggedPlayer === 'user' ? 'dragging' : ''}`}
              style={{ left: champion.currentPosition.left + 'px', top: champion.currentPosition.top + 'px' }}
              draggable
              onDragStart={(e) => handleCircleDragStart(e, 'user', index)}
              onDragEnd={handleCircleDragEnd}
              onDragOver={(e) => handleDragOver(e)}
              onDrop={(e) => handleCircleDrop(e, { left: champion.currentPosition.left, top: champion.currentPosition.top }, 'user')}
            >
              <Champion
                key={index}
                team={'user'}
                startingPosition={champion.startingPosition}
                currentPosition={champion.currentPosition}
                image={champion.image}
                type={champion.type}
                starLevel={champion.starLevel}
                headliner={champion.headliner}
                items={champion.items}
              ></Champion>
            </div>
          ))}
          <Hexagon player='user' onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, { left: 0, top: 7, even: 32.7 }, 'user')} hexagonCoordinates={{ left: 0, top: 7, even: 32.7 }}/>
          <Hexagon player='user' onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, { left: 1, top: 7, even: 32.7 }, 'user')} hexagonCoordinates={{ left: 1, top: 7, even: 32.7 }}/>
          <Hexagon player='user' onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, { left: 2, top: 7, even: 32.7 }, 'user')} hexagonCoordinates={{ left: 2, top: 7, even: 32.7 }}/>
          <Hexagon player='user' onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, { left: 3, top: 7, even: 32.7 }, 'user')} hexagonCoordinates={{ left: 3, top: 7, even: 32.7 }}/>
          <Hexagon player='user' onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, { left: 4, top: 7, even: 32.7 }, 'user')} hexagonCoordinates={{ left: 4, top: 7, even: 32.7 }}/>
          <Hexagon player='user' onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, { left: 5, top: 7, even: 32.7 }, 'user')} hexagonCoordinates={{ left: 5, top: 7, even: 32.7 }}/>
          <Hexagon player='user' onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, { left: 6, top: 7, even: 32.7 }, 'user')} hexagonCoordinates={{ left: 6, top: 7, even: 32.7 }}/>
        </div>
      </div>
  );
}

export default Board;
