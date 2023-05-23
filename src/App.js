import Header from "./components/Header";
import Main from "./components/Main";
import { useState } from "react";

export default function App() {
  let [gameStarted, setGameStarted] = useState(false);
  let [movesCount, setMovesCount] = useState(0);
  let [timer, setTimer] = useState(0);
  let [level, setLevel] = useState(4);

  let incMoves = () => {
    setMovesCount(++movesCount);
  };
  let intervalInstance;


  let startTimer = () => {
    intervalInstance = setInterval(() => {
      setTimer(++timer);
    }, 1000);
  };
  
  let endGame = () => {
    clearInterval(intervalInstance);
    document.querySelector('main').innerHTML = `<h1 id="game-won">GAME WON</h1>;`;
  };
  
  function startGame() {
    if (gameStarted) location.reload();
    setGameStarted(true);
  }

  return (
    <div className="App">
      <Header
        gameStarted={gameStarted}
        startGame={startGame}
        startTimer={startTimer}
        timer={timer}
        movesCount={movesCount}
      />

      <Main
        gameStarted={gameStarted}
        intervalInstance={intervalInstance}
        incMoves={incMoves}
        numPairs={level*level/2}
        endGame={endGame}
      />
    </div>
  );
}
