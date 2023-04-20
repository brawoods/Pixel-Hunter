import React from 'react';

export default function Leaderboard({ leaderboard }) {
  return (
    <div className="leaderboard">
      <div className="title">Leaderboard</div>
      {leaderboard.map((player, index) => <div key={index} className="global-scores">{player.userName} {player.score}</div>)}
    </div>

  );
}
