import "./App.css";
import { useDeck } from "./useDeck.js";
import { useState, useEffect } from "react";
import Card from "../src/components/Card.jsx";
import Score from "../src/components/Score.jsx";
function App() {
  // getting a shuffled deck
  const [shuffleDeck, setShuffleDeck] = useDeck();

  const [dealerCards, setDealerCards] = useState([]);

  const [playerCards, setPlayerCards] = useState([]);

  const [playerScore, setPlayerScore] = useState(0);

  const [dealerScore, setDealerScore] = useState(0);

  const [dealerTurn, setDealerTurn] = useState(false);

  const [aceCount, setAceCount] = useState(0);
  const [isPlayerBusted, setIsPlayerBusted] = useState(false);
  const [didPlayerWon, setDidPlayerWon] = useState(false);
  const [message, setMessage] = useState("");

  // state for disabling buttons
  const [disableHit, setDisableHit] = useState(true);
  const [disableHold, setDisableHold] = useState(true);
  const [highScore, setHighScore] = useState([]);
  // const [items, setItems] = useState([]);
  useEffect(() => {
    // console.log(highScore);
    if (didPlayerWon) {
      console.log(highScore);
      localStorage.setItem("score", JSON.stringify(highScore));
    }
  }, [didPlayerWon, playerScore]);

  // useEffect(() => {
  //   setAceCount(0);
  // }, []);

  // updating player score
  useEffect(() => {
    playerCards.map((card, i) => {
      return card.cardValue;
    });
    setPlayerScore(getScore(playerCards));
  }, [playerCards]);

  // updating Dealer's score
  useEffect(() => {
    dealerCards.map((card, i) => {
      return card.cardValue;
    });

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
          setHighScore((prev) => [...prev, playerScore]);

          setDidPlayerWon(true);
        }
        if (dealerScore === playerScore) {
          setMessage("It's a Tie!!!");
        }
      } else if (dealerScore > 21 && playerScore <= 21) {
        setMessage("Dealer Busted : You Win!!!");
        setDidPlayerWon(true);
      } else if (dealerScore === 21) {
        setMessage("Black Jack : DealerWins");
        setDidPlayerWon(false);
      }
    }
  }, [dealerTurn, dealerScore, playerScore]);

  //useEffect for dealer and player card to 0 if player or  dealer busted
  useEffect(() => {
    if (isPlayerBusted === true) {
      setMessage("You Busted!  Start again");
    }
  }, [isPlayerBusted]);
  // updating isPlayerBusted
  useEffect(() => {
    if (playerScore > 21) {
      setIsPlayerBusted(true);
      // setDealerTurn(false);
      setDisableHit(true);
      setDisableHold(true);
    } else if (playerScore === 21 && dealerScore > 21) {
      setMessage("Black Jack : You Win! ");
      setDidPlayerWon(true);
      setDealerTurn(true);
      setDisableHit(true);
      setDisableHold(true);
    }
  }, [playerScore]);

  // function for calculating the score

  const getScore = (cardArray) => {
    let totalScore = 0;

    for (let i = 0; i < cardArray.length; i++) {
      if (cardArray[i].cardName === "A" && aceCount === 0) {
        totalScore += cardArray[i].cardValue[0];
        setAceCount(aceCount + 1);
      } else if (cardArray[i].cardName === "A" && aceCount !== 0) {
        totalScore += cardArray[i].cardValue[1];
      } else {
        totalScore += cardArray[i].cardValue;
      }
    }
    return totalScore;
  };

  // onClick function on Start game Button
  const startGame = () => {
    setDealerCards(() => [...shuffleDeck.splice(0, 1)]);
    setPlayerCards(() => [...shuffleDeck.splice(0, 2)]);
    setMessage("");
    setDealerTurn(false);
    setDisableHit(false);
    setDisableHold(false);
    setIsPlayerBusted(false);
    setAceCount(0);
  };
  // function for dealing card
  const dealCard = (cardArray) => {
    return [...cardArray, ...shuffleDeck.splice(0, 1)];
  };

  // onClick function for Hold Button
  const hold = () => {
    setDealerTurn(true);
    setDisableHit(true);
  };
  // onClick fucntion for HIT
  const hit = () => {
    setPlayerCards(dealCard(playerCards));
    setDisableHold(false);
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
          <p>{highScore}</p>
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
