let getRandomCards = (level) => {
  let cardCount = level * level;
  let cards = new Array(cardCount / 2).fill(0);
  cards = cards.map((value, key) => key + 1); // can add anything to the cards instead of numbers
  cards = [...cards, ...cards];
  let cardObjects = cards
    .map((value) => ({ value, sort: Math.random() })) // Assign a random sort value to each element
    .sort((a, b) => a.sort - b.sort) // Sort the array based on the random sort values
    .map((item) => {
      // Extract the shuffled values
      return {
        cardValue: item.value,
        isPaired: false, //initialize the card as not paired
        flipFlag: 0,
      };
    });
  return cardObjects;
};

export default getRandomCards;
