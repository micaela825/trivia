import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchBookDetails } from "../reducers/index";

class SingleBook extends Component {
  constructor() {
    super();
    this.makeCoverLink = this.makeCoverLink.bind(this);
    this.makeIsbnLink = this.makeIsbnLink.bind(this);
  }

  makeCoverLink(isbn) {
    return `http://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`;
  }

  makeIsbnLink(isbn) {
    return `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&jscmd=details&format=json`;
  }

  componentDidMount() {
    let isbn = this.props.match.params.isbn;
    let detailsLink = this.makeIsbnLink(this.props.match.params.isbn);
    this.props.fetchBookDetails(detailsLink);
  }

  render() {
    let isbn = this.props.match.params.isbn;
    let coverlink = this.makeCoverLink(isbn);
    let isbnProp = "ISBN:" + isbn;
    if (this.props.bookDetails[isbnProp]) {
      console.log("prop details", this.props.bookDetails[isbnProp].details);
      let detailss = this.props.bookDetails[isbnProp].details;
    }

    return (
      <div>
        <img src={this.coverlink} />

        {this.props.bookDetails[isbnProp] ? (
          <div>title: {this.props.bookDetails[isbnProp].details.title}</div>
        ) : null}
      </div>
    );
  }
}

const mapState = state => {
  return {
    bookDetails: state.bookDetails
  };
};

const mapDispatch = dispatch => {
  return {
    fetchBookDetails: isbnLink => dispatch(fetchBookDetails(isbnLink))
  };
};

export default connect(
  mapState,
  mapDispatch
)(SingleBook);
