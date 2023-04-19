import React, { useState, useEffect, useRef } from 'react';
import GameHeader from './game';
import { PageHeader, UserLogin } from './header';

export default function App() {
  const initialPlayer = [2, 8];
  const initialSolution = [initialPlayer[0]*5, initialPlayer[1]*5 + 5];
  const initialProblem = [1, 1];
  const scale = 20;

  const [player, setPlayer] = useState(initialPlayer);
  const [problem, setProblem] = useState(initialProblem);
  const [solution, setSolution] = useState(initialSolution);
  // const [enemies, setEnemies] = useState(initialEnemies);
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
      // player
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.setTransform(scale, 0, 0, scale, 0, 0);
      ctx.fillStyle = 'green';
      ctx.fillRect(player[0], player[1], 1, 1);
      // solution
      ctx.setTransform(scale/5, 0, 0, scale/5, 0, 0);
      ctx.fillStyle = 'blue';
      ctx.fillText('2', solution[0], solution[1]);
    }
  }, [player]);

  function generateProblem() {
    let a = Math.floor(Math.random() * 5);
    let b = Math.floor(Math.random() * 5);
    return [a, b];
  }

  useEffect(() => {
    const newProblem = generateProblem();
    setProblem(newProblem);
  }, []);

  function changeDirection([x, y]) {
    const newPlayer = [...player];
    const nextPosition = [newPlayer[0] + x, newPlayer[1] + y];
    // check if play area boudary
    if (nextPosition[0] < 0) {
      nextPosition[0] = 0;
    }
    if (nextPosition[0] >= scale) {
      nextPosition[0] = scale - 1;
    }
    if (nextPosition[1] < 0) {
      nextPosition[1] = 0;
    }
    if (nextPosition[1] >= scale) {
      nextPosition[1] = scale - 1;
    }
    // check if bad answer
    setPlayer(nextPosition);
  }

  function move(e) {
    switch (e.key) {
      case 'ArrowUp':
        console.log('up', player);
        changeDirection([0, -1]);
        break;
      case 'ArrowDown':
        console.log('down', player);
        changeDirection([0, 1]);
        break;
      case 'ArrowLeft':
        console.log('left', player);
        changeDirection([-1, 0]);
        break;
      case 'ArrowRight':
        console.log('right', player);
        changeDirection([1, 0]);
        break;
      default:
    }
  }

  function play() {
    setPlayer(initialPlayer);
    setSolution(initialSolution);
    const newProblem = generateProblem();
    setProblem(newProblem);
    setScore(0);
    setGameOver(false);
    // setEnemies(initialEnemies);
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
        <canvas id="canvas" ref={canvasRef} width="400" height="400" tabIndex={0} onKeyDown={(e) => move(e)} />
        <button type="button" onClick={() => play()}>Play</button>
      </div>
    </div>
  );
}
