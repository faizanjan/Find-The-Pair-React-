import { useState } from "react";

function Header(props) {
  let { isGameStarted, startGame, startTimer, secondsCount, movesCount } = props;

  function triggerStartGame() {
    startGame();
    setTimeout(() => {
      startTimer();
    }, 2000);
  }

  return (
    <header>
      <button id="start" onClick={triggerStartGame}>
        {isGameStarted ? "RELOAD" : "START"}
      </button>

      <div id="timer-and-moves">
        <h3 id="moves">
          Moves: <span id="moves-count">{movesCount}</span>
        </h3>
        <h3 id="timer">
          Time: <span id="time">{secondsCount}</span> secs
        </h3>
      </div>
    </header>
  );
}

export default Header;
