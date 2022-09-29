import "./App.css";

import { useDeck } from "./useDeck.js";
import { useState, useEffect } from "react";
import Card from "../src/components/Card.jsx";
import Score from "../src/components/Score.jsx";

function App() {
  // getting a shuffled deck

  const [shuffleDeck, setShuffleDeck] = useDeck([]);
  console.log(shuffleDeck.length);
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
  const [highScores, setHighScores] = useState([]);

  useEffect(() => {
    if (playerCards.length > 2) {
      setShuffleDeck((prev) => [...prev, ...shuffleDeck]);
    }
  }, [playerCards]);

  useEffect(() => {
    if (didPlayerWon) {
      console.log(highScores);
      localStorage.setItem("score", JSON.stringify(highScores));
    }
  }, [didPlayerWon, playerScore]);

  useEffect(() => {
    const highscore = JSON.parse(localStorage.getItem("score"));
    if (highscore) {
      setHighScores(highscore);
    }
  }, []);

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
        } else if (
          dealerTurn &&
          dealerScore < playerScore &&
          playerScore <= 21
        ) {
          setMessage("You Win!");
          setHighScores((prev) => [...prev, playerScore]);

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

  useEffect(() => {
    if (isPlayerBusted === true) {
      setMessage("You Busted!  Start again");
    }
  }, [isPlayerBusted]);

  // updating isPlayerBusted
  useEffect(() => {
    if (playerScore > 21) {
      setIsPlayerBusted(true);
      setDealerTurn(false);
      setDisableHit(true);
      setDisableHold(true);
    } else if (playerScore === 21 && !dealerTurn) {
      setMessage("Black Jack  ");
      // setDidPlayerWon(true);
      setDealerTurn(true);
      setDisableHit(true);
      setDisableHold(true);
    }
  }, [playerScore]);

  // function for calculating the score

  const getScore = (cardArray) => {
    let totalScore = 0;

    for (let i = 0; i < cardArray.length; i++) {
      totalScore += cardArray[i].cardValue;
    }
    cardArray.forEach((card) => {
      if (card.cardName === "A") {
        if (aceCount === 0 && totalScore > 21) {
          totalScore -= 10;
        } else if (aceCount !== 0 && totalScore < 21) {
          return totalScore;
        }

        return totalScore;
      }
    });
    return totalScore;
  };

  // onClick function on Start game Button
  const startGame = () => {
    setDealerCards(() => [...shuffleDeck.splice(0, 1)]);
    setPlayerCards(() => [...shuffleDeck.splice(0, 2)]);
    // setShuffleDeck((shuffleDeck) => [...shuffleDeck, shuffleDeck]);
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
  // function refreshPage() {
  //   window.App.reload(false);
  // }

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
        <div>
          <h4>Your Highscore</h4>
          {highScores.map((score) => {
            return <li>{score}</li>;
          })}
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
        {/* <button onClick={refreshPage}>Refresh</button> */}
      </div>
    </div>
  );
}

export default App;
