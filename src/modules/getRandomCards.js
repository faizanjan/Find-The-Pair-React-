let getRandomCards = (level) => {
  // ASSIGNING VALUES
  const usedInt = [];
  const assignedCards = [];
  let cardCount = level*level
  let cards = new Array(cardCount);
  let i = 0;
  while (usedInt.length < cardCount/2) {
    let randomInt = null;
    while (randomInt === null || usedInt.includes(randomInt)) {
      randomInt = Math.floor(Math.random() * cardCount/2) + 1;
    }
    usedInt.push(randomInt);

    let randElement1 = null;
    while (randElement1 === null || assignedCards.includes(randElement1)) {
      randElement1 = Math.floor(Math.random() * cardCount);
    }
    assignedCards.push(randElement1);

    let randElement2 = null;
    while (randElement2 === null || assignedCards.includes(randElement2)) {
      randElement2 = Math.floor(Math.random() * cardCount);
    }
    assignedCards.push(randElement2);
    cards[randElement1] = randomInt;
    cards[randElement2] = randomInt;
  }
  return cards;
};

export default getRandomCards;
