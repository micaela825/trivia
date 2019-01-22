const initialState = {
  books: [],
  bookDetails: {},
  michael: "",
  advice: "",
  trivia: []
};

// ACTION CREATORS:
export const GOT_TRIVIA = "GOT_TRIVIA";
export const GOT_MICHAEL_QUOTE = "GOT_MICHAEL_QUOTE";
export const GOT_ADVICE = "GOT_ADVICE";
export const FETCHED_BOOKS = "FETCHED_BOOKS";
export const FETCHED_BOOK_DETAILS = "FETCHED_BOOK_DETAILS";

// ACTIONS:
export const gotTrivia = trivia => ({
  type: GOT_TRIVIA,
  trivia: trivia
});

export const gotAdvice = advice => ({
  type: GOT_ADVICE,
  advice: advice
});

export const gotMichaelQuote = quote => ({
  type: GOT_MICHAEL_QUOTE,
  quote: quote
});

export const gotAllBooks = books => ({
  type: FETCHED_BOOKS,
  books: books
});

export const gotBookDetails = bookDetails => ({
  type: FETCHED_BOOK_DETAILS,
  bookDetails: bookDetails
});

// THUNKS:
export const fetchTrivia = () => {
  return async (dispatch, getState, { axios }) => {
    const response = await axios.get("http://jservice.io/api/random");
    const trivia = response.data;
    const action = gotTrivia(trivia);
    dispatch(action);
  };
};

export const fetchAdvice = () => {
  return async (dispatch, getState, { axios }) => {
    const response = await axios.get("https://api.adviceslip.com/advice");
    const advice = response.data;
    const action = gotAdvice(advice);
    dispatch(action);
  };
};

export const fetchQuote = () => {
  return async (dispatch, getState, { axios }) => {
    // const response = await axios.get(
    //   `https://michael-scott-quotes.herokuapp.com/quote`
    // );

    const response = await axios.get(
      "http://ron-swanson-quotes.herokuapp.com/v2/quotes"
    );
    const quote = response.data;
    const action = gotMichaelQuote(quote);
    dispatch(action);
  };
};

export const fetchBooks = searchTerm => {
  return async (dispatch, getState, { axios }) => {
    const response = await axios.get(searchTerm);
    const books = response.data;
    const action = gotAllBooks(books);
    dispatch(action);
  };
};

export const fetchBookDetails = isbnLink => {
  return async (dispatch, getState, { axios }) => {
    const response = await axios.get(isbnLink);
    const details = response.data;
    const action = gotBookDetails(details);
    dispatch(action);
  };
};

// REDUCER:
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHED_BOOKS:
      return { ...state, books: action.books };
    case FETCHED_BOOK_DETAILS:
      return { ...state, bookDetails: action.bookDetails };
    case GOT_MICHAEL_QUOTE:
      return { ...state, michael: action.quote };
    case GOT_ADVICE:
      return { ...state, advice: action.advice };
    case GOT_TRIVIA:
      return { ...state, trivia: action.trivia };
    default:
      return state;
  }
};

export default rootReducer;
