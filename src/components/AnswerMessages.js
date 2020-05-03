import React from "react";

function AnswerMessages(props) {
  return (
    <div>
      <div className="messageDiv">
        <h2
          className={props.msg1 === "Correct" ? "greenMessage" : "redMessage"}
        >
          {props.msg1}
        </h2>
        <h3>{props.msg2}</h3>
      </div>
    </div>
  );
}

export default AnswerMessages;
