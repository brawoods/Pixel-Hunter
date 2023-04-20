import React from 'react';

export default function Leaderboard({ leaderboard }) {
  return (
    <div>
      <div className="leaderboard">Leaderboard</div>
      {leaderboard.map((player, index) => <div key={index}>{player.userName} {player.score}</div>)}
    </div>

  );
}
