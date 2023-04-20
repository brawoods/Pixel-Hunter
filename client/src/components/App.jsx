import React, { useState, useEffect, useRef } from 'react';
import useInterval from '../hooks';
import GameHeader from './game';
import { PageHeader, UserLogin } from './header';

export default function App() {
  const scale = 20;
  const initialPlayer = [scale / 2, scale / 2];
  // const initialSolution = [initialPlayer[0] * 5 - 10, initialPlayer[1] * 5 + 10];
  const initialSolution = [scale - 17, scale - 17];
  const initialEnemies = [[scale - 15, scale - 15], [scale - 1, scale - 1]];
  const initialProblem = [1, 1];
  const delay = 200;

  const [player, setPlayer] = useState(initialPlayer);
  const [problem, setProblem] = useState(initialProblem);
  const [solution, setSolution] = useState(initialSolution);
  const [enemies, setEnemies] = useState(initialEnemies);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const canvasRef = useRef(null);
  // CURRENTLY UNUSED
  function generateProblem() {
    const a = Math.floor(Math.random() * 5);
    const b = Math.floor(Math.random() * 5);
    return [a, b];
  }

  function checkCollision(piece1, piece2) {
    if (piece1[0] === piece2[0] && piece1[1] === piece2[1]) {
      return true;
    }
    return false;
  }

  function setRandomPosition() {
    let pos = [];
    function genCoord() {
      const x = Math.floor((Math.random() * scale - 1) + 1);
      const y = Math.floor((Math.random() * scale - 1) + 1);
      if (player[0] === x || player[1] === y) {
        genCoord();
      }
      pos = [x, y];
    }
    genCoord();
    return pos;
  }

  function placePieces() {
    const newSolution = setRandomPosition();
    setSolution(newSolution);
  }

  function handleScore() {
    const highScore = window.localStorage.getItem('pixelScore');
    if (score > highScore) {
      window.localStorage.setItem('pixelScore', score);
    }
  }

  function changeDirection([x, y], piece) {
    const newPiece = [...piece];
    const nextPosition = [newPiece[0] + x, newPiece[1] + y];
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
    return nextPosition;
  }

  function randomlyMove(piece) {
    // randomly select axis and direction
    const axis = Math.round(Math.random() * 1);
    const direction = Math.round(Math.random() * 1);
    // console.log('axis', axis);
    // console.log('direction', direction);
    // Y AXIS
    if (axis > 0) {
      if (direction > 0) {
        // UP
        return changeDirection([0, -1], piece);
      }
      // DOWN
      return changeDirection([0, 1], piece);
    }
    // X AXIS
    if (direction > 0) {
      // LEFT
      return changeDirection([-1, 0], piece);
    }
    // RIGHT
    return changeDirection([1, 0], piece);
  }

  // runs at 100ms in useInterval
  function runGame() {
    // check collision with solution
    if (checkCollision(player, solution)) {
      setScore(score + 1);
      placePieces();
    }
    // check collision with enemy
    enemies.forEach((enemy) => {
      if (checkCollision(player, enemy)) {
        setGameOver(true);
        handleScore();
      }
    });
    // MOVE ENEMIES
    setEnemies(enemies.map((enemy) => {
      const newEnemy = randomlyMove(enemy);
      return newEnemy;
    }));
  }

  // SETUP
  useEffect(() => {
    canvasRef.current.focus();
    const newProblem = generateProblem();
    setProblem(newProblem);
  }, []);

  // PAINT TO CANVAS
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      // GAME OVER
      if (gameOver) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'red';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.setTransform(scale / 4, 0, 0, scale / 4, 0, 0);
        ctx.fillStyle = 'black';
        ctx.fillText('GAME OVER', scale / 2, scale * 2);
      } else {
        // player
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.setTransform(scale, 0, 0, scale, 0, 0);
        ctx.fillStyle = 'green';
        ctx.fillRect(player[0], player[1], 1, 1);
        // solution
        ctx.setTransform(scale, 0, 0, scale, 0, 0);
        ctx.fillStyle = 'blue';
        ctx.fillRect(solution[0], solution[1], 1, 1);
        // enemies
        enemies.forEach(([x, y]) => {
          ctx.setTransform(scale, 0, 0, scale, 0, 0);
          ctx.fillStyle = 'red';
          ctx.fillRect(x, y, 1, 1);
        });
      }
    }
  }, [player, solution, enemies, gameOver]);

  // SET GAME STATE
  useInterval(() => runGame(), delay);

  function move(e) {
    switch (e.key) {
      case 'ArrowUp':
        setPlayer(changeDirection([0, -1], player));
        break;
      case 'ArrowDown':
        setPlayer(changeDirection([0, 1], player));
        break;
      case 'ArrowLeft':
        setPlayer(changeDirection([-1, 0], player));
        break;
      case 'ArrowRight':
        setPlayer(changeDirection([1, 0], player));
        break;
      default:
    }
  }

  function play() {
    setScore(0);
    setGameOver(false);
    setPlayer(initialPlayer);
    const newSolution = setRandomPosition();
    setSolution(newSolution);
    const newProblem = generateProblem();
    setProblem(newProblem);
    const newEnemies = enemies.map(() => {
      const newEnemy = setRandomPosition();
      return newEnemy;
    });
    setEnemies(newEnemies);
    canvasRef.current.focus();
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
