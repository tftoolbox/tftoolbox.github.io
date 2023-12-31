import React, { useState } from 'react';
import './Board.css';
import Hexagon from './Hexagon';

function Board() {
  const [isDragging, setDragging] = useState(false);
  const [enemyCircles, setEnemyCircles] = useState([{ left: 9, top: 11, backgroundColor: "rgba(255, 0, 0, 1)" }, { left: 74.5, top: 11, backgroundColor: "rgba(255, 0, 0, 1)" }]);
  const [userCircles, setUserCircles] = useState([{ left: 433.85, top: 405.1, backgroundColor: "rgba(0, 255, 0, 1)" }, { left: 368.5, top: 405.1, backgroundColor: "rgba(0, 0, 255, 1)" }]);
  const [draggedPlayer, setDraggedPlayer] = useState(null);
  const [dragStartIndex, setDragStartIndex] = useState(null);

  const areCirclesOverlapping = (circle1, circle2) => {
    const dx = circle1.left - circle2.left;
    const dy = circle1.top - circle2.top;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < 50; // You may need to adjust this threshold based on your circle size
  };

  const handleDragStart = (event, player, index) => {
    if (player === 'enemy') {
      event.preventDefault(); // Prevent dragging for enemy circles
      return;
    }

    event.dataTransfer.setData('text/plain', 'circle'); // Data to be transferred during drag
    setDragging(true);
    setDraggedPlayer(player);
    setDragStartIndex(index);
  };

  const handleCircleDragStart = (event, player, index) => {
    if (player === 'enemy') {
      event.preventDefault(); // Prevent dragging for enemy circles
      return;
    }

    event.dataTransfer.setData('text/plain', 'circle'); // Data to be transferred during drag
    setDragging(true);
    setDraggedPlayer(player);
    setDragStartIndex(index);
  };

  const handleDragEnd = () => {
    setDragging(false);
    setDraggedPlayer(null);
    setDragStartIndex(null);
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

  const handleDrop = (event, hexagonCoordinates, player) => {
    event.preventDefault();

    if (draggedPlayer === 'enemy') {
      return;
    }
    if (player === 'user' && dragStartIndex !== null) {
      const circle = document.querySelector('.circle-overlay');
      const hexagonCenterX = hexagonCoordinates.even + ((hexagonCoordinates.left + 1) * 2.95) + (hexagonCoordinates.left * 62.4) + 62.4 / 2;
      const hexagonCenterY = ((hexagonCoordinates.top) * 20.3) + (hexagonCoordinates.top * 36) + 36;

      const targetHexagon = {
        left: hexagonCenterX - circle.clientWidth / 2,
        top: hexagonCenterY - circle.clientHeight / 2,
      };

      const overlappingIndex = userCircles.findIndex(
        (circle, index) => index !== dragStartIndex && areCirclesOverlapping(circle, targetHexagon)
      );

      if (overlappingIndex !== -1) {
        setUserCircles((prevCircles) => {
          const updatedCircles = [...prevCircles];
          updatedCircles[overlappingIndex] = {
            ...prevCircles[overlappingIndex], 
            left: prevCircles[dragStartIndex].left, 
            top: prevCircles[dragStartIndex].top
          };
          updatedCircles[dragStartIndex] = {
            ...prevCircles[dragStartIndex],
            left: targetHexagon.left, 
            top: targetHexagon.top
          };
          return updatedCircles;
        });
      } else {
        setUserCircles((prevCircles) => {
          const updatedCircles = [...prevCircles];
          updatedCircles[dragStartIndex] = {
            ...targetHexagon,
            backgroundColor: updatedCircles[dragStartIndex].backgroundColor, // Maintain color
          };
          return updatedCircles;
        });
      }
    }
  };

  const handleCircleDrop = (event, circleCoordinates, player) => {
    event.preventDefault();

    if (draggedPlayer === 'enemy') {
      return;
    }
    if (player === 'user' && dragStartIndex !== null) {
      const circle = document.querySelector('.circle-overlay');

      const targetCircle = {
        left: circleCoordinates.left,
        top: circleCoordinates.top
      };

      const overlappingIndex = userCircles.findIndex(
        (circle, index) => index !== dragStartIndex && areCirclesOverlapping(circle, targetCircle)
      );

      if (overlappingIndex !== -1) {
        setUserCircles((prevCircles) => {
          const updatedCircles = [...prevCircles];
          updatedCircles[overlappingIndex] = {
            ...prevCircles[overlappingIndex], 
            left: prevCircles[dragStartIndex].left, 
            top: prevCircles[dragStartIndex].top
          };
          updatedCircles[dragStartIndex] = {
            ...prevCircles[dragStartIndex],
            left: targetCircle.left, 
            top: targetCircle.top
          };
          return updatedCircles;
        });
      } else {
        setUserCircles((prevCircles) => {
          const updatedCircles = [...prevCircles];
          updatedCircles[dragStartIndex] = {
            ...targetCircle,
            backgroundColor: updatedCircles[dragStartIndex].backgroundColor, 
          };
          return updatedCircles;
        });
      }
    }
  };

  return (
      <div>
        <div className='hex-row'>
          {enemyCircles.map((circle, index) => (
            <div
              key={index}
              className={`circle-overlay ${isDragging && draggedPlayer === 'enemy' ? 'dragging' : ''}`}
              style={{ left: circle.left + 'px', top: circle.top + 'px', backgroundColor: circle.backgroundColor }}
              draggable
              onDragStart={(e) => handleCircleDragStart(e, 'user', index)}
              onDragEnd={handleCircleDragEnd}
              onDragOver={(e) => handleDragOver(e)}
              onDrop={(e) => handleCircleDrop(e, { left: circle.left, top: circle.top }, 'user')}
            ></div>
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
          {userCircles.map((circle, index) => (
            <div
              key={index}
              className={`circle-overlay ${isDragging && draggedPlayer === 'user' ? 'dragging' : ''}`}
              style={{ left: circle.left + 'px', top: circle.top + 'px', backgroundColor: circle.backgroundColor }}
              draggable
              onDragStart={(e) => handleCircleDragStart(e, 'user', index)}
              onDragEnd={handleCircleDragEnd}
              onDragOver={(e) => handleDragOver(e)}
              onDrop={(e) => handleCircleDrop(e, { left: circle.left, top: circle.top }, 'user')}
            ></div>
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
