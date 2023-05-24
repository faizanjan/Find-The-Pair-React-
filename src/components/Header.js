import { useState } from "react";

function Header(props) {
  let { gameStarted, startGame, startTimer, timer, movesCount } = props;

  function triggerStartGame() {
    startGame();
    setTimeout(() => {
      startTimer();
    }, 2000);
  }

  return (
    <header>
      <button id="start" onClick={triggerStartGame}>
        {gameStarted ? "RELOAD" : "START"}
      </button>

      <div id="timer-and-moves">
        <h3 id="moves">
          Moves: <span id="moves-count">{movesCount}</span>
        </h3>
        <h3 id="timer">
          Time: <span id="time">{timer}</span> secs
        </h3>
      </div>
    </header>
  );
}

export default Header;
