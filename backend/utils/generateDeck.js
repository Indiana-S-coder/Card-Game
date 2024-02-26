const generateNewDeck = () => {
    const availableCards = ["cat", "defuse", "bomb", "shuffle"];
    const deckSize = 5;
    const deck = [];
  
    for (let i = 0; i < deckSize; i++) {
      const randomIndex = Math.floor(Math.random() * availableCards.length);
      deck.push(availableCards[randomIndex]);
    }
  
    return deck.join(",");
  }
  
  module.exports = { generateNewDeck };
  