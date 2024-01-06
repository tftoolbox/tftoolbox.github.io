import React, { useState, useEffect } from 'react';
import './Board.css';
import Hexagon from './Hexagon';
import Champion from './Champion';

const CIRCLE_DIAMETER = 50;

const adjacentHexagons = {
  0: { 
    0: [[0, 1], [1, 0]],
    1: [[0, 0], [1, 0], [1, 1], [1, 2], [0, 2]],
    2: [[0, 1], [1, 2], [0, 3]],
    3: [[0, 2], [1, 2], [1, 3], [1, 4], [0, 4]],
    4: [[0, 3], [1, 4], [0, 5]],
    5: [[0, 4], [1, 4], [1, 5], [1, 6], [0, 6]],
    6: [[0, 5], [1, 6], [0, 7]],
    7: [[0, 6], [1, 6], [1, 7]],
  },
  1: { 
    0: [[0, 0], [0, 1], [1, 1], [2, 0]],
    1: [[1, 0], [0, 1], [1, 2], [2, 2], [2, 1], [2, 0]],
    2: [[0, 1], [0, 2], [0, 3], [1, 3], [2, 2], [1, 1]],
    3: [[1, 2], [0, 3], [1, 4], [2, 4], [2, 3], [2, 2]],
    4: [[0, 3], [0, 4], [0, 5], [1, 5], [2, 4], [1, 3]],
    5: [[1, 4], [0, 5], [1, 6], [2, 6], [2, 5], [2, 4]],
    6: [[0, 5], [0, 6], [0, 7], [1, 7], [2, 6], [1, 5]],
    7: [[1, 6], [0, 7], [2, 6], [2, 7]],
  },
  2: { 
    0: [[1, 0], [1, 1], [2, 1], [3, 0]],
    1: [[2, 0], [1, 1], [2, 2], [3, 2], [3, 1], [3, 0]],
    2: [[1, 1], [1, 2], [1, 3], [2, 3], [3, 2], [2, 1]],
    3: [[2, 2], [1, 3], [2, 4], [3, 4], [3, 3], [3, 2]],
    4: [[1, 3], [1, 4], [1, 5], [2, 5], [3, 4], [2, 3]],
    5: [[2, 4], [1, 5], [2, 6], [3, 6], [3, 5], [3, 4]],
    6: [[1, 5], [1, 6], [1, 7], [2, 7], [3, 6], [2, 5]],
    7: [[2, 6], [1, 7], [3, 6], [3, 7]],
  },
  3: { 
    0: [[2, 0], [2, 1], [3, 1], [4, 0]],
    1: [[3, 0], [2, 1], [3, 2], [4, 2], [4, 1], [4, 0]],
    2: [[2, 1], [2, 2], [2, 3], [3, 3], [4, 2], [3, 1]],
    3: [[3, 2], [2, 3], [3, 4], [4, 4], [4, 3], [4, 2]],
    4: [[2, 3], [2, 4], [2, 5], [3, 5], [4, 4], [3, 3]],
    5: [[3, 4], [2, 5], [3, 6], [4, 6], [4, 5], [4, 4]],
    6: [[2, 5], [2, 6], [2, 7], [3, 7], [4, 6], [3, 5]],
    7: [[3, 6], [2, 7], [4, 6], [4, 7]],
  },
  4: { 
    0: [[3, 0], [3, 1], [4, 1], [5, 0]],
    1: [[4, 0], [3, 1], [4, 2], [5, 2], [5, 1], [5, 0]],
    2: [[3, 1], [3, 2], [3, 3], [4, 3], [5, 2], [4, 1]],
    3: [[4, 2], [3, 3], [4, 4], [5, 4], [5, 3], [5, 2]],
    4: [[3, 3], [3, 4], [3, 5], [4, 5], [5, 4], [4, 3]],
    5: [[4, 4], [3, 5], [4, 6], [5, 6], [5, 5], [5, 4]],
    6: [[3, 5], [3, 6], [3, 7], [4, 7], [5, 6], [4, 5]],
    7: [[4, 6], [3, 7], [5, 6], [5, 7]],
  },
  5: { 
    0: [[4, 0], [4, 1], [5, 1], [6, 0]],
    1: [[5, 0], [4, 1], [5, 2], [6, 2], [6, 1], [6, 0]],
    2: [[4, 1], [4, 2], [4, 3], [5, 3], [6, 2], [5, 1]],
    3: [[5, 2], [4, 3], [5, 4], [6, 4], [6, 3], [6, 2]],
    4: [[4, 3], [4, 4], [4, 5], [5, 5], [6, 4], [5, 3]],
    5: [[5, 4], [4, 5], [5, 6], [6, 6], [6, 5], [6, 4]],
    6: [[4, 5], [4, 6], [4, 7], [5, 7], [6, 6], [5, 5]],
    7: [[5, 6], [4, 7], [6, 6], [6, 7]],
  },
  6: { 
    0: [[5, 0], [5, 1], [6, 1]],
    1: [[6, 0], [5, 1], [6, 2]],
    2: [[6, 1], [5, 1], [5, 2], [5, 3], [6, 3]],
    3: [[6, 2], [5, 3], [6, 4]],
    4: [[6, 3], [5, 3], [5, 4], [5, 5], [6, 5]],
    5: [[6, 4], [5, 5], [6, 6]],
    6: [[6, 5], [5, 5], [5, 6], [5, 7], [6, 7]],
    7: [[6, 6], [5, 7]],
  },
}

