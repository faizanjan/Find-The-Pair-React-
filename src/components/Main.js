import Card from "./Card";
import getRandomCards from "../modules/getRandomCards";
import { useState, useEffect } from "react";

const Main = (props) => {
  let { gameStarted, endGame, incMoves, numPairs } = props;
  let [firstCard, setFirstCard] = useState(null);
  let [remainingPairs, setRemainingPairs] = useState(numPairs - 1);
  let [shuffledCards, setShuffledCards] = useState(null);

  if (shuffledCards === null) setShuffledCards(getRandomCards());

  let handleCardClick = (event) => {
    // Checks
    if (
      !event.target.classList.contains("card") ||
      event.target.classList.contains("active-card") ||
      !gameStarted
    )
      return;

    incMoves();

    let element = event.target;
    showCard(element);

    if (firstCard === null) setFirstCard(element);
    else {
      if (
        firstCard.getAttribute("id") === element.getAttribute("id") &&
        firstCard !== element // prevent pairing a card with itself
      ) {
        firstCard.style.background = "none";
        element.style.background = "none";
        setRemainingPairs(remainingPairs - 1);
        if (remainingPairs === 0) endGame();
        setFirstCard(null);
      } else {
        setTimeout(() => {
          hideCard(firstCard);
          hideCard(element);
          setFirstCard(null);
        }, 500);
      }
    }
  };

  let showCard = (card) => {
    card.style.animation = "flipBack 0.3s linear";
    setTimeout(() => {
      card.classList.add("active-card");
    }, 200);
  };

  let hideCard = (card) => {
    card.classList.remove("active-card");
    card.style.animation = "flip 0.3s linear";
  };

  return (
    <main onClick={handleCardClick}>
      {!gameStarted && <h1>PRESS START TO BEGIN</h1>}
      {gameStarted && shuffledCards.map((value) => <Card value={value} />)}
    </main>
  );
};

export default Main;