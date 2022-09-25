import { useEffect, useState } from "react";
import deck from "./Deck.json";
export function useDeck() {
  const [randomCard, setRandomCard] = useState([]);

  useEffect(() => {
    if (randomCard) {
      shuffle();
    }
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
