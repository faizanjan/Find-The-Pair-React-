import Header from "./components/Header";
import Main from "./components/Main";
import { useState } from "react";

export default function App() {
  let [gameStarted, setGameStarted] = useState(false);
  let intervalInstance;

  function startGame() {
    if (gameStarted) location.reload();
    setGameStarted(true);
  }

  return (
    <div className="App">
      <Header
        gameStarted={gameStarted}
        startGame={startGame}
        intervalInstance={intervalInstance}
      />

      <Main gameStarted={gameStarted} intervalInstance={intervalInstance} />
    </div>
  );
}