function getNeighbors(champion) {
  const left = champion.hexagonPosition.left;
  const top = champion.hexagonPosition.top;

  if (adjacentHexagons[left] && adjacentHexagons[left][top]) {
    return adjacentHexagons[left][top];
  }

  return [];
}

function isAdjacent(champion1, champion2) {
  const hex1 = [champion1.hexagonPosition.left, champion1.hexagonPosition.top];
  const hex2 = [champion2.hexagonPosition.left, champion2.hexagonPosition.top];
  const neighbors = getNeighbors({ hexagonPosition: { left: hex1[0], top: hex1[1] } });
  
  return neighbors.some(neighbor => neighbor[0] === hex2[0] && neighbor[1] === hex2[1]);
}

function findShortestPath(champions, start, end) {
  const visited = new Set();
  const queue = [[start]];
  
  while (queue.length > 0) {
    console.log(queue);
    const path = queue.shift();
    const currentHexagon = path[path.length - 1];

    if (isAdjacent({ hexagonPosition: { left: currentHexagon[0], top: currentHexagon[1] } }, end)) {
      return path;
    }

    if (!visited.has(currentHexagon.toString())) {
      visited.add(currentHexagon.toString());

      const neighbors = getNeighbors({ hexagonPosition: { left: currentHexagon[0], top: currentHexagon[1] } });
      
      for (const neighbor of neighbors) {
        const neighborStr = neighbor.toString();
        const isChampionOccupied = champions.some(c => c.hexagonPosition.left === neighbor[0] && c.hexagonPosition.top === neighbor[1]);

        if (!visited.has(neighborStr) && !isChampionOccupied) {
          const newPath = [...path, neighbor];
          queue.push(newPath);
        }
      }
    }
  }
  return null;
}

function findClosestEnemy(userChampion, enemyChampions) {
  let closestEnemy = null;
  let minDistance = Infinity;

  for (const enemyChampion of enemyChampions) {
    const distance = findShortestPath(
      enemyChampions,
      { hexagonPosition: { left: userChampion.hexagonPosition.left, top: userChampion.hexagonPosition.top } },
      { hexagonPosition: { left: enemyChampion.hexagonPosition.left, top: enemyChampion.hexagonPosition.top } }
    );
    console.log(distance);

    if (distance && distance.length < minDistance) {
      minDistance = distance.length;
      closestEnemy = enemyChampion;
    }
  }

  return closestEnemy;
}

