import React from "react";

const Card = (props) => {
  const { currentCard } = props;
  console.log(currentCard);

  return (
    <div>
      <h1> {currentCard[0].cardName + "-" + currentCard[0].cardFace}</h1>
    </div>
  );
};

export default Card;

// {
//   studentsList.map((student, index) => (
//     <Student
//       key={index}
//       currentStudent={student}
//       clickableBtn={() => setChosenStudent(student)}
//     />
//   ));
// }
