import React from "react";
//import ReactDOM from "react-dom";
import "./styles.css";
import vocabMix from "./vocabMix";
import AppHeader from "./components/AppHeader";
import Tally from "./components/Tally";
import AnswerMessages from "./components/AnswerMessages";
//Question is complicated. Try again later.
//import Question from "./components/Question";
import ListButtons from "./components/ListButtons";
import PracticeButton from "./components/PracticeButton";
import StartGameButton from "./components/StartGameButton";
import StartOverButton from "./components/StartOverButton";
//import ChooseNewListButton from "./components/ChooseNewListButton";
//delete this component. buttons are now in this page
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
      //level: 1,
      list: vocabMix,
      currentList: [],
      listChosen: false,
      category: "",
      answer: "",
      userAnswerSaved: "",
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
      uiScreen: "levelSelect"
    }));
  };

  //listChosen determines if part of UI is shown
  getList = () => {
    this.setState(state => ({
      listChosen: true
    }));
  };

  //called when user selects button for list
  handleClick = whichList => () => {
    //list defines level (currently only works for vocabMix list)
    //level 0 is all words in vocabMix
    if (whichList === 0) {
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

  //called when user clicks practice button
  handlePracticeClick = () => () => {
    //practiceList is array of words user got wrong
    this.setState(state => ({
      currentList: this.state.userPractice,
      listChosen: true,
      practicing: true
    }));
    this.startGame();
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
    this.setState({
      answer: event.target.value,
      userAnswerSaved: event.target.value
    });
  };

  renderStartUI() {
    return (
      <div>
        <ListButtons onClick={this.getCategory} />
        {this.state.userPractice.length > 0 && (
          <PracticeButton
            onHandleClick={this.handlePracticeClick()}
            userPr={this.state.userPractice}
          />
        )}
      </div>
    );
  }

  renderLevelUI() {
    return (
      <div>
        {this.renderLevelButtons()}
        {/* {this.state.listChosen ? (
          <StartGameButton onClick={() => this.startGame()} />
        ) : null} */}
        <StartOverButton onClick={this.resetGame} />
        {this.state.listChosen ? (
          <StartGameButton onClick={() => this.startGame()} />
        ) : null}
      </div>
    );
  }

  renderGameUI() {
    return (
      <div className="questionDiv">
        <p>
          Question: {this.state.questionNumber + 1}
          {" of "}
          {this.state.currentList.length}
        </p>

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

        <div>
          <AnswerMessages
            msg1={this.state.answerMessage}
            msg2={this.state.answerMessage2}
            msg3={this.state.userAnswerSaved}
          />

          <Tally
            right={this.state.numberRight}
            wrong={this.state.numberWrong}
          />
        </div>
      </div>
    );
  }

  renderGameOverUI() {
    return (
      <div>
        <h2>Game Over</h2>

        <AnswerMessages
          msg1={this.state.answerMessage}
          msg2={this.state.answerMessage2}
          msg3={this.state.userAnswerSaved}
        />

        <Tally right={this.state.numberRight} wrong={this.state.numberWrong} />
        <StartOverButton onClick={this.resetGame} />
      </div>
    );
  }

  //renders the buttons for the chosen list
  //currently the only list option is vocab list
  renderLevelButtons() {
    return (
      <div>
        <h3>Vocab Mix - choose a level</h3>
        <h3>{this.state.currentList.length} words</h3>
        <button onClick={this.handleClick(1)}>Level 1</button>
        <button onClick={this.handleClick(2)}>Level 2</button>
        <button onClick={this.handleClick(3)}>Level 3</button>
        <button onClick={this.handleClick(4)}>Level 4</button>
        <button onClick={this.handleClick(5)}>Level 5</button>
        <button onClick={this.handleClick(6)}>Level 6</button>
        <button onClick={this.handleClick(7)}>Level 7</button>
        <button onClick={this.handleClick(8)}>All</button>
      </div>
    );
  }

  //this is called when user submits their answer
  //for practicing missed words handleSubmitPractice is called instead
  handleSubmit = event => {
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
      }));
      //if the user answer is incorrect, add the word to the
      //userPractice array if it isn't there already
      if (!this.state.userPractice.includes(lst[qn])) {
        this.setState(prevState => ({
          userPractice: [...prevState.userPractice, lst[qn]]
        }));
      }
    }

    //test if the game is over
    if (qn === this.state.currentList.length - 1) {
      this.setState(prevState => ({
        gameOver: true,
        questionNumber: 0,
        uiScreen: "gameOver"
      }));
    } else {
      this.setState(prevState => ({
        questionNumber: prevState.questionNumber + 1
      }));
    }

    event.preventDefault();
  };

  //this is called when user submits answer in practice
  //submitting on the practice test is a bit different
  //words are removed from the array if answered correctly
  //words stay in the array if answered incorrectly
  handleSubmitPractice = event => {
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
        <AppHeader />
        <div className="notHeader">
          {this.state.uiScreen === "start" && this.renderStartUI()}
          {this.state.uiScreen === "levelSelect" && this.renderLevelUI()}
          {this.state.uiScreen === "game" && this.renderGameUI()}
          {this.state.uiScreen === "gameOver" && this.renderGameOverUI()}
        </div>
      </div>
    );
  }
}

export default App;
