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
    // this.speak = this.speak.bind(this);
  }

  handleChange(event) {
    console.log("state before handle change", this.state);
    this.setState({
      answer: event.target.value
    });
    console.log("state after handle change **", this.state);
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("state before handle submit", this.state);
    this.setState({
      answer: event.target.value
    });
    console.log("state after handle submit", this.state);
  }

  handleShowAnswer() {
    let correct = this.props.trivia[0].answer;
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
        <button onClick={this.handleShowAnswer()}>Show answer</button>
        {this.state.showAnswer ? <p>this.state.answer</p> : null}
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
