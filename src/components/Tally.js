import React from "react";

function Tally(props) {
  return (
    <div>
      <h3 className="rightTally">{`Right: ${props.right}`}</h3>
      <h3 className="wrongTally">{`Wrong: ${props.wrong}`}</h3>
    </div>
  );
}

export default Tally;
