import "./App.css";

import { useDeck } from "./useDeck.js";
import { useState, useEffect } from "react";
import Card from "../src/components/Card.jsx";
import Score from "../src/components/Score.jsx";

function App() {
  const [shuffleDeck, setShuffleDeck] = useDeck([]);

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

  // HighScore
  const [highScores, setHighScores] = useState([]);

  useEffect(() => {
    if (playerCards.length > 2) {
      setShuffleDeck((prev) => [...prev, ...shuffleDeck]);
    }
  }, [playerCards]);

  //  saving Highscore of the player in LocalStorage
  useEffect(() => {
    if (didPlayerWon) {
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

  //  player busted
  useEffect(() => {
    if (isPlayerBusted === true) {
      setMessage("You Busted!  Start again");
    }
  }, [isPlayerBusted]);

  // player gets > 21
  useEffect(() => {
    if (playerScore > 21) {
      setIsPlayerBusted(true);
      setDealerTurn(false);
      setDisableHit(true);
      setDisableHold(true);
    } else if (playerScore === 21 && !dealerTurn) {
      setMessage("Black Jack  ");
      setDealerTurn(true);
      setDisableHit(true);
      setDisableHold(true);
    }
  }, [playerScore]);

  // calculating the score

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

  // onClick on Start Button
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
  // Dealing one card
  const dealCard = (cardArray) => {
    return [...cardArray, ...shuffleDeck.splice(0, 1)];
  };

  // onClick for Hold Button
  const hold = () => {
    setDealerTurn(true);
    setDisableHit(true);
  };
  // onClick for HIT
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
          {highScores.map((score, i) => {
            return <li key={i}>{score}</li>;
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
      </div>
    </div>
  );
}

export default App;
