import React from 'react';

export default function GameHeader({ problem, score }) {
  return (
    <div id="game-header">
      <div>Problem: {`${problem[0]} + ${problem[1]}`}</div>
      <div>Score: {score}</div>
      <div>High Score: {localStorage.getItem('pixelScore')}</div>
    </div>
  );
}
