import "./App.css";
// import deck from "./Deck.json";
import { useDeck } from "./useDeck.js";
import { useState, useEffect } from "react";
import Card from "../src/components/Card.jsx";
function App() {
  // getting a shuffled deck
  const [shuffleDeck, setShuffleDeck] = useDeck();
  console.log(shuffleDeck);

  // one card to dealer
  const [dealerCards, setDealerCards] = useState([]);
  console.log("Dealers initial cards", dealerCards);
  useEffect(() => {
    console.log(shuffleDeck);
    console.log("Dealer cards", dealerCards);
  });

  // onClick function on Start game Button
  const startGame = () => {
    console.log("Starting game...");
    // console.log(shuffleDeck);
    setDealerCards((prev) => [...prev, shuffleDeck.splice(0, 1)]);
  };
  return (
    <div className="App">
      <h1>BlackJack</h1>
      <div className="dealer-cards">
        {dealerCards.map((card, index) => (
          <Card key={index} currentCard={card} />
        ))}
      </div>
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
