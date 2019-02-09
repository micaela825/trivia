import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchQuote, fetchAdvice } from "../reducers/index";

class Home extends Component {
  componentDidMount() {
    this.props.fetchQuote();
    this.props.fetchAdvice();
  }
  render() {
    return (
      <div>
        {this.props.advice.slip ? (
          <div>
            <p>"{this.props.advice.slip.advice}"</p>
            <p>-Fortune Cookie</p>
          </div>
        ) : null}
        <p>"{this.props.michael[0]}"</p>
        <p>-Ron Swanson</p>
      </div>
    );
  }
}

const mapState = state => {
  return {
    michael: state.michael,
    advice: state.advice
  };
};

const mapDispatch = dispatch => {
  return {
    fetchQuote: () => dispatch(fetchQuote()),
    fetchAdvice: () => dispatch(fetchAdvice())
  };
};

export default connect(
  mapState,
  mapDispatch
)(Home);
