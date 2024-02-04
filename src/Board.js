import React, { useState, useEffect } from 'react';
import './Board.css';
import Hexagon from './Hexagon';
import Champion from './Champion';
import DualButton from './DualButton';
import Traits from './Traits';
import Augments from './Augments';
import ChampionDisplay from './ChampionDisplay';
import { puzzlesList, Puzzles } from './Puzzles';
import { MOVEMENT_SPEED } from './ChampionsList';

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

function Board({ enemyChampionsList, userChampionsList, initialPuzzleNumber }) {
  const [isDragging, setDragging] = useState(false);
  const [enemyChampions, setEnemyChampions] = useState(enemyChampionsList);
  const [userChampions, setUserChampions] = useState(userChampionsList);
  const [draggedPlayer, setDraggedPlayer] = useState(null);
  const [dragStartIndex, setDragStartIndex] = useState(null);
  const [isCombatActive, setCombatActive] = useState(0);
  const [selectedChampion, setSelectedChampion] = useState(userChampionsList[0]);
  const [puzzleNumber, setPuzzleNumber] = useState(initialPuzzleNumber);
  // const [combatIteration, setCombatIteration] = useState(0); // will implement later for overtime

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  const handleNextPuzzleClick = (e) => {
    e.preventDefault();
    setCombatActive(0);
    let newPuzzleNumber;

    do {
      newPuzzleNumber = getRandomInt(puzzlesList.length);
    } while (newPuzzleNumber === puzzleNumber);

    // console.log('New Puzzle Number: ', puzzleNumber);

    setPuzzleNumber(newPuzzleNumber);
    const newChampions = Puzzles(newPuzzleNumber);
    setEnemyChampions(newChampions[0]);
    setUserChampions(newChampions[1]);
    setSelectedChampion(newChampions[1][0]);
  };

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
        // Make sure that selected champion is actually found for purposes of champion display (when champion dies, stop displaying)
        var selectedChampionFound = false;
        if ((allChampions[index].team === selectedChampion.team) && (allChampions[index].index === selectedChampion.index)) {
          selectedChampionFound = true;
        }
        
        // Iterating through all stats after checking there are stats
        var allChampionsStatIteration = 0;
        const allStats = allChampions[index].stats;

        if (allStats !== undefined && allStats !== null) {
          for (const stat of allStats) {
            // When the stat has no more iterations left, remove it from the list of stats
            if (stat.iteration === 0) {
              if (stat.type === 'dragonClaw') {
                allChampions[index] = { ...allChampions[index], health: Math.round(allChampions[index].health + allChampions[index].originalHealth * 0.1) };
                allChampions[index].stats[allChampionsStatIteration] = { ...stat, iteration: 2 * MOVEMENT_SPEED };
                
              } else if (stat.type === 'archangelStaff') {
                allChampions[index] = { ...allChampions[index], abilityPower: allChampions[index].abilityPower + 30 };
                allChampions[index].stats[allChampionsStatIteration] = { ...stat, iteration: 5 * MOVEMENT_SPEED };

              } else {
                // When stat has no iterations left, return back to base
                if (stat.type === 'shred') {
                  allChampions[index] = { ...allChampions[index], magicResist: allChampions[index].originalMagicResist };

                } else if (stat.type === 'sunder') {
                  allChampions[index] = { ...allChampions[index], armor: allChampions[index].originalArmor };

                } else if (stat.type === 'shield') {
                  // No clue how to get rid of each shield - tbd

                } else if (stat.type === 'damageReduction') {
                  allChampions[index] = { ...allChampions[index], damageReduction: allChampions[index].damageReduction - stat.value };

                } else if (stat.type === 'damageExtra') {
                  allChampions[index] = { ...allChampions[index], damageExtra: allChampions[index].damageExtra - stat.value };

                } else if (stat.type === 'crownguard') {
                  allChampions[index] = { ...allChampions[index], abilityPower: allChampions[index].abilityPower + 35 };
                  
                } else {
                  // Throw an error if the stat is not implemented yet
                  throw new Error('This is a stat that is not implemented yet.');

                }
                const newStats = allChampions[index].stats.filter((_, index) => index !== allChampionsStatIteration);
                allChampions[index] = { ...allChampions[index], stats: newStats };

              }
            } else {
              // When stat still has iterations left, make sure that it is applied to the target stats
              if (stat.type === 'shred') {
                allChampions[index] = { ...allChampions[index], magicResist: Math.round(allChampions[index].originalMagicResist*(1 - stat.value)) };

              } else if (stat.type === 'sunder') {
                allChampions[index] = { ...allChampions[index], armor: Math.round(allChampions[index].originalArmor*(1 - stat.value)) };

              } else if (stat.type === 'shield') {
                // Want to only apply each shield once
                if (!stat.applied) {
                  allChampions[index] = { ...allChampions[index], shield: Math.round(allChampions[index].originalHealth * 0.3) };
                  allChampions[index].stats[allChampionsStatIteration] = { ...stat, applied: true }
                }

              } else if (stat.type === 'damageReduction') {
                allChampions[index] = { ...allChampions[index], damageReduction: allChampions[index].damageReduction + stat.value };

              } else if (stat.type === 'damageExtra') {
                allChampions[index] = { ...allChampions[index], damageExtra: allChampions[index].damageExtra + stat.value };

              } else if (stat.type === 'crownguard') {
                if (!stat.applied) {
                  allChampions[index] = { ...allChampions[index], shield: Math.round(allChampions[index].shield + stat.value) };
                  allChampions[index].stats[allChampionsStatIteration] = { ...stat, applied: true }
                }
                
              } else {
                // Throw an error if the stat is not implemented yet
                throw new Error('This is a stat that is not implemented yet.');

              }

              // Remove one iteration for this stat and move onto next stat
              allChampions[index].stats[allChampionsStatIteration] = { ...stat, iteration: stat.iteration - 1 }
              allChampionsStatIteration += 1;
            }
          }
        }

        // Iterating through all projectiles after checking there are projectiles
        var allChampionsProjectileIteration = 0;
        const allProjectiles = allChampions[index].projectiles;

        if (allProjectiles !== undefined && allProjectiles !== null) {
          for (const projectile of allProjectiles) {
            if (projectile.iteration === 0) {
              if (projectile.type === 'attack') {
                // Calculate post-mitigation damage
                const postMitigationAttackDamage = (1 - (allChampions[index].armor / (100 + allChampions[index].armor))) * projectile.damage * (1 - allChampions[index].damageReduction) * projectile.damageExtra;

                // Check if there are oncePerCombat items to check with health thresholds
                if (allChampions[index].oncePerCombat.length > 0) {
                  // Check if this damage will activate any oncePerCombat items
                  const thresholdHealth = Math.round(allChampions[index].oncePerCombat.health * allChampions[index].originalHealth);
                  var updatedOncePerCombatAttack = [];

                  // Iterate through each item that is once-per-combat
                  for (const item of allChampions[index].oncePerCombat) {
                    if (thresholdHealth <= postMitigationAttackDamage) {
                      // Iterate through the different one-time stat boosts that can happen
                      for (const statBoost of item.type) {
                        if (statBoost.type === 'armor') {
                          allChampions[index] = { ...allChampions[index], armor: allChampions[index].armor + statBoost.value };
  
                        } else if (statBoost.type === 'magicResist') {
                          allChampions[index] = { ...allChampions[index], magicResist: allChampions[index].magicResist + statBoost.value };
  
                        } else if (statBoost.type === 'originalHealth') {
                          allChampions[index] = { ...allChampions[index], originalHealth: allChampions[index].originalHealth + allChampions[index].originalHealth * statBoost.value, health: allChampions[index].health + allChampions[index].originalHealth * statBoost.value };
  
                        } else if (statBoost.type === 'attackDamage') {
                          allChampions[index] = { ...allChampions[index], attackDamage: Math.round(allChampions[index].attackDamage + allChampions[index].attackDamage * statBoost.value) };
  
                        } else if (statBoost.type === 'shield') {
                          allChampions[index] = { ...allChampions[index], stats: [ ...allChampions[index].stats, { type: 'shield', value: Math.round(statBoost.value * allChampions[index].originalHealth), iteration: 5 * MOVEMENT_SPEED, applied: true } ] }; // Movement speed temporary as placeholder for one second
                          allChampions[index] = { ...allChampions[index], shield: allChampions[index].shield + Math.round(statBoost.value * allChampions[index].originalHealth) };
  
                        } else {
                          // Throw an error if the type is not implemented yet (later for untargetable on banshee's veil)
                          throw new Error('This is a type of once-per-combat item that is not implemented yet.');
  
                        }
                      }
                    } else {
                      // Otherwise, if not activated, continue to keep in once-per-combat
                      updatedOncePerCombatAttack = [ ...updatedOncePerCombatAttack, item ];

                    }
                  }
                  
                  allChampions[index] = { ...allChampions[index], updatedOncePerCombatAttack };

                  // Check if the damage will kill the champion or not
                  if (allChampions[index].health + allChampions[index].shield <= postMitigationAttackDamage) {
                    const newProjectiles = allChampions[index].projectiles.filter((_, index) => index !== allChampionsProjectileIteration);
                    allChampions[index] = { ...allChampions[index], alive: false, projectiles: newProjectiles };
                    // console.log(`${allChampions[index].type} of ${allChampions[index].team} took ${postMitigationAttackDamage} damage and died.`);
                    break;

                  } else {
                    // Check if the champion has a shield
                    if (allChampions[index].shield > 0) {
                      const newShield = Math.max(0, allChampions[index].shield - postMitigationAttackDamage);
                      allChampions[index] = { ...allChampions[index], shield: newShield };

                    }

                    // Find new mana and health for champion
                    const newHealth = allChampions[index].health - postMitigationAttackDamage;
                    const manaIncrement = Math.min(42.5, (0.01 * projectile.damage) + (0.07 * postMitigationAttackDamage));
                    const newCurrentMana = Math.min(allChampions[index].totalMana, Math.round(allChampions[index].mana + manaIncrement))

                    // Check for any constant threshold changes
                    if (allChampions[index].constantThreshold.length > 0) {
                      for (const item of allChampions[index].constantThreshold) {
                        if (item.type === 'steadfastHeart') {
                          if (allChampions[index].health * 2 <= allChampions[index].originalHealth && item.baseState) {
                            allChampions[index].damageReduction = allChampions[index].damageReduction - 0.15 + 0.08;
                            item.baseState = false;
                          } else if (allChampions[index].health * 2 >= allChampions[index] && !item.baseState) {
                            allChampions[index].damageReduction = allChampions[index].damageReduction - 0.08 + 0.15;
                            item.baseState = true;
                          } 
                        }
                      }
                    }

                    // Find any stat effects from projectile (from attacks)
                    if (projectile.hasOwnProperty('effect')) {
                      for (const effect of projectile.effect) {
                        if (effect.type === 'lastWhisper') {
                          if (allChampions[index].armor < allChampions[index].originalArmor) {
                            if (allChampions[index].armor + Math.round(allChampions[index].originalArmor * 0.3) <= allChampions[index].originalArmor) {
                              allChampions[index].stats = [ ...allChampions[index].stats, { type: 'sunder', value: 0.3, iteration: 3 * MOVEMENT_SPEED } ];
                            }
                          } else {
                            allChampions[index].stats = [ ...allChampions[index].stats, { type: 'sunder', value: 0.3, iteration: 3 * MOVEMENT_SPEED } ];
                          }
                        }
                      }
                    }

                    // Set projectiles to exclude this one
                    if (allChampions[index].totalMana === 0) {
                      const newProjectiles = allChampions[index].projectiles.filter((_, index) => index !== allChampionsProjectileIteration);
                      allChampions[index] = { ...allChampions[index], health: newHealth, projectiles: newProjectiles };

                    } else {
                      const newProjectiles = allChampions[index].projectiles.filter((_, index) => index !== allChampionsProjectileIteration);
                      allChampions[index] = { ...allChampions[index], health: newHealth, mana: newCurrentMana, projectiles: newProjectiles };

                    } 
                  }
                  
                  allChampions[index] = { ...allChampions[index], oncePerCombat: [] };
                }
              } else if (projectile.type === 'ability') {
                // Calculate post-mitigation damage
                const postMitigationAbilityDamage = (1 - (allChampions[index].magicResist / (100 + allChampions[index].magicResist))) * projectile.damage * (1 - allChampions[index].damageReduction) * projectile.damageExtra;

                // Check if there are oncePerCombat items to check with health thresholds
                if (allChampions[index].oncePerCombat.length > 0) {
                  // Check if this damage will activate any oncePerCombat items
                  const thresholdHealth = Math.round(allChampions[index].oncePerCombat.health * allChampions[index].originalHealth);
                  var updatedOncePerCombatAbility = [];

                  // Iterate through each item that is once-per-combat
                  for (const item of allChampions[index].oncePerCombat) {
                    if (thresholdHealth <= postMitigationAbilityDamage) {
                      // Iterate through the different one-time stat boosts that can happen
                      for (const statBoost of item.type) {
                        if (statBoost.type === 'armor') {
                          allChampions[index] = { ...allChampions[index], armor: allChampions[index].armor + statBoost.value };
  
                        } else if (statBoost.type === 'magicResist') {
                          allChampions[index] = { ...allChampions[index], magicResist: allChampions[index].magicResist + statBoost.value };
  
                        } else if (statBoost.type === 'maxHealth') {
                          allChampions[index] = { ...allChampions[index], originalHealth: allChampions[index].originalHealth + statBoost.value, health: allChampions[index].health + statBoost.value };
  
                        } else if (statBoost.type === 'attackDamage') {
                          allChampions[index] = { ...allChampions[index], attackDamage: Math.round(allChampions[index].attackDamage + allChampions[index].attackDamage * statBoost.value) };
  
                        } else if (statBoost.type === 'shield') {
                          allChampions[index] = { ...allChampions[index], stats: [ ...allChampions[index].stats, { type: 'shield', value: Math.round(statBoost.value * allChampions[index].originalHealth), iteration: 5 * MOVEMENT_SPEED, applied: true } ] }; // Movement speed temporary as placeholder for one second
                          allChampions[index] = { ...allChampions[index], shield: allChampions[index].shield + Math.round(statBoost.value * allChampions[index].originalHealth) };
  
                        } else {
                          // Throw an error if the type is not implemented yet (later for untargetable on banshee's veil)
                          throw new Error('This is a type of once-per-combat item that is not implemented yet.');
  
                        }
                      }
                    } else {
                      // Otherwise, if not activated, continue to keep in once-per-combat
                      updatedOncePerCombatAbility = [ ...updatedOncePerCombatAbility, item ];

                    }
                  }
                  
                  allChampions[index] = { ...allChampions[index], updatedOncePerCombatAbility };

                  // Check if the damage will kill the champion or not
                  if (allChampions[index].health + allChampions[index].shield <= postMitigationAbilityDamage) {
                    const newProjectiles = allChampions[index].projectiles.filter((_, index) => index !== allChampionsProjectileIteration);
                    allChampions[index] = { ...allChampions[index], alive: false, projectiles: newProjectiles };
                    // console.log(`${allChampions[index].type} of ${allChampions[index].team} took ${postMitigationAbilityDamage} damage and died.`);
                    break;

                  } else {
                    // Check if the champion has a shield
                    if (allChampions[index].shield > 0) {
                      const newShield = Math.max(0, allChampions[index].shield - postMitigationAbilityDamage);
                      allChampions[index] = { ...allChampions[index], shield: newShield };

                    }

                    // Find new mana and health for champion
                    const newHealth = allChampions[index].health - postMitigationAbilityDamage;
                    const manaIncrement = Math.min(42.5, (0.01 * projectile.damage) + (0.07 * postMitigationAbilityDamage));
                    const newCurrentMana = Math.min(allChampions[index].totalMana, Math.round(allChampions[index].mana + manaIncrement))

                    // Set projectiles to exclude this one
                    if (allChampions[index].totalMana === 0) {
                      const newProjectiles = allChampions[index].projectiles.filter((_, index) => index !== allChampionsProjectileIteration);
                      allChampions[index] = { ...allChampions[index], health: newHealth, projectiles: newProjectiles };

                    } else {
                      const newProjectiles = allChampions[index].projectiles.filter((_, index) => index !== allChampionsProjectileIteration);
                      allChampions[index] = { ...allChampions[index], health: newHealth, mana: newCurrentMana, projectiles: newProjectiles };

                    } 
                  }
                  
                  allChampions[index] = { ...allChampions[index], oncePerCombat: [] };
                }
              } else if (projectile.type === 'item') {
                // Throw an error if the projectile is not implemented yet (later for statik shiv, runaan's, etc.)
                throw new Error('This is a projectile that is not implemented yet.');

              } else {
                // Throw an error if the projectile is not implemented yet
                throw new Error('This is a projectile that is not implemented yet.');

              }
            } else {
              // Remove one iteration for this projectile and move on to next projectile
              allChampions[index].projectiles[allChampionsProjectileIteration] = { ...projectile, iteration: projectile.iteration - 1 };
              allChampionsProjectileIteration += 1;

            }
          }
        }

        // Check for the champion being alive
        if (allChampions[index].alive) {
          // Find the closest enemy/user to the champion
          const isUserChampion = allChampions[index].team === 'user';
          const closestEnemy = isUserChampion ? findClosestEnemy(allChampions[index], enemyChampions) : findClosestEnemy(allChampions[index], userChampions);
    
          // Check if a closest enemy exists
          if (closestEnemy) {
            const shortestPath = findShortestPath(allChampions, allChampions[index], closestEnemy, allChampions[index].attackRange);
            // console.log('shortest path', shortestPath);
    
            // Check if a shortest path exists
            if (shortestPath && shortestPath.length > 1) {
              const targetHexagon = shortestPath[1];
              const targetPixelLeft = convertToPixels(targetHexagon[0], 'left', targetHexagon[1] % 2 === 1) - 25;
              const targetPixelTop = convertToPixels(targetHexagon[1], 'top', targetHexagon[1] % 2 === 1) - 25;
    
              // See if you need to move to get to the nearest enemy/user
              if (allChampions[index].iterationsRemaining.move === 0) {
                const newIterationsRemaining = { ...allChampions[index].iterationsRemaining, move: allChampions[index].movementSpeed };
                allChampions[index] = {
                  ...allChampions[index],
                  hexagonPosition: { left: targetHexagon[0], top: targetHexagon[1] },
                  currentPosition: { left: targetPixelLeft, top: targetPixelTop },
                  iterationsRemaining: newIterationsRemaining, 
                };
                // console.log(`${allChampions[index].type} of ${allChampions[index].team} moved.`);

              } else {
                const newIterationsRemaining = { ...allChampions[index].iterationsRemaining, move: allChampions[index].iterationsRemaining.move - 1 };
                allChampions[index] = {
                  ...allChampions[index],
                  iterationsRemaining: newIterationsRemaining, 
                };

              }
    
              // console.log('updated champion', allChampions[index]);
            } else {
              // Check if not at casting an ability yet
              if (allChampions[index].totalMana === 0 | allChampions[index].mana < allChampions[index].totalMana) {
                // If ready to cast an ability next
                if (allChampions[index].iterationsRemaining.attack === 0) {
                  // Check for based-on-target item enhancements
                  var additionalAttackDamage = 0;
                  if (allChampions[index].basedOnTarget.length > 0) {
                    for (const item of allChampions[index].basedOnTarget) {
                      if (item.type === 'giantSlayer') {
                        if (closestEnemy.originalHealth > 1600) {
                          additionalAttackDamage = 0.25;

                        }
                      }
                    }
                  }

                  // Check for critical chance
                  const randomValue = Math.random();
                  var attackCriticalDamage = 0;
                  if (randomValue < allChampions[index].criticalChance) {
                    attackCriticalDamage = allChampions[index].criticalDamage;
                  }

                  const newProjectile = { type: 'attack', damage: allChampions[index].attackDamage + allChampions[index].attackDamage * attackCriticalDamage, extraDamage: allChampions[index].extraDamage + additionalAttackDamage, iteration: allChampions[index].attackProjectileSpeed }
                  const newProjectileList = [ ...closestEnemy.projectiles, newProjectile ];
                  allChampions[closestEnemy.index] = { ...closestEnemy, projectiles: newProjectileList };

                  // Check if there needs to be changes due to on-attack items
                  if (allChampions[index].onAttackAbility.length > 0) {
                    for (const item of allChampions[index].onAttackAbility) {
                      if (item.type === 'mana') {
                        allChampions[index] = { ...allChampions[index], mana: Math.min(allChampions[index].totalMana, Math.round(allChampions[index].mana + item.value)) };

                      } else if (item.type === 'attackSpeed') {
                        allChampions[index] = { ...allChampions[index], attackSpeed: Math.round(allChampions[index].attackSpeed + allChampions[index].attackSpeed * item.value) };

                      } else {
                        // Throw an error if the projectile is not implemented yet
                        throw new Error('This type of on-attack item is not implemented yet.');

                      }
                    }
                  }
                  for (const item of allChampions[index].items) {
                    if (Object.keys(item.onAttackAbility).length > 0) {
                      for (const [key, value] of Object.entries(item.onAttackAbility)) {
                        if (key !== 'attackSpeed' & key !== 'attackDamage') {
                          if (key === 'mana') {
                            allChampions[index] = { ...allChampions[index], [key]: Math.min(allChampions[index].totalMana, Math.round(allChampions[index][key] + value)) };
                          }
                        } else {
                          allChampions[index] = { ...allChampions[index], [key]: Math.round(allChampions[index][key] + allChampions[index][key] * value) };
                        }
                      }
                    }
                  }

                  const newCurrentMana = Math.min(allChampions[index].totalMana, allChampions[index].mana + 10);
                  const newIterationsRemaining = { ...allChampions[index].iterationsRemaining, attack: allChampions[index].attackSpeed };
                  allChampions[index] = { ...allChampions[index], mana: newCurrentMana, iterationsRemaining: newIterationsRemaining };
                  // console.log(`${allChampions[index].type} of ${allChampions[index].team} fired an attack to ${closestEnemy.type}.`);

                } else {
                  // Reduce iterations until casting next attack by 1
                  const newIterationsRemaining = { ...allChampions[index].iterationsRemaining, attack: allChampions[index].iterationsRemaining.attack - 1 };
                  allChampions[index] = {
                    ...allChampions[index],
                    iterationsRemaining: newIterationsRemaining, 
                  };

                }
              } else if (allChampions[index].mana >= allChampions[index].totalMana) {
                // Check if ready to cast an ability
                if (allChampions[index].iterationsRemaining.ability === 0) {
                  // Check for based-on-target item enhancements
                  var additionalAbilityDamage = 0;
                  if (allChampions[index].basedOnTarget.length > 0) {
                    for (const item of allChampions[index].basedOnTarget) {
                      if (item.type === 'giantSlayer') {
                        if (closestEnemy.originalHealth > 1600) {
                          additionalAbilityDamage = 0.25;

                        }
                      }
                    }
                  }

                  // Check for critical chance on abilities
                  const randomValue = Math.random();
                  var abilityCriticalDamage = 0;
                  if (randomValue < allChampions[index].criticalChance && allChampions[index].abilityCrit) {
                    abilityCriticalDamage = allChampions[index].criticalDamage;
                  }

                  const newProjectile = { type: 'ability', damage: allChampions[index].abilityDamage + allChampions[index].abilityDamage * abilityCriticalDamage, extraDamage: allChampions[index].extraDamage + additionalAbilityDamage, iteration: allChampions[index].abilityProjectileSpeed }
                  const newProjectileList = [ ...closestEnemy.projectiles, newProjectile ];
                  allChampions[closestEnemy.index] = { ...closestEnemy, projectiles: newProjectileList };

                  const newIterationsRemaining = { ...allChampions[index].iterationsRemaining, ability: allChampions[index].abilityCastTime };
                  allChampions[index] = { ...allChampions[index], mana: 0, iterationsRemaining: newIterationsRemaining };
                  // console.log(`${allChampions[index].type} of ${allChampions[index].team} fired an ability to ${closestEnemy.type}.`);

                } else {  
                  // Reduce iterations until casting next ability by 1
                  const newIterationsRemaining = { ...allChampions[index].iterationsRemaining, ability: allChampions[index].iterationsRemaining.ability - 1 };
                  allChampions[index] = {
                    ...allChampions[index],
                    iterationsRemaining: newIterationsRemaining, 
                  };

                }
              }
            }
          }
        }

        return selectedChampionFound && allChampions[index].alive;
      };
  
      const updateChampionsSequentially = async (startTime) => {
        var selectedChampionCompleted = false;

        for (let index = 0; index < allChampions.length; index++) {
          const selectedChampionFound = await updateChampionAtIndex(index);
          if (selectedChampionFound) {
            setSelectedChampion(allChampions[index]);
            selectedChampionCompleted = true;
          }
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
            if (!selectedChampionCompleted) {
              setSelectedChampion(champion);
              selectedChampionCompleted = true;
            }
          } else {
            champion = {
              ...champion, index: iteration
            };
            updatedEnemyChampions.push(champion);
            if (!selectedChampionCompleted) {
              setSelectedChampion(champion);
              selectedChampionCompleted = true;
            }
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
        return 459.75 + 32.7 + ((coordinate + 1) * 2.95) + (coordinate * 62.4) + 62.4 / 2;
      }
      return 459.75 + ((coordinate + 1) * 2.95) + (coordinate * 62.4) + 62.4 / 2;
    }
    if (leftOrTop === 'top') {
      return (coordinate * 20.3) + (coordinate * 36) + 36 + 158.11;
    }
  }

  const convertToHexagons = (coordinate, leftOrTop, even) => {
    if (leftOrTop === 'left') {
      if (even) {
        return Math.floor((coordinate - 32.7 - 459.75 - 2.95 - 31.2) / (2.95 + 62.4));
      }
      return Math.floor((coordinate - 2.95 - 31.2 - 459.75) / (2.95 + 62.4));
    }
    if (leftOrTop === 'top') {
      return Math.floor((coordinate - 36 - 158.11) / (20.3 + 36));
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

      const enemyOverlappingIndex = enemyChampions.findIndex(
        (champion, index) => index !== dragStartIndex && areChampionsOverlapping(champion, targetHexagon)
      );

      if (enemyOverlappingIndex === -1) {
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
    if (circleCoordinates.top >= 398.31 && dragStartIndex !== null) {
      const targetChampion = {
        currentPosition: {
          left: circleCoordinates.left,
          top: circleCoordinates.top
        }
      };

      const overlappingIndex = userChampions.findIndex(
        (champion, index) => index !== dragStartIndex && areChampionsOverlapping(champion, targetChampion)
      );

      const enemyOverlappingIndex = enemyChampions.findIndex(
        (champion, index) => index !== dragStartIndex && areChampionsOverlapping(champion, targetChampion)
      );

      if (enemyOverlappingIndex === -1) {
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
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '90vh', width: '100vw', backgroundColor: '#13293D', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '95%' }}>
        <div className='section left-section'>
          <DualButton />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Traits />
          </div>
          <Augments />
        </div>
        <div className='section center-section'>
          {isCombatActive === 2 && (
            <div className="overlay">
              {userChampions.length > 0 && (
                <div className="result-message win">
                  You Win!
                </div>
              )}
              {enemyChampions.length > 0 && (
                <div className="result-message lose">
                  You Lose!
                </div>
              )}
            </div>
          )}
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
                onClick={() => setSelectedChampion(champion)}
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
                  originalHealth={champion.originalHealth}
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
                onClick={() => setSelectedChampion(champion)}
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
                  originalHealth={champion.originalHealth}
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
        </div>
        <div className='section right-section'>
          <ChampionDisplay champion={selectedChampion} />
          <div style={{ display: 'flex', width: '225px', height: '50px', marginBottom: '10px' }}>
            {isCombatActive !== 2 && (
              <button
                style={{
                  flex: '1',
                  padding: '10px',
                  borderRadius: '15px',
                  backgroundColor: isCombatActive !== 0 ? '#ccc' : '#4CAF50',
                  color: '#ffffff',
                  fontSize: '16px',
                  fontWeight: 'bold',
                }}
                disabled={isCombatActive !== 0}
                onClick={startCombat}
              >
                Submit
              </button>
            )}
            {isCombatActive === 2 && (
              <button
                style={{
                  flex: '1',
                  padding: '10px',
                  borderRadius: '15px',
                  backgroundColor: '#4CAF50',  
                  color: '#ffffff',
                  fontSize: '16px',
                  fontWeight: 'bold',
                }}
                disabled={isCombatActive === 1}
                onClick={handleNextPuzzleClick}
              >
                Next Puzzle
              </button>
            )}
          </div>
        </div>
      </div>
      <div style={{ width: '100%', height: '5%' }} />
    </div>
  );
}

export default Board;
