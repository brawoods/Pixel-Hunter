import React, { useState, useEffect, useRef } from 'react';
import { GameHeader, Canvas } from './game';
import { PageHeader, UserLogin } from './header';

export default function App() {
  const initialPlayer = [[4, 10]];
  const initialSolution = [[2, 8], [2, 8]];
  const initialProblem = [1, 1];

  const [problem, setProblem] = useState(initialProblem);
  const [player, setPlayer] = useState(initialPlayer);
  const [solution, setSolution] = useState(initialSolution);
  // const [enemies, setEnemies] = useState(initialEnemies);
  const [direction, setDirection] = useState([0, -1]);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const canvasRef = useRef(null);

  useEffect(() => {
    canvasRef.current.focus();
  }, []);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }, []);

  function changeCoord([x, y]) {
    let newPlayer = [...player];
    newPlayer = [newPlayer[0][0] + x, newPlayer[0][1] + y];
    console.log('new player: ', newPlayer);
    setPlayer(newPlayer);
  }

  function move(e) {
    switch (e.key) {
      case 'ArrowUp':
        console.log(player);
        changeCoord([0, -1]);
        break;
      case 'ArrowDown':
        console.log(player);
        changeCoord([0, 1]);
        break;
      case 'ArrowLeft':
        console.log(player);
        changeCoord([-1, 0]);
        break;
      case 'ArrowRight':
        console.log(player);
        changeCoord([1, 0]);
        break;
      default:
    }
  }

  return (
<div id="App">
      <div id="header">
        <PageHeader />
        <UserLogin />
      </div>
      <div id="body">
        <GameHeader problem={problem} score={score} />
        {/* <Canvas /> */}
        <canvas id="canvas" ref={canvasRef} tabIndex={0} onKeyDown={(e) => move(e)} />
        <button type="button">Play</button>
      </div>
    </div>
  );
}
