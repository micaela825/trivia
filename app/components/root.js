import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import Students from "./students";
// import SingleStudent from "./SingleStudent";
import AddBooks from "./AddBooks";

const Root = () => {
  return (
    <Router>
      <div>
        <nav>
          Welcome!
          {/* <Link to="/students">
            <button text="search">Search</button>
          </Link> */}
          <Link to="/books">
            <button text="search">books</button>
          </Link>
        </nav>
        <main>
          <h1>Welcome to the book search!</h1>
          <Route exact path="/books" component={AddBooks} />
          {/* <Route exact path="/students" component={Students} />
          <Route exact path="/students/:studentId" component={SingleStudent} /> */}
        </main>
      </div>
    </Router>
  );
};

export default Root;
