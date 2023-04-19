import React, { useState } from 'react';
import { GameHeader, Canvas } from './game';
import { PageHeader, UserLogin } from './header';

export default function App() {
  const initialPlayer = [[4.10], [4, 10]];
  const initialSolution = [[2, 8], [2, 8]];
  const initialProblem = [1, 1];

  const [problem, setProblem] = useState(initialProblem);
  const [player, setPlayer] = useState(initialPlayer);
  const [solution, setSolution] = useState(initialSolution);
  // const [enemies, setEnemies] = useState(initialEnemies);
  const [direction, setDirection] = useState([0, -1]);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);



  return (
    <div id="App">
      <div id="header">
        <PageHeader />
        <UserLogin />
      </div>
      <div id="body">
        <GameHeader problem={problem} score={score} />
        <Canvas />
        <button type="button">Play</button>
      </div>
    </div>
  );
}
