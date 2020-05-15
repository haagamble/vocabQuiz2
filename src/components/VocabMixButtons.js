import React from "react";

function VocabMixButtons(props) {
  return (
    <div>
      <p>Vocab Mix Buttons go here</p>
      <button onClick={props.onHandleClick1}>Level 1</button>
      <button onClick={props.onHandleClick2}>Level 2</button>
      <button onClick={props.onHandleClick3}>Level 3</button>
      <button onClick={props.onHandleClick4}>Level 4</button>
      <button onClick={props.onHandleClick5}>Level 5</button>
      <button onClick={props.onHandleClick6}>Level 6</button>
      <button onClick={props.onHandleClick7}>Level 7</button>
      <button onClick={props.onHandleClick8}>All</button>
    </div>
  );
}

export default VocabMixButtons;
