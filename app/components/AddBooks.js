import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchBooks } from "../reducers/index";

class AddBooks extends Component {
  constructor() {
    super();
    this.state = {
      link: "",
      filterTerm: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.linkify = this.linkify.bind(this);
  }

  linkify(term) {
    return (
      "http://openlibrary.org/search.json?title=" + term.split(" ").join("+")
    );
  }

  handleChange(event) {
    this.setState({
      link: event.target.value
    });
  }

  handleFilter(event) {
    this.setState({
      filterTerm: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    let searchTerm = this.linkify(this.state.link);
    this.props.fetchBooks(searchTerm);
    this.setState({
      link: event.target.value
    });
  }

  render() {
    let currentBooks = [];
    let filterTerm = this.state.filterTerm;

    if (this.props.books.docs && filterTerm == "ebook_count_i") {
      currentBooks = this.props.books.docs.filter(book => {
        return book[filterTerm] >= 1;
      });
    } else if (this.props.books.docs && filterTerm == "has_fulltext") {
      currentBooks = this.props.books.docs.filter(book => {
        return book[filterTerm] === true;
      });
    } else if (this.props.books.docs && filterTerm == "eng") {
      currentBooks = this.props.books.docs.filter(book => {
        if (book.language) {
          return book.language.includes("eng");
        }
      });
    } else {
      currentBooks = this.props.books.docs;
    }

    return (
      <div>
        <span>Filter:</span>
        <span>
          <select onChange={this.handleFilter}>
            <option>All</option>
            <option value="eng">English only</option>
            <option value="has_fulltext">Full text available</option>
            <option value="ebook_count_i">E-book available</option>
            ))}
          </select>
        </span>

        <form onSubmit={this.handleSubmit}>
          <label htmlFor="search">Search book by title:</label>
          <input
            type="text"
            name="title"
            //   value={this.state.books}
            onChange={this.handleChange}
          />
          <button type="submit">Search</button>
        </form>
        {this.props.books.numFound ? (
          <div>
            <h3>Your search returned {currentBooks.length} results. </h3>
            <div>
              {currentBooks.map((book, i) => (
                <div key={i}>
                  {book.isbn ? (
                    <Link to={`/book/${book.isbn[0]}`}>
                      <h4>{book.title}</h4>
                    </Link>
                  ) : (
                    book.title
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

const mapState = state => {
  return {
    books: state.books
  };
};

const mapDispatch = dispatch => {
  return {
    fetchBooks: book => dispatch(fetchBooks(book))
  };
};

export default connect(
  mapState,
  mapDispatch
)(AddBooks);
