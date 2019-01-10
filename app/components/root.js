import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import SingleBook from "./SingleBook";
import AddBooks from "./AddBooks";
import store from "../store";

const Root = () => {
  return (
    <Router>
      <div>
        <header />
        <main>
          <h1>Welcome to the book search!</h1>
          <Route exact path="/" component={AddBooks} />
          <Route path="/book/:isbn" component={SingleBook} />
        </main>
      </div>
    </Router>
  );
};

export default Root;
