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

  // score for player
  const [playerScore, setPlayerScore] = useState(0);

  // Score for Dealer
  const [dealerScore, setDealerScore] = useState(0);

  // state for dealers turn
  const [dealerTurn, setDealerTurn] = useState(false);

  // state for count of Ace
  const [aceCount, setAceCount] = useState(0);

  // state for playerBusted
  const [isPlayerBusted, setIsPlayerBusted] = useState(false);

  // state for winner or busted msg
  const [message, setMessage] = useState("");

  // state for disabling buttons
  const [disableHit, setDisableHit] = useState(true);
  const [disableHold, setDisableHold] = useState(true);

  useEffect(() => {
    console.log(shuffleDeck);
    setAceCount(0);
  }, []);

  // useEffect(() => {
  //   console.log("Dealer cards", dealerCards);
  // }, [dealerCards]);

  // useEffect(() => {
  //   console.log("Player cards", playerCards);
  // }, [playerCards]);

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
      if (dealerScore < 17 || dealerScore < playerScore) {
        setTimeout(() => {
          setDealerCards(dealCard(dealerCards));
        }, 600);
      }
      if (dealerScore < 21 && dealerScore >= 17) {
        if (dealerScore > playerScore && dealerScore <= 21) {
          setMessage("Dealer Wins!");
        } else if (dealerScore < playerScore && playerScore <= 21) {
          setMessage("You Win!");
        }
        if (dealerScore === playerScore) {
          setMessage("It's a Tie!!!");
        }
      } else if (dealerScore > 21 && playerScore <= 21) {
        setMessage("Dealer Busted : You Win!!!");
      } else if (dealerScore === 21) {
        setMessage("Black Jack : DealerWins");
      }
    }
  }, [dealerTurn, dealerScore, playerScore]);

  //useEffect for dealer and player card to 0 if player or  dealer busted
  useEffect(() => {
    if (isPlayerBusted === true) {
      setMessage("You Busted!  Start again");
      // setDealerCards([]);
      // setPlayerCards([]);
    }
  }, [isPlayerBusted]);
  // updating isPlayerBusted
  useEffect(() => {
    if (playerScore > 21) {
      setIsPlayerBusted(true);
      // setDealerTurn(false);
    } else if (playerScore === 21) {
      setMessage("Black Jack ");
      setDealerTurn(true);
    }
  }, [playerScore]);

  // function for calculating the score

  const getScore = (cardArray) => {
    let totalScore = 0;

    for (let i = 0; i < cardArray.length; i++) {
      if (cardArray[i].cardName === "A" && aceCount === 0) {
        console.log(cardArray[i].cardValue[0]);
        totalScore += cardArray[i].cardValue[0];
        setAceCount(aceCount + 1);
      } else if (cardArray[i].cardName === "A" && aceCount !== 0) {
        totalScore += cardArray[i].cardValue[1];
      } else {
        totalScore += cardArray[i].cardValue;
        console.log("Score", totalScore);
      }
    }
    return totalScore;
  };

  // onClick function on Start game Button
  const startGame = () => {
    console.log("Starting game...");
    // console.log(shuffleDeck);
    setDealerCards(() => [...shuffleDeck.splice(0, 1)]);
    // setDealerCards(dealCard(dealerCards));
    setPlayerCards(() => [...shuffleDeck.splice(0, 2)]);
    setMessage("");
    setDealerTurn(false);
    setDisableHit(false);
    setDisableHold(false);
    setIsPlayerBusted(false);
  };
  // function for dealing card
  const dealCard = (cardArray) => {
    return [...cardArray, ...shuffleDeck.splice(0, 1)];
  };

  // onClick function for Hold Button
  const hold = () => {
    console.log("Holding...");
    setDealerTurn(true);
    setDisableHit(true);
  };
  // onClick fucntion for HIT
  const hit = () => {
    console.log("Hitting...");
    setPlayerCards(dealCard(playerCards));
  };

  return (
    <div className="App">
      <h1>BlackJack</h1>
      <div className="container">
        <div className="dealer-cards">
          <div>
            <h3>Dealer's Hand</h3>
          </div>

          <Score currentScore={dealerScore} />
          {/* className="scoreHidden" */}
          <div className="cards-container">
            {dealerCards.map((index, cardValue) => (
              <Card key={cardValue} cardImage={index.cardImage} />
            ))}
          </div>
        </div>
        <div>
          <h1 className="neonText">{message}</h1>
        </div>
        <div className="player-cards">
          <h3>Your Hand</h3>
          <Score currentScore={playerScore} />
          <div className="cards-container">
            {playerCards.map((index, cardValue) => (
              <Card key={cardValue} cardImage={index.cardImage} />
            ))}
          </div>
        </div>
      </div>

      <div className="buttonsInterface">
        <button onClick={startGame}>Start</button>
        <button onClick={hold} disabled={disableHold}>
          Hold
        </button>
        <button onClick={hit} disabled={disableHit}>
          Hit
        </button>
      </div>
    </div>
  );
}

export default App;
