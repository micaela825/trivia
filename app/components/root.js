import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import SingleBook from "./SingleBook";
import AllBooks from "./AllBooks";

const Root = () => {
  return (
    <Router>
      <div>
        <header />
        <nav>
          <Link to="/">
            <button className="home">Home</button>
          </Link>
        </nav>
        <main>
          <h1>Find a book!</h1>
          <Route exact path="/" component={AllBooks} />
          <Route path="/book/:isbn" component={SingleBook} />
        </main>
      </div>
    </Router>
  );
};

export default Root;