function Board({ enemyChampionsList, userChampionsList }) {
  const [isDragging, setDragging] = useState(false);
  const [enemyChampions, setEnemyChampions] = useState(enemyChampionsList);
  const [userChampions, setUserChampions] = useState(userChampionsList);
  const [draggedPlayer, setDraggedPlayer] = useState(null);
  const [dragStartIndex, setDragStartIndex] = useState(null);
  const [isCombatActive, setCombatActive] = useState(false);

  const startCombat = () => {
    setCombatActive(true);
  }

  useEffect(() => {
    if (isCombatActive) {
      const updatedUserChampions = userChampions.map(userChampion => {
        const closestEnemy = findClosestEnemy(userChampion, enemyChampions);
        if (closestEnemy) {
          const shortestPath = findShortestPath(userChampions, userChampion.hexagonPosition, closestEnemy.hexagonPosition);
          // Animate the movement along the path (you may need to implement animation logic)
          // For simplicity, we will update the position directly without animation
          if (shortestPath && shortestPath.length > 1) {
            const targetHexagon = shortestPath[1]; // The next hexagon in the path
            const targetPixelLeft = convertToPixels(targetHexagon[0], 'left', targetHexagon[1] % 2 === 1);
            const targetPixelTop = convertToPixels(targetHexagon[1], 'top', targetHexagon[1] % 2 === 1);
            return {
              ...userChampion,
              hexagonPosition: { left: targetHexagon[0], top: targetHexagon[1] },
              currentPosition: { left: targetPixelLeft, top: targetPixelTop },
            };
          }
        }
        return userChampion;
      });

      setUserChampions(updatedUserChampions);
    }
  }, [userChampions, isCombatActive]);

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

  const convertToHexagons = (coordinate, leftOrTop, even) => {
    if (leftOrTop === 'left') {
      if (even) {
        return Math.floor((coordinate - 32.7 - 2.95 - 31.2) / (2.95 + 62.4));
      }
      return Math.floor((coordinate - 2.95 - 31.2) / (2.95 + 62.4));
    }
    if (leftOrTop === 'top') {
      return Math.floor((coordinate - 36) / (20.3 + 36));
    }
  }

  const handleDrop = (event, hexagonCoordinates, player) => {
    event.preventDefault();

    if (draggedPlayer === 'enemy') {
      return;
    }
    if (isCombatActive) {
      event.preventDefault();
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
            hexagonPosition: { left: prevUserChampions[dragStartIndex].hexagonPosition.left, top: prevUserChampions[dragStartIndex].hexagonPosition.top },
            currentPosition: { left: prevUserChampions[dragStartIndex].currentPosition.left, top: prevUserChampions[dragStartIndex].currentPosition.top }
          };
          updatedUserChampions[dragStartIndex] = {
            ...prevUserChampions[dragStartIndex],
            hexagonPosition: { left: hexagonCoordinates.left, top: hexagonCoordinates.top },
            currentPosition: { left: targetHexagon.currentPosition.left, top: targetHexagon.currentPosition.top }
          };
          return updatedUserChampions;
        });
      } else {
        setUserChampions((prevUserChampions) => {
          const updatedUserChampions = [...prevUserChampions];
          updatedUserChampions[dragStartIndex] = {
            ...prevUserChampions[dragStartIndex],
            hexagonPosition: { left: hexagonCoordinates.left, top: hexagonCoordinates.top },
            currentPosition: { left: targetHexagon.currentPosition.left, top: targetHexagon.currentPosition.top },
            image: updatedUserChampions[dragStartIndex].image
          };
          return updatedUserChampions;
        });
      }
    }
  };

  const handleCircleDrop = (event, circleCoordinates, index) => {
    event.preventDefault();

    if (draggedPlayer === 'enemy') {
      return;
    }
    if (isCombatActive) {
      event.preventDefault();
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
            hexagonPosition: { left: prevUserChampions[dragStartIndex].hexagonPosition.left, top: prevUserChampions[dragStartIndex].hexagonPosition.top },
            currentPosition: { left: prevUserChampions[dragStartIndex].currentPosition.left, top: prevUserChampions[dragStartIndex].currentPosition.top }
          };
          updatedUserChampions[dragStartIndex] = {
            ...prevUserChampions[dragStartIndex],
            hexagonPosition: { left: prevUserChampions[index].hexagonPosition.left, top: prevUserChampions[index].hexagonPosition.top },
            currentPosition: { left: targetChampion.currentPosition.left, top: targetChampion.currentPosition.top }
          };
          return updatedUserChampions;
        });
      } else {
        setUserChampions((prevUserChampions) => {
          const updatedUserChampions = [...prevUserChampions];
          updatedUserChampions[dragStartIndex] = {
            ...prevUserChampions[dragStartIndex],
            hexagonPosition: { left: prevUserChampions[index].hexagonPosition.left, top: prevUserChampions[index].hexagonPosition.top },
            currentPosition: { left: targetChampion.currentPosition.left, top: targetChampion.currentPosition.top },
            image: updatedUserChampions[dragStartIndex].image
          };
          return updatedUserChampions;
        });
      }
    }
  };

  console.log(isCombatActive);
  console.log(userChampions);

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
              onDrop={(e) => handleCircleDrop(e, { left: champion.currentPosition.left, top: champion.currentPosition.top }, index)}
            >
              <Champion
                key={index}
                team={'enemy'}
                hexagonPosition={champion.hexagonPosition}
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
              onDrop={(e) => handleCircleDrop(e, { left: champion.currentPosition.left, top: champion.currentPosition.top }, index)}
            >
              <Champion
                key={index}
                team={'user'}
                hexagonPosition={champion.hexagonPosition}
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
        <button onClick={startCombat}>Start Combat</button>
      </div>
  );
}

export default Board;
