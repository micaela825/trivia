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
    let isbnProp = "ISBN:" + isbn;

    return (
      <div>
        <div>
          {this.props.bookDetails[isbnProp] ? (
            this.props.bookDetails[isbnProp].details.title ? (
              <div className="returnResults">
                Title: {this.props.bookDetails[isbnProp].details.title}
              </div>
            ) : null
          ) : null}

          <div>
            <img src={this.makeCoverLink(isbn)} />
          </div>
          {this.props.bookDetails[isbnProp] ? (
            this.props.bookDetails[isbnProp].details.description ? (
              <div className="returnResults">
                Description:{" "}
                {this.props.bookDetails[isbnProp].details.description}
              </div>
            ) : (
              <div>No description available.</div>
            )
          ) : null}
          {this.props.bookDetails[isbnProp] ? (
            this.props.bookDetails[isbnProp].details.authors ? (
              <div className="returnResults">
                Author:{" "}
                {this.props.bookDetails[isbnProp].details.authors[0].name}
              </div>
            ) : null
          ) : null}
        </div>
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
