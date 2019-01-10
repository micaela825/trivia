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
    let detailsLink = this.makeIsbnLink(this.props.match.params.isbn);
    this.props.fetchBookDetails(detailsLink);
  }

  render() {
    let isbn = this.props.match.params.isbn;
    let coverlink = this.makeCoverLink(isbn);
    if (this.props.bookDetails.length) {
      console.log("props in single book render", this.props);
      let title = this.props.bookDetails.details.title;
      let subject = this.props.bookDetails.details.subjects[0];
      let pages = this.props.bookDetails.details.number_of_pages;
      let author = this.props.bookDetails.details.authors[0].name;
      let thumbnail = this.props.bookDetails.thumbnail_url;
    }

    return (
      <div>
        {this.props.bookDetails ? (
          <div>
            <div>title: {this.title}</div>
            <div>subject: {this.subject}</div>
            <div>pages: {this.pages}</div>
            <div>author: {this.author}</div>
            <img src={this.thumbnail} />
            <img src={this.coverlink} />
          </div>
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
