import React from "react";

function VocabMixButtons(props) {
  return (
    <div>
      <p>Vocab Mix Buttons go here</p>
      <button onClick={() => props.onClick(1)}>Level 1</button>
      <button onClick={() => this.handleClick(2)}>Level 2</button>
      <button onClick={() => this.handleClick(3)}>Level 3</button>
      <button onClick={() => this.handleClick(4)}>Level 4</button>
      <button onClick={() => this.handleClick(5)}>Level 5</button>
      <button onClick={() => this.handleClick(6)}>Level 6</button>
      <button onClick={() => this.handleClick(7)}>Level 7</button>
      <button onClick={() => this.handleClick(0)}>All</button>
    </div>
  );
}

export default VocabMixButtons;
