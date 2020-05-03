import React from "react";

function StartOverButton(props) {
  return (
    <div>
      <button className="startOverButton" onClick={props.onClick}>
        Start over
      </button>
    </div>
  );
}

export default StartOverButton;
