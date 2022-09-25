import { useEffect } from "react";
import "./App.css";
// import deck from "./Deck.json";
import { useDeck } from "./useDeck.js";
// import { useState, useEffect } from "react";
function App() {
  const [shuffleDeck, setShuffleDeck] = useDeck();
  console.log(shuffleDeck);

  useEffect(() => {
    console.log(shuffleDeck);
  });

  // onClick function on Start game Button
  const startGame = () => {
    console.log("Starting game...");
    console.log(shuffleDeck);
  };
  return (
    <div className="App">
      <h1>BlackJack</h1>
      <button onClick={startGame}>Start Game</button>
    </div>
  );
}

export default App;

// console.log(shuffleDeck);
// const freshDeck = deck.cards.map((card) => {
//   let newCard = card.cardName + card.cardFace + card.cardValue;
//   return newCard;
// });

// const freshDeck = deck.cards;
// console.log(freshDeck);

// creating a random shuffled deck
// const [shuffleDeck, setShuffleDeck] = useState(freshDeck);
// console.log(shuffleDeck); //here it gives an array with 52 cards
// // useEffect to check shuffle deck update
// useEffect(() => {
//   if (shuffleDeck.length > 0) {
//     console.log("Shuffled Deck : " + shuffleDeck);
//   }
// }, [shuffleDeck]);
