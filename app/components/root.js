import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import SingleBook from "./SingleBook";
import AllBooks from "./AllBooks";
import Home from "./Home";
import Trivia from "./Trivia";

const Root = () => {
  return (
    <Router>
      <div>
        <header />
        <nav>
          <Link to="/">
            <button className="home">Home</button>
          </Link>
          <Link to="/book">
            <button className="books">Books</button>
          </Link>
          <Link to="/trivia">
            <button className="books">Trivia</button>
          </Link>
        </nav>
        <main>
          <Route exact path="/" component={Home} />
          <Route exact path="/trivia" component={Trivia} />
          <Route exact path="/book" component={AllBooks} />
          <Route path="/book/:isbn" component={SingleBook} />
        </main>
      </div>
    </Router>
  );
};

export default Root;
