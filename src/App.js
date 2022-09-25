import "./App.css";
// import deck from "./Deck.json";
import { useDeck } from "./useDeck.js";
import { useState, useEffect } from "react";
import Card from "../src/components/Card.jsx";
import Score from "../src/components/Score.jsx";
function App() {
  // getting a shuffled deck
  const [shuffleDeck, setShuffleDeck] = useDeck();

  // one card to dealer
  const [dealerCards, setDealerCards] = useState([]);

  // two carsd to Player
  const [playerCards, setPlayerCards] = useState([]);
  console.log("player cards before start" + playerCards);

  // score for player
  const [playerScore, setPlayerScore] = useState(0);

  // Score for Dealer
  const [dealerScore, setDealerScore] = useState(0);

  // state for dealers turn
  const [dealerTurn, setDealerTurn] = useState(false);

  useEffect(() => {
    console.log(shuffleDeck);
  }, []);

  useEffect(() => {
    console.log("Dealer cards", dealerCards);
  }, [dealerCards]);

  useEffect(() => {
    console.log("Player cards", playerCards);
  }, [playerCards]);

  // updating player score
  useEffect(() => {
    let newScore = playerCards.map((card, i) => {
      return card.cardValue;
    });
    console.log("Score", newScore);

    setPlayerScore(getScore(playerCards));
    console.log("player score updated", playerScore);
  }, [playerCards]);

  // updating Dealer's score
  useEffect(() => {
    let newScore = dealerCards.map((card, i) => {
      return card.cardValue;
    });
    console.log("Score", newScore);
    setDealerScore(getScore(dealerCards));
  }, [dealerCards]);

  // useEffect for updating dealerTurn
  useEffect(() => {
    if (dealerTurn === true) {
      console.log("this is dealers turn");
    }
  }, [dealerTurn]);

  // function for calculating the score

  const getScore = (cardArray) => {
    let totalScore = 0;
    for (let i = 0; i < cardArray.length; i++) {
      totalScore += cardArray[i].cardValue; // not working corractly for ACE card [11,1]
      console.log("Score", totalScore);
    }
    return totalScore;
  };

  // onClick function on Start game Button
  const startGame = () => {
    console.log("Starting game...");
    // console.log(shuffleDeck);
    setDealerCards((prev) => [...prev, ...shuffleDeck.splice(0, 1)]);
    setPlayerCards((prev) => [...prev, ...shuffleDeck.splice(0, 2)]);
  };
  // onClick function for Hold Button
  const hold = () => {
    console.log("Holding...");
    setDealerTurn(true);
  };
  return (
    <div className="App">
      <h1>BlackJack</h1>
      <div className="dealer-cards">
        <Score currentScore={dealerScore} />
        {dealerCards.map((card, index) => (
          <Card key={index} currentCard={card} />
        ))}
      </div>
      <button onClick={startGame}>Start Game</button>
      <button onClick={hold}>Hold</button>
      <div className="player-cards">
        {playerCards.map((card, index) => (
          <Card key={index} currentCard={card} />
        ))}
        <Score currentScore={playerScore} />
      </div>
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
