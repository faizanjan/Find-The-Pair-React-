import Card from "./Card";
import getRandomCards from "../modules/getRandomCards";
import { useState } from "react";

const Main = (props) => {
  let { gameStarted, stopTimer, incMoves, numPairs } = props;
  let [firstCard, setFirstCard] = useState(null);
  let [remainingPairs, setRemainingPairs] = useState(numPairs - 1);
  let [shuffledCards, setShuffledCards] = useState(getRandomCards());
  let [flipFlag, setFlipFlag] = useState(new Array(16).fill(0));
  let [paired, setPaired] = useState(new Array(16).fill(false));
  let [gameEnded, setGameEnded] = useState(false);

  let handleCardClick = (key, value) => {
    incMoves();

    if (firstCard === null) setFirstCard([key, value]);
    else {
      if (firstCard[1] === value) {
        setPaired(
          paired.map((el, index) => {
            if (key===index || firstCard[0]===index) return true;
            else return el;
          })
        );
        setRemainingPairs(remainingPairs - 1);
        if (remainingPairs === 0) {
          stopTimer();
          setGameEnded(true);
        }
        setFirstCard(null);
      } else {
        setTimeout(() => {
          hideCard(firstCard[0], key);
          setFirstCard(null);
        }, 500);
      }
    }
  };

  let hideCard = (...args) => {
    setFlipFlag(
      flipFlag.map((el, key) => {
        if (args.includes(key)) return ++el;
        else return el;
      })
    );
  };

  return (
    <main>
      {!gameStarted && <h1>PRESS START TO BEGIN</h1>}
      {(gameStarted && gameEnded) && <h1 id="game-won">GAME WON in {props.timer} seconds</h1>}
      {(gameStarted && !gameEnded) &&
        shuffledCards.map((value, key) => (
          <Card
            key={key}
            id={key}
            value={value}
            gameStarted={gameStarted}
            handleCardClick={handleCardClick}
            doFlip={flipFlag[key]}
            paired={paired[key]}
          />
        ))}
    </main>
  );
};

export default Main;