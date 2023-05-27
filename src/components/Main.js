import Card from "./Card";
import getRandomCards from "../modules/getRandomCards";
import { useState } from "react";

const Main = (props) => {
  let { isGameStarted, stopTimer, incMoves, level, secondsCount } = props;
  let [firstCard, setFirstCard] = useState(null);
  let [remainingPairsCount, setRemainingPairsCount] = useState((level*level/2) - 1);
  let [shuffledCards, setShuffledCards] = useState(getRandomCards(level));
  let [flipFlag, setFlipFlag] = useState(new Array(16).fill(0));
  let [isPaired, setPaired] = useState(new Array(16).fill(false));
  let [hasGameEnded, setGameEnded] = useState(false);

  let handleCardClick = (key, value) => {
    incMoves();

    if (firstCard === null) setFirstCard([key, value]);
    else {
      if (firstCard[1] === value) {
        setPaired(
          isPaired.map((el, index) => {
            if (key === index || firstCard[0] === index) return true;
            else return el;
          })
        );
        setRemainingPairsCount(remainingPairsCount - 1);
        if (remainingPairsCount === 0) {
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
      {!isGameStarted && <h1>PRESS START TO BEGIN</h1>}
      {isGameStarted && hasGameEnded && (
        <h1 id="game-won">GAME WON in {secondsCount} seconds</h1>
      )}
      {isGameStarted &&
        !hasGameEnded &&
        shuffledCards.map((card, key) => (
          <Card
            key={key} // no other alternative for key
            id={key}
            value={card}
            onCardClick={handleCardClick}
            doFlip={flipFlag[key]}
            isPaired={isPaired[key]}
          />
        ))}
    </main>
  );
};

export default Main;
