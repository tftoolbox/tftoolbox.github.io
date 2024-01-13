import React, { useState, useEffect } from 'react';
import './Board.css';
import Hexagon from './Hexagon';
import Champion from './Champion';

const CIRCLE_DIAMETER = 50;
const ITERATION_CYCLE = 50;
var globalIteration = 0;

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

function findShortestPath(champions, start, end, attackRange) {
  const visited = new Set();
  const queue = [[start]];
  
  while (queue.length > 0) {
    const path = queue.shift();
    const currentHexagon = path[path.length - 1];

    if (currentHexagon[0] !== undefined && currentHexagon[0] !== null) {
      // if (isAdjacent({ hexagonPosition: { left: currentHexagon[0], top: currentHexagon[1] } }, end)) {
      //   return path;
      // }

      if (!visited.has(currentHexagon.toString())) {
        visited.add(currentHexagon.toString());
  
        const neighbors = getNeighbors({hexagonPosition: {left: currentHexagon[0], top: currentHexagon[1]}});
        
        for (const neighbor of neighbors) {
  
          const neighborStr = neighbor.toString();
          const isChampionOccupied = champions.some(c => c.hexagonPosition.left === neighbor[0] && c.hexagonPosition.top === neighbor[1]);
  
          if (!visited.has(neighborStr) && !isChampionOccupied) {
          
            // Check attack range
            if (attackRange === 1) {
              if (isAdjacent({ hexagonPosition: { left: currentHexagon[0], top: currentHexagon[1] } }, end)) {
                return path;
              }
            }
            if (attackRange === 2) {
              if (isAdjacent({hexagonPosition: {left: neighbor[0], top: neighbor[1]}}, end)) {
                return path;
              }
            } else if (attackRange === 3) {
              const neighborNeighbors = getNeighbors({hexagonPosition: {left: neighbor[0], top: neighbor[1]}});
              if (neighborNeighbors.some(n => isAdjacent({hexagonPosition: {left: n[0], top: n[1]}}, end))) {
                return path; 
              }
            } else if (attackRange === 4) {
              const neighborNeighbors = getNeighbors({hexagonPosition: {left: neighbor[0], top: neighbor[1]}});
              const neighborNeighborNeighbors = [];
              for (const n of neighborNeighbors) {
                neighborNeighborNeighbors.push(...getNeighbors({hexagonPosition: {left: n[0], top: n[1]}})); 
              }
              if (neighborNeighborNeighbors.some(n => isAdjacent({hexagonPosition: {left: n[0], top: n[1]}}, end))) {
                return path;
              }
            } else if (attackRange === 5) {
              const neighborNeighbors = getNeighbors({hexagonPosition: {left: neighbor[0], top: neighbor[1]}});
              const neighborNeighborNeighbors = [];
              for (const n of neighborNeighbors) {
                neighborNeighborNeighbors.push(...getNeighbors({hexagonPosition: {left: n[0], top: n[1]}}));
              }
              const neighborNeighborNeighborNeighbors = [];
              for (const n of neighborNeighborNeighbors) {
                neighborNeighborNeighborNeighbors.push(...getNeighbors({hexagonPosition: {left: n[0], top: n[1]}}));
              }
              if (neighborNeighborNeighborNeighbors.some(n => isAdjacent({hexagonPosition: {left: n[0], top: n[1]}}, end))) {
                return path;
              }
            }
  
            const newPath = [...path, neighbor];
            queue.push(newPath);
          }
        }
      }
    } else {
      // if (isAdjacent(currentHexagon, end)) {
      //   return path;
      // }

      if (!visited.has(currentHexagon.toString())) {
        visited.add(currentHexagon.toString());
  
        const neighbors = getNeighbors(currentHexagon);
        
        for (const neighbor of neighbors) {
  
          const neighborStr = neighbor.toString();
          const isChampionOccupied = champions.some(c => c.hexagonPosition.left === neighbor[0] && c.hexagonPosition.top === neighbor[1]);
  
          if (!visited.has(neighborStr) && !isChampionOccupied) {
          
            // Check attack range
            if (attackRange === 1) {
              if (isAdjacent(currentHexagon, end)) {
                return path;
              }
            }
            if (attackRange === 2) {
              if (isAdjacent({hexagonPosition: {left: neighbor[0], top: neighbor[1]}}, end)) {
                return path;
              }
            } else if (attackRange === 3) {
              const neighborNeighbors = getNeighbors({hexagonPosition: {left: neighbor[0], top: neighbor[1]}});
              if (neighborNeighbors.some(n => isAdjacent({hexagonPosition: {left: n[0], top: n[1]}}, end))) {
                return path; 
              }
            } else if (attackRange === 4) {
              const neighborNeighbors = getNeighbors({hexagonPosition: {left: neighbor[0], top: neighbor[1]}});
              const neighborNeighborNeighbors = [];
              for (const n of neighborNeighbors) {
                neighborNeighborNeighbors.push(...getNeighbors({hexagonPosition: {left: n[0], top: n[1]}})); 
              }
              if (neighborNeighborNeighbors.some(n => isAdjacent({hexagonPosition: {left: n[0], top: n[1]}}, end))) {
                return path;
              }
            } else if (attackRange === 5) {
              const neighborNeighbors = getNeighbors({hexagonPosition: {left: neighbor[0], top: neighbor[1]}});
              const neighborNeighborNeighbors = [];
              for (const n of neighborNeighbors) {
                neighborNeighborNeighbors.push(...getNeighbors({hexagonPosition: {left: n[0], top: n[1]}}));
              }
              const neighborNeighborNeighborNeighbors = [];
              for (const n of neighborNeighborNeighbors) {
                neighborNeighborNeighborNeighbors.push(...getNeighbors({hexagonPosition: {left: n[0], top: n[1]}}));
              }
              if (neighborNeighborNeighborNeighbors.some(n => isAdjacent({hexagonPosition: {left: n[0], top: n[1]}}, end))) {
                return path;
              }
            }
  
            const newPath = [...path, neighbor];
            queue.push(newPath);
          }
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
      { hexagonPosition: { left: enemyChampion.hexagonPosition.left, top: enemyChampion.hexagonPosition.top } },
      userChampion.attackRange
    );
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
  const [isCombatActive, setCombatActive] = useState(0);
  // const [combatIteration, setCombatIteration] = useState(0); // will implement later for overtime

  const startCombat = () => {
    setCombatActive(1);
  }

  const endCombat = () => {
    setCombatActive(2);
    // console.log("combat ended");
  }

  useEffect(() => {
    if (isCombatActive === 1) {
      const allChampions = userChampions.concat(enemyChampions);
      // console.log('before champions', allChampions);
  
      const updateChampionAtIndex = async (index) => {
        const tempChampion = allChampions[index];
        var allChampionsProjectileIteration = 0;
        const allProjectiles = tempChampion.projectiles;
        if (allProjectiles !== undefined & allProjectiles !== null & allProjectiles !== 0) {
          for (const projectile of allProjectiles) {
            if (projectile.iterations === 0) {
              if ((allChampions[index].health - projectile.damage) <= 0) {
                const newProjectiles = allChampions[index].projectiles.filter((_, index) => index !== allChampionsProjectileIteration);
                allChampions[index] = { ...allChampions[index], alive: false, projectiles: newProjectiles };
                console.log(`${tempChampion.type} of ${tempChampion.team} took ${projectile.damage} damage and died.`);
                break;
              } else {
                const newHealth = allChampions[index].health - projectile.damage;
                // if (projectile.effect !== null & projectile.effect.length !== 0) {
                //   for (const effect in projectile.effect) {
                //     if (effect.type === 'shred') {
                      
                //     }
                //   }
                // }
                console.log(`${tempChampion.type} of ${tempChampion.team} took ${projectile.damage} damage.`);
                if (tempChampion.mana === null) {
                  const newProjectiles = allChampions[index].projectiles.filter((_, index) => index !== allChampionsProjectileIteration);
                  allChampions[index] = { ...allChampions[index], health: newHealth, projectiles: newProjectiles };
                } else {
                  const newCurrentMana = Math.min(allChampions[index].totalMana, allChampions[index].mana + projectile.mana);
                  const newProjectiles = allChampions[index].projectiles.filter((_, index) => index !== allChampionsProjectileIteration);
                  allChampions[index] = { ...allChampions[index], health: newHealth, mana: newCurrentMana, projectiles: newProjectiles };
                } 
              }
            } else {
              var newProjectiles = allChampions[index].projectiles;
              const newProjectileIterations = projectile.iterations - 1;
              newProjectiles[allChampionsProjectileIteration] = { ...projectile, iterations: newProjectileIterations }
              allChampions[index] = { ...allChampions[index], projectiles: newProjectiles };
              allChampionsProjectileIteration += 1;
            }
          }
        }
        const champion = allChampions[index];

        if (allChampions[index].alive) {
          const isUserChampion = champion.team === 'user';
          const closestEnemy = isUserChampion ? findClosestEnemy(champion, enemyChampions) : findClosestEnemy(champion, userChampions);
    
          if (closestEnemy) {
            const shortestPath = findShortestPath(allChampions, champion, closestEnemy, champion.attackRange);
            // console.log('shortest path', shortestPath);
    
            if (shortestPath && shortestPath.length > 1) {
              const targetHexagon = shortestPath[1];
              const targetPixelLeft = convertToPixels(targetHexagon[0], 'left', targetHexagon[1] % 2 === 1) - 25;
              const targetPixelTop = convertToPixels(targetHexagon[1], 'top', targetHexagon[1] % 2 === 1) - 25;
    
              if (champion.iterationsRemaining.move === 0) {
                const newIterationsRemaining = { ...champion.iterationsRemaining, move: champion.movementSpeed };
                allChampions[index] = {
                  ...champion,
                  hexagonPosition: { left: targetHexagon[0], top: targetHexagon[1] },
                  currentPosition: { left: targetPixelLeft, top: targetPixelTop },
                  iterationsRemaining: newIterationsRemaining, 
                };
                console.log(`${champion.type} of ${champion.team} moved.`);
              } else {
                const newIterationsRemaining = { ...champion.iterationsRemaining, move: champion.iterationsRemaining.move - 1 };
                allChampions[index] = {
                  ...champion,
                  iterationsRemaining: newIterationsRemaining, 
                };
              }
    
              // console.log('updated champion', allChampions[index]);
            } else {
              if (champion.totalMana === null | champion.mana < champion.totalMana) {
                if (champion.iterationsRemaining.attack === 0) {
                  const postMitigationAttackDamage = (1 - (closestEnemy.armor / (100 + closestEnemy.armor))) * champion.attackDamage;
                  const manaIncrement = Math.min(42.5, (0.01 * champion.attackDamage) + (0.07 * postMitigationAttackDamage))
                  var newCurrentMana = Math.min(closestEnemy.totalMana, closestEnemy.mana + manaIncrement)
                  const newProjectile = { damage: postMitigationAttackDamage, mana: newCurrentMana, iterations: champion.attackProjectileSpeed, effect: [] }
                  const newProjectileList = [...closestEnemy.projectiles, newProjectile];
                  allChampions[closestEnemy.index] = { ...closestEnemy, projectiles: newProjectileList };

                  newCurrentMana = Math.min(champion.totalMana, champion.mana + 10);
                  const newIterationsRemaining = { ...champion.iterationsRemaining, attack: champion.attackSpeed };
                  allChampions[index] = { ...champion, mana: newCurrentMana, iterationsRemaining: newIterationsRemaining };
                  console.log(`${champion.type} of ${champion.team} fired an attack to ${closestEnemy.type}.`);
                } else {
                  const newIterationsRemaining = { ...champion.iterationsRemaining, attack: champion.iterationsRemaining.attack - 1 };
                  allChampions[index] = {
                    ...champion,
                    iterationsRemaining: newIterationsRemaining, 
                  };
                }
              } else if (champion.mana >= champion.totalMana) {
                if (champion.iterationsRemaining.ability === 0) {
                  const postMitigationAbilityDamage = (1 - (closestEnemy.magicResist / (100 + closestEnemy.magicResist))) * champion.abilityPower;
                  const manaIncrement = Math.min(42.5, (0.01 * champion.attackDamage) + (0.07 * postMitigationAbilityDamage))
                  const newCurrentMana = Math.min(closestEnemy.totalMana, closestEnemy.mana + manaIncrement)
                  const newProjectile = { damage: postMitigationAbilityDamage, mana: newCurrentMana, iterations: champion.abilityProjectileSpeed, effect: [{ type: 'shred', iterations: 60, strength: 0.3 }] }
                  const newProjectileList = [...closestEnemy.projectiles, newProjectile];
                  allChampions[closestEnemy.index] = { ...closestEnemy, projectiles: newProjectileList };

                  const newIterationsRemaining = { ...champion.iterationsRemaining, ability: champion.abilityCastTime };
                  allChampions[index] = { ...champion, mana: 0, iterationsRemaining: newIterationsRemaining };
                  console.log(`${champion.type} of ${champion.team} fired an ability to ${closestEnemy.type}.`);
                } else {  
                  const newIterationsRemaining = { ...champion.iterationsRemaining, ability: champion.iterationsRemaining.ability - 1 };
                  allChampions[index] = {
                    ...champion,
                    iterationsRemaining: newIterationsRemaining, 
                  };
                }
              }
            }
          }
        }
      };
  
      const updateChampionsSequentially = async (startTime) => {
        for (let index = 0; index < allChampions.length; index++) {
          await updateChampionAtIndex(index);
        }
        // console.log('after champions', allChampions);

        const aliveChampions = allChampions.filter(x => x.alive); 

        const updatedUserChampions = [];
        const updatedEnemyChampions = [];
        var iteration = 0;

        aliveChampions.forEach(champion => {
          if (champion.team === 'user') {
            champion = {
              ...champion, index: iteration
            };
            updatedUserChampions.push(champion);
          } else {
            champion = {
              ...champion, index: iteration
            };
            updatedEnemyChampions.push(champion);
          }
          iteration += 1;
        });
        
        const endTime = new Date();
        const timeDifference = endTime - startTime;
        const waitTime = ITERATION_CYCLE - timeDifference;
        if (waitTime >= 0) {
          await new Promise(resolve => setTimeout(resolve, waitTime));    
          console.log(`${globalIteration} Complete w/ ${waitTime + timeDifference} ms.`);
        } else {
          console.log('ERROR! ITERATION CYCLE TIME NOT LONG ENOUGH!');
        }

        setUserChampions(updatedUserChampions);
        setEnemyChampions(updatedEnemyChampions);

        if (updatedUserChampions.length === 0) {
          endCombat();
        } else if (updatedEnemyChampions.length === 0) {
          endCombat();
        }
      };
      
      const startTime = new Date();
      updateChampionsSequentially(startTime);
      globalIteration += 1;
    }
  }, [userChampions, isCombatActive, enemyChampions]);

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
    if (isCombatActive !== 0) {
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
    if (isCombatActive !== 0) {
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
                index={champion.index}
                hexagonPosition={champion.hexagonPosition}
                currentPosition={champion.currentPosition}
                image={champion.image}
                type={champion.type}
                starLevel={champion.starLevel}
                headliner={champion.headliner}
                items={champion.items}
                alive={champion.alive}
                attackRange={champion.attackRange}
                health={champion.health}
                attackDamage={champion.attackDamage}
                totalMana={champion.totalMana}
                mana={champion.mana}
                abilityPower={champion.abilityPower}
                armor={champion.armor}
                magicResist={champion.magicResist}
                castingAttack={champion.castingAttack}
                castingAbility={champion.castingAbility}
                projectiles={champion.projectiles}
                abilityCastTime={champion.abilityCastTime}
                movementSpeed={champion.movementSpeed}
                iterationsRemaining={champion.iterationsRemaining}
                attackProjectileSpeed={champion.attackProjectileSpeed}
                abilityProjectileSpeed={champion.abilityProjectileSpeed}
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
                index={champion.index}
                hexagonPosition={champion.hexagonPosition}
                currentPosition={champion.currentPosition}
                image={champion.image}
                type={champion.type}
                starLevel={champion.starLevel}
                headliner={champion.headliner}
                items={champion.items}
                alive={champion.alive}
                attackRange={champion.attackRange}
                health={champion.health}
                attackDamage={champion.attackDamage}
                totalMana={champion.totalMana}
                mana={champion.mana}
                abilityPower={champion.abilityPower}
                armor={champion.armor}
                magicResist={champion.magicResist}
                castingAttack={champion.castingAttack}
                castingAbility={champion.castingAbility}
                projectiles={champion.projectiles}
                abilityCastTime={champion.abilityCastTime}
                movementSpeed={champion.movementSpeed}
                iterationsRemaining={champion.iterationsRemaining}
                attackProjectileSpeed={champion.attackProjectileSpeed}
                abilityProjectileSpeed={champion.abilityProjectileSpeed}
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
