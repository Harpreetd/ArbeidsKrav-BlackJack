import React from "react";

const Card = (props) => {
  // const { currentCard } = props;
  console.log(props.cardImage);
  // console.log(currentCard.cardImage);
  // let imgSrc = currentCard.cardImage;
  return (
    <div>
      {/* <h4> {currentCard.cardName + "-" + currentCard.cardFace}</h4> */}
      {/* <img src={require(`${imgSrc}`)} /> */}
      <img src={props.cardImage} />

      {/* <img src={require("../images/10-Diamonds.png")} className="cardImage" /> */}
      {/* wokring only for a particular image */}
    </div>
  );
};

export default Card;
