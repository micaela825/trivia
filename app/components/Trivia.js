import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchTrivia } from "../reducers/index";

class Trivia extends Component {
  constructor() {
    super();
    this.state = {
      answer: "",
      showAnswer: false,
      displayMessage: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleShowAnswer = this.handleShowAnswer.bind(this);
    this.refreshPage = this.refeshPage.bind(this);
  }

  handleChange(event) {
    this.setState({
      answer: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    let displayMessage;
    // ADD MORE REFINED ALLOWANCES FOR RIGHT ANSWERS - ie .includes, startswith, etc.
    if (this.props.trivia[0] && this.props.trivia[0].answer) {
      if (
        this.props.trivia[0].answer.toLowerCase() ===
        this.state.answer.toLowerCase()
      ) {
        displayMessage = "got it right!";
      } else {
        displayMessage = "oops wrong answer";
      }
    }
    this.setState({
      answer: event.target.value,
      displayMessage: displayMessage
    });
  }

  handleShowAnswer() {
    this.setState({
      showAnswer: true,
      displayMessage: "blank"
    });
  }

  componentDidMount() {
    this.props.fetchTrivia();
  }

  refeshPage() {
    window.location.reload();
  }

  render() {
    return (
      <div>
        {this.state.displayMessage ? (
          this.state.showAnswer && this.props.trivia[0] ? (
            this.props.trivia[0].answer ? (
              <div>
                <div>{this.props.trivia[0].answer}</div>

                <button type="button" onClick={this.refreshPage}>
                  Next question
                </button>
              </div>
            ) : null
          ) : (
            <div>
              <div>{this.state.displayMessage}</div>
              <button type="button" onClick={this.refreshPage}>
                Next question
              </button>
            </div>
          )
        ) : (
          <div>
            <div>Question:</div>
            <div>
              <br />
              {this.props.trivia[0] ? (
                <div>{this.props.trivia[0].question}</div>
              ) : null}
            </div>

            <form onSubmit={this.handleSubmit}>
              <label htmlFor="search">Answer:</label>
              <input ref="answerName" onChange={this.handleChange} />
              <button type="submit">Guess!</button>
            </form>
            <button onClick={this.handleShowAnswer}>Show answer</button>
          </div>
        )}
      </div>
    );
  }
}

const mapState = state => {
  return {
    trivia: state.trivia
  };
};

const mapDispatch = dispatch => {
  return {
    fetchTrivia: () => dispatch(fetchTrivia())
  };
};

export default connect(
  mapState,
  mapDispatch
)(Trivia);
