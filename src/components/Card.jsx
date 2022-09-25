import React from "react";

const Card = (props) => {
  const { currentCard } = props;
  console.log(currentCard);

  return (
    <div>
      <h1> {currentCard.cardName + "-" + currentCard.cardFace}</h1>
      <img src={currentCard.cardImage} />
    </div>
  );
};

export default Card;
