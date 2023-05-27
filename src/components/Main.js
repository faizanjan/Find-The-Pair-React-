import Card from "./Card";
import getRandomCards from "../modules/getRandomCards";
import { useState } from "react";

const Main = (props) => {
  let { isGameStarted, stopTimer, incMoves, level, secondsCount } = props;
  let [firstCard, setFirstCard] = useState(null);
  let [remainingPairsCount, setRemainingPairsCount] = useState(
    (level * level) / 2 - 1
  );
  let [cardObjects, setCardObjects] = useState(getRandomCards(level));
  let [hasGameEnded, setGameEnded] = useState(false);

  let handleCardClick = (key, value) => {
    incMoves();

    if (firstCard === null) setFirstCard([key, value]);
    else {
      if (firstCard[1] === value) {
        setCardObjects(
          cardObjects.map((obj, index) => {
            if (key === index || firstCard[0] === index)
              return {
                ...obj,
                isPaired: true,
              };
            else return obj;
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
    setCardObjects(
      cardObjects.map((obj, key) => {
        if (args.includes(key))
          return {
            ...obj,
            flipFlag: obj.flipFlag + 1,
          };
        else return obj;
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
        cardObjects.map((card, key) => (
          <Card
            key={key} // no other alternative for key
            id={key}
            value={card.cardValue}
            onCardClick={handleCardClick}
            doFlip={card.flipFlag}
            isPaired={card.isPaired}
          />
        ))}
    </main>
  );
};

export default Main;
