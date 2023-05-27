import Header from "./components/Header";
import Main from "./components/Main";
import { useRef, useState } from "react";

export default function App() {
  let [isGameStarted, setGameStarted] = useState(false);
  let [movesCount, setMovesCount] = useState(0);
  let [timer, setTimer] = useState(0);
  let [level, setLevel] = useState(4);
  let intervalInstance = useRef();

  let incMoves = () => {
    setMovesCount(++movesCount);
  };

  const startTimer = () => {
    const instanceId = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);
    intervalInstance.current = instanceId;
  };

  const stopTimer = () => {
    clearInterval(intervalInstance.current);
    intervalInstance.current = null;
  };

  function startGame() {
    // eslint-disable-next-line no-restricted-globals
    if (isGameStarted) location.reload();
    setGameStarted(true);
  }

  return (
    <div className="App">
      <Header
        isGameStarted={isGameStarted}
        startGame={startGame}
        startTimer={startTimer}
        secondsCount={timer}
        movesCount={movesCount}
      />

      <Main
        isGameStarted={isGameStarted}
        incMoves={incMoves}
        level={level}
        stopTimer={stopTimer}
        secondsCount={timer}
      />
    </div>
  );
}
