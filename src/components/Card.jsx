import React from "react";

const Card = (props) => {
  return (
    <div>
      <img src={props.cardImage} className="cardImage" alt="card" />
    </div>
  );
};

export default Card;
