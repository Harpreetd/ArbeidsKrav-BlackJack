import React from "react";

const Score = (props) => {
  const { currentScore } = props;
  return <div>Player Score {currentScore}</div>;
};

export default Score;
