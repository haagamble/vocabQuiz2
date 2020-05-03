import React from "react";

function PracticeButton(props) {
  return (
    <div>
      <p>
        Practice the words that you have answered incorrectly during this
        session by clicking the Try Again button.
      </p>
      <button onClick={props.onClick("practice")}>Try Again</button>
    </div>
  );
}

export default PracticeButton;
