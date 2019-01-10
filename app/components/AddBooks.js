// IDEAS - CAN FILTER DIRECTLY IN RENDER
// CAN ADD FILTERED BOOKS TO STORE SO IT'LL BE ACCESSIBLE EVERYWHERE - create a dispatch similar to fetchBooks
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { fetchBooks } from "../reducers/index";
import SingleBook from "./SingleBook";

class AddBooks extends Component {
  constructor() {
    super();
    this.state = {
      link: "",
      filterTerm: "",
      currentBooks: [],
      filteredBooks: []
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
    console.log("STATE IN HANDLE CLICK FOR FILTER", this.state);
    //let filteredBooks = [];
    // this.props.books.map(book =>
    //   book.has_fulltext === true ? filteredBooks.push(book) : null
    // );
    //this.setState({ filteredBooks: filteredBooks });
    // REFACTOR THIS SO VALUE IS EQUAL TO PROPERTY VALUE IN DATA
    if (event.target.value === "fullText") {
      this.setState({ filterTerm: "has_fulltext" });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    let searchTerm = this.linkify(this.state.link);
    this.props.fetchBooks(searchTerm); // axios backend
    // this.props.addingStudent(this.state); // front end
    this.setState({
      link: event.target.value
    });
  }

  render() {
    //console.log("STATE in render", this.state);
    //console.log("PROPS in render", this.props);
    let currentBooks = this.props.books;
    // let currentBooks = [];
    // this.state.filteredBooks.length > 0
    //   ? (currentBooks = this.state.filteredBooks)
    //   : (currentBooks = this.props.books);
    // if (this.state.filterTerm) {
    //   console.log("FILTER TERM IN RENDER", this.state.filterTerm);
    // }

    return (
      <div>
        <select onChange={this.handleFilter}>
          <option>All</option>
          <option value="english">English only</option>
          <option value="fullText">Full text available</option>
          <option value="eBook">E-book</option>
          ))}
        </select>

        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">Book title:</label>
          <input
            type="text"
            name="title"
            //   value={this.state.books}
            onChange={this.handleChange}
          />
          <button type="submit">Submit</button>
        </form>
        {this.props.books.numFound ? (
          <div>
            <h1>Your search returned {currentBooks.numFound} results. </h1>
            <div>
              {currentBooks.docs.map((book, i) => (
                <div key={i}>
                  {book.title} : {book.author_name} : {book.ebook_count_i}
                  {/* <SingleBook book={book} /> */}
                  {/* <Link to={`/students/${student.id}`}>
                    <h4>{student.firstname + " " + student.lastName}</h4>
                    <img src={student.imageUrl} />
                  </Link> */}
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
