import React from "react";

function StartGameButton(props) {
  return (
    <div>
      <button className="startButton" onClick={props.onClick}>
        Start
      </button>
    </div>
  );
}

export default StartGameButton;
