import { useEffect, useState } from "react";
import deck from "./Deck.json";
export function useDeck() {
  const [randomCard, setRandomCard] = useState([]);

  useEffect(() => {
    if (randomCard) {
      shuffle();
    }
    console.log(randomCard);
  }, []);
  const shuffle = () => {
    for (let i = 0; i < 52; i++) {
      const index = Math.floor(Math.random() * deck.cards.length);
      const tempDeck = deck.cards.splice(index, 1);
      setRandomCard((prev) => [...prev, ...tempDeck]);
    }
  };

  return [randomCard, setRandomCard];
}

// using fetch to import deck.json not working as expected
// const getDeck = () => {
//   fetch("./Deck.json", {
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//     },
//   })
//     .then(function (response) {
//       console.log(response.data);
//       return response.json();
//     })
//     .then(function (myJson) {
//       console.log(JSON.parse(myJson));
//       setNewDeck(JSON.parse(myJson));
//     });
// };
// useEffect(() => {
//   getDeck();
// }, []);
