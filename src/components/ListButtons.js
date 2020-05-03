import React from "react";

function ListButtons(props) {
  return (
    <div>
      <h2>Select word list</h2>
      <p>
        Note: For testing you can choose level 6 where "test" is the correct
        answer for all questions. Vocab Mix is the only set of words so far, so
        choose that to begin.
      </p>
      <p>
        What I still need to fix. If user gets the same question incorrect (but
        not while doing the practice questions), the word is added to the list
        again. Need to check to make sure that the incorrect word is not already
        in the practiceArray before adding it.
      </p>
      <button onClick={props.onClick}>Vocab Mix</button>
      <button className="addLater">Vocab 1</button>
      <button className="addLater">Vocab 2</button>
    </div>
  );
}

export default ListButtons;
