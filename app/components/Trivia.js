import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchTrivia } from "../reducers/index";

class Trivia extends Component {
  constructor() {
    super();
    this.state = {
      answer: "",
      correct: "",
      showAnswer: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleShowAnswer = this.handleShowAnswer.bind(this);
  }

  handleChange(event) {
    this.setState({
      answer: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      answer: event.target.value
    });
  }
  handleShowAnswer() {
    console.log("props ****", this.props);
    let correct;
    if (this.props.trivia[0]) {
      if (this.props.trivia[0].answer) {
        correct = this.props.trivia[0].answer;
      }
    }
    this.setState({
      correct: correct,
      showAnswer: true
    });
  }

  componentDidMount() {
    this.props.fetchTrivia();
  }

  render() {
    return (
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
        {this.state.showAnswer ? (
          this.state.answer ? (
            <p>this.state.answer</p>
          ) : null
        ) : null}
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
