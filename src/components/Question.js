import React from "react";

function Question(props) {
  return (
    <div className="questionDiv">
      <p>
        Question: {props.qn + 1}
        {" of "}
        {props.currlist.length}
      </p>
      <p>Length of current game list: {this.state.currentList.length}</p>
      <p>Length of userPractice list: {this.state.userPractice.length}</p>
      <form
        onSubmit={
          this.state.practicing ? this.handleSubmitPractice2 : this.handleSubmit
        }
      >
        <label>
          {this.state.currentList[this.state.questionNumber].eng}
          <input
            type="text"
            autoCorrect="false"
            autoCapitalize="none"
            autoComplete="false"
            keyboardtype="visible-password"
            value={this.state.answer}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Question;
