import Card from "./Card";
import getRandomCards from "../modules/getRandomCards";
import { useState } from "react";

const Main = (props) => {
  let { gameStarted, endGame, incMoves, numPairs } = props;
  let [firstCard, setFirstCard] = useState(null);
  let [remainingPairs, setRemainingPairs] = useState(numPairs - 1);
  let [shuffledCards, setShuffledCards] = useState(null);
  let [flipFlag, setFlipFlag] = useState(new Array(16).fill(0));

  if (shuffledCards === null) setShuffledCards(getRandomCards());

  let handleCardClick = (key, value) => {
    incMoves();

    if (firstCard === null) setFirstCard([key, value]);
    else {
      if (firstCard[1] === value) {
        setRemainingPairs(remainingPairs - 1);
        if (remainingPairs === 0) endGame();
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
      {gameStarted &&
        shuffledCards.map((value, key) => (
          <Card
            key={key}
            id={key}
            value={value}
            gameStarted={gameStarted}
            handleCardClick={handleCardClick}
            doFlip={flipFlag[key]}
          />
        ))}
    </main>
  );
};

export default Main;