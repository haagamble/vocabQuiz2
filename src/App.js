import React from "react";
//import ReactDOM from "react-dom";
import "./styles.css";
import vocabMix from "./vocabMix";
import Tally from "./components/Tally";
import AnswerMessages from "./components/AnswerMessages";
//Question is complicated. Try again later.
//import Question from "./components/Question";
import ListButtons from "./components/ListButtons";
//can't figure out PracticeButton either. how to pass in parameter
//import PracticeButton from "./components/PracticeButton";
import StartGameButton from "./components/StartGameButton";
import StartOverButton from "./components/StartOverButton";
import ChooseNewListButton from "./components/ChooseNewListButton";
//VocabMixButtons doesn't work yet
//import VocabMixButtons from "./components/VocabMixButtons";

//vocabMix is the only list at the moment
class App extends React.Component {
  constructor() {
    super();
    //practicing determines whether
    //handleSubmit or handleSubmitPractice is called,
    //userPractice is for words the user answered incorrectly
    //vocabMix is default. Other lists will be added later
    this.state = {
      numberRight: 0,
      numberWrong: 0,
      level: 1,
      list: vocabMix,
      currentList: [],
      listChosen: false,
      category: "",
      answer: "",
      questionNumber: 0,
      gameStarted: false,
      gameOver: false,
      answerMessage: "",
      answerMessage2: "",
      uiScreen: "start",
      userPractice: [],
      practicing: false
    };
  }

  //so far vocabMix is the only category
  //this will be coded later when other lists are added
  getCategory = () => {
    this.setState(state => ({
      category: "vocabMix",
      uiScreen: "vocabMixButtons"
    }));
  };

  //listChosen determines if part of UI is shown
  getList = () => {
    this.setState(state => ({
      listChosen: true
    }));
  };

  //called when user selects button for list
  handleClick = whichList => {
    //list defines level (currently only works for vocabMix list)
    console.log(whichList);
    //practiceList is array of words user got wrong
    if (whichList === "practice") {
      this.setState(state => ({
        currentList: this.state.userPractice,
        listChosen: true,
        practicing: true
      }));
      this.startGame();
    }
    //level 0 is all words in vocabMix
    else if (whichList === 0) {
      this.setState(state => ({
        currentList: vocabMix,
        listChosen: true,
        practicing: false
      }));
    } else {
      //filter out the words for the chosen level
      const filteredList = this.state.list.filter(
        item => item.level === whichList
      );
      this.setState(state => ({
        currentList: filteredList,
        listChosen: true,
        practicing: false
      }));
    }
  };

  startGame = () => {
    this.setState(state => ({
      gameStarted: true,
      uiScreen: "game"
    }));
  };

  resetGame = () => {
    this.setState(state => ({
      listChosen: false,
      gameOver: false,
      numberRight: 0,
      numberWrong: 0,
      answerMessage: "",
      answerMessage2: "",
      uiScreen: "start",
      gameStarted: false,
      category: "",
      questionNumber: 0
    }));
  };

  //this updates the input field as user types
  handleChange = event => {
    this.setState({ answer: event.target.value });
    //console.log(this.state.answer);
  };

  //this is called when user submits their answer
  //for practicing missed words handleSubmitPractice is called instead
  handleSubmit = event => {
    console.log("in handleSubmit");
    let qn = this.state.questionNumber;
    let lst = this.state.currentList;
    //message given to user showing all correct answers
    let msg = `${lst[qn].eng}: ${lst[qn].taj.join(" or ")}`;
    //is the user answer in the correct answer array
    if (lst[qn].taj.includes(this.state.answer)) {
      this.setState(prevState => ({
        numberRight: prevState.numberRight + 1,
        answerMessage: "Correct",
        answerMessage2: msg,
        answer: ""
      }));
    } else {
      this.setState(prevState => ({
        numberWrong: prevState.numberWrong + 1,
        answerMessage: "Incorrect",
        answerMessage2: msg,
        answer: ""
        //if the user answer is incorrect, add the word to the
        //userPractice array
        //userPractice: [...prevState.userPractice, lst[qn]]
      }));
      if (!this.state.userPractice.includes(lst[qn])) {
        this.setState(prevState => ({
          userPractice: [...prevState.userPractice, lst[qn]]
        }));
      }
    }

    //test if the game is over
    if (qn === this.state.currentList.length - 1) {
      console.log("game over");
      this.setState(prevState => ({
        gameOver: true,
        questionNumber: 0
      }));
    } else {
      this.setState(prevState => ({
        questionNumber: prevState.questionNumber + 1
      }));
    }

    event.preventDefault();
  };
  xx;
  //this is called when user submits answer in practice
  //submitting on the practice test is a bit different
  //words are removed from the array if answered correctly
  //words stay in the array if answered incorrectly
  //callState is called twice
  //function not working. see also handleSubmitPractice2
  handleSubmitPractice = event => {
    console.log("in handleSubmitPractice2");
    let qn = this.state.questionNumber;
    let lst = this.state.currentList;
    //message given to user showing all correct answers
    let msg = `${lst[qn].eng}: ${lst[qn].taj.join(" or ")}`;
    //if answer is correct
    if (lst[this.state.questionNumber].taj.includes(this.state.answer)) {
      //test if quiz is finished
      if (qn === this.state.currentList.length - 1) {
        this.setState(prevState => ({
          gameOver: true,
          questionNumber: 0,
          //userPractice: prevState.userPractice.splice(qn, 1),
          //userPractice: [...prevState.userPractice.splice(qn, 1)],
          userPractice: prevState.userPractice.filter(
            (__, index) => index !== qn
          ),
          numberRight: prevState.numberRight + 1,
          answerMessage: "Correct",
          answerMessage2: msg,
          answer: ""
        }));
      } else {
        this.setState(prevState => ({
          questionNumber: prevState.questionNumber + 1,
          //userPractice: [...prevState.userPractice.splice(qn, 1)],
          //userPractice: prevState.userPractice.splice(qn, 1),
          userPractice: prevState.userPractice.filter(
            (__, index) => index !== qn
          ),
          numberRight: prevState.numberRight + 1,
          answerMessage: "Correct",
          answerMessage2: msg,
          answer: ""
        }));
      }
      //if answer is incorrect
    } else {
      //test if quiz is finished
      if (qn === this.state.currentList.length - 1) {
        this.setState(prevState => ({
          gameOver: true,
          questionNumber: 0,
          numberWrong: prevState.numberWrong + 1,
          answerMessage: "Incorrect",
          answerMessage2: msg,
          answer: ""
        }));
      } else {
        this.setState(prevState => ({
          questionNumber: prevState.questionNumber + 1,
          numberWrong: prevState.numberWrong + 1,
          answerMessage: "Incorrect",
          answerMessage2: msg,
          answer: ""
        }));
      }
    }
    console.log("user practice");
    console.log(this.state.userPractice);

    event.preventDefault();
  };

  render() {
    return (
      <div className="pageStyle">
        <h1>Vocab Practice (VocabQuiz2)</h1>
        {this.state.uiScreen === "start" ? (
          <div>
            <ListButtons onClick={this.getCategory} />
            {this.state.userPractice.length > 0 ? (
              <div>
                <p>
                  Practice the words that you have answered incorrectly during
                  this session by clicking the Practice button below. Your
                  practice list currently has {this.state.userPractice.length}{" "}
                  {this.state.userPractice.length === 1
                    ? "question"
                    : "questions"}
                  .
                </p>
                <button onClick={() => this.handleClick("practice")}>
                  Practice
                </button>
              </div>
            ) : null}
          </div>
        ) : null}

        {this.state.uiScreen === "vocabMixButtons" ? (
          <div>
            <h3>Vocab Mix - choose a level</h3>
            <h3>{this.state.currentList.length} words</h3>
            <div>
              <button onClick={() => this.handleClick(1)}>Level 1</button>
              <button onClick={() => this.handleClick(2)}>Level 2</button>
              <button onClick={() => this.handleClick(3)}>Level 3</button>
              <button onClick={() => this.handleClick(4)}>Level 4</button>
              <button onClick={() => this.handleClick(5)}>Level 5</button>
              <button onClick={() => this.handleClick(6)}>Level 6</button>
              <button onClick={() => this.handleClick(7)}>Level 7</button>
              <button onClick={() => this.handleClick(0)}>All</button>
            </div>

            {this.state.listChosen ? (
              <StartGameButton onClick={() => this.startGame()} />
            ) : null}
          </div>
        ) : null}

        {this.state.uiScreen === "game" && !this.state.gameOver ? (
          <div className="questionDiv">
            <p>
              Question: {this.state.questionNumber + 1}
              {" of "}
              {this.state.currentList.length}
            </p>
            <p>Length of current list: {this.state.currentList.length}</p>
            <p>Length of practice list: {this.state.userPractice.length}</p>
            <form
              onSubmit={
                this.state.practicing
                  ? this.handleSubmitPractice
                  : this.handleSubmit
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
        ) : null}

        {this.state.uiScreen === "game" ? (
          <div>
            <AnswerMessages
              msg1={this.state.answerMessage}
              msg2={this.state.answerMessage2}
            />

            <Tally
              right={this.state.numberRight}
              wrong={this.state.numberWrong}
            />
          </div>
        ) : null}

        {this.state.uiScreen !== "start" && !this.state.gameOver ? (
          <StartOverButton onClick={this.resetGame} />
        ) : null}

        {this.state.gameOver ? (
          <ChooseNewListButton onClick={this.resetGame} />
        ) : null}
      </div>
    );
  }
}

export default App;
