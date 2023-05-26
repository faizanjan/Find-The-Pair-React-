let getRandomCards = () => {
  // ASSIGNING VALUES
  const usedInt = [];
  const assignedCards = [];
  let cards = new Array(16);
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
    cards[randElement1] = randomInt;
    cards[randElement2] = randomInt;
  }
  return cards;
};

export default getRandomCards;
