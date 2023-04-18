import React from 'react';
import { GameField } from './game';
// import { PageHeader, UserLogin } from './header';

export default function App() {

  return (
    <div id="App">Hello World
      {/* <div id="header">
        <PageHeader />
        <UserLogin />
      </div> */}
      <div id="body">
        <GameField />
      </div>
    </div>
  );
}