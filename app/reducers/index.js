const initialState = {
  books: [],
  bookDetails: {}
};

// ACTION CREATORS:
export const FETCHED_BOOKS = "FETCHED_BOOKS";
export const FETCHED_BOOK_DETAILS = "FETCHED_BOOK_DETAILS";

// ACTIONS:
export const gotAllBooks = books => ({
  type: FETCHED_BOOKS,
  books: books
});

export const gotBookDetails = bookDetails => ({
  type: FETCHED_BOOK_DETAILS,
  bookDetails: bookDetails
});

// THUNKS:
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
    default:
      return state;
  }
};

export default rootReducer;
