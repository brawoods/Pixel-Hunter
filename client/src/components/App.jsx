import React, { useState } from 'react';
import { GameHeader, Canvas } from './game';
import { PageHeader, UserLogin } from './header';

export default function App() {
  const canvasX = 1000;
  const canvasY = 1000;

  // const [player, setPlayer] = useState(initialPlayer);
  // const [solution, setSolution] = useState(initialSolution);
  // const [enemies, setEnemies] = useState(initialEnemies);
  // const [direction, setDirection] = useState([0, -1]);
  // const [gameOver, setGameOver] = useState(false);
  // const [score, setScore] = useState(0);
  // const [highScore, setHighScore] = useState(0);


  return (
    <div id="App">
      <div id="header">
        <PageHeader />
        <UserLogin />
      </div>
      <div id="body">
        <GameHeader />
        <Canvas />
      </div>
    </div>
  );
}