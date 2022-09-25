import React from "react";

const Card = (props) => {
  const { currentCard } = props;
  console.log(currentCard);
  console.log(currentCard.cardImage);
  let imgSrc = currentCard.cardImage;
  return (
    <div>
      <h1> {currentCard.cardName + "-" + currentCard.cardFace}</h1>
      {/* <img src={require(`${imgSrc}`)} /> */}
      {/* <img src={imgSrc} /> */}

      {/* <img src={require("../images/10-Diamonds.png")} />  */}
      {/* wokring for a particular image */}
    </div>
  );
};

export default Card;
