import Card from "./Card";
import {useState, useEffect } from "react";

const Main = (props) => {
  let { gameStarted, endGame, incMoves, numPairs } = props;
  let [firstCard, setFirstCard] = useState(null);
  let [remainingPairs, setRemainingPairs] = useState(numPairs-1);
  
  useEffect(() => {
    if (gameStarted === true) {
      assignValues();

      let cards = document.querySelectorAll(".card");

      showAllCards(cards);

      setTimeout(() => {
        //hide cards after 2 seconds
        hideAllCards(cards);
      }, 2000);
    }
  }, [gameStarted]);

  let assignValues = () => {
    const usedInt = [];
    const assignedCards = [];
    let cards = document.querySelectorAll(".card");
    let cardsValues = document.querySelectorAll(".card-value");

    let i = 0;
    while (usedInt.length < 8) {
      let randomInt = null;
      while (randomInt === null || usedInt.includes(randomInt)) {
        randomInt = Math.floor(Math.random() * 8) + 1;
      }
      usedInt.push(randomInt);

      let randElement1 = null;
      while (randElement1 === null || assignedCards.includes(randElement1)) {
        randElement1 = Math.floor(Math.random() * 16);
      }
      assignedCards.push(randElement1);

      let randElement2 = null;
      while (randElement2 === null || assignedCards.includes(randElement2)) {
        randElement2 = Math.floor(Math.random() * 16);
      }
      assignedCards.push(randElement2);

      cards[randElement1].setAttribute("id", randomInt);
      cards[randElement2].setAttribute("id", randomInt);
      cardsValues[randElement1].innerText = randomInt;
      cardsValues[randElement2].innerText = randomInt;
    }
  };

  let showAllCards = (cards) => {
    cards.forEach((card) => {
      card.classList.add("active-card");
    });
  };

  let hideAllCards = (cards) => {
    cards.forEach((card) => {
      card.classList.remove("active-card");
      card.style.animation = "flip 0.3s linear";
    });
  };

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
        firstCard.style.background = "green";
        element.style.background = "green";
        setRemainingPairs(remainingPairs-1);
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

  let cardsArr = new Array(16).fill(<Card/>);

  return (
    <main onClick={handleCardClick}>
      {gameStarted ? cardsArr : <h1>PRESS START TO BEGIN</h1>}
    </main>
  );
};

export default Main;
