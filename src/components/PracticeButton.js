import React from "react";

function PracticeButton(props) {
  return (
    <div>
      <p>
        Practice the words that you have answered incorrectly during this
        session by clicking the Practice button below. Your practice list
        currently has {props.userPr.length}{" "}
        {props.userPr.length === 1 ? "question" : "questions"}.
      </p>
      <button onClick={props.onHandleClick}>Practice</button>
    </div>
  );
}

export default PracticeButton;
