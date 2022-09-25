import React from "react";

const Score = (props) => {
  const { currentScore } = props;
  console.log(`Score component: ${currentScore}`);
  return <div> Score {currentScore}</div>;
};

export default Score;
