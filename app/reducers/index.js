const initialState = {
  // students: [],
  // student: {},
  books: []
};

// ACTION CREATOR:

// export const FETCHED_STUDENTS = "FETCHED_STUDENTS";
// export const FETCHED_SINGLE_STUDENT = "FETCHED_SINGLE_STUDENT";
// export const ADDED_STUDENT = "ADDED_STUDENT";
export const FETCHED_BOOKS = "FETCHED_BOOKS";

// ACTIONS:

export const gotAllBooks = books => ({
  type: FETCHED_BOOKS,
  books: books
});

// export const gotAllStudents = students => ({
//   type: FETCHED_STUDENTS,
//   students: students
// });

// export const gotSingleStudent = student => ({
//   type: FETCHED_SINGLE_STUDENT,
//   student: student
// });

// export const gotAddedStudent = student => ({
//   type: ADDED_STUDENT,
//   student: student
// });

// THUNK CREATOR:

export const fetchBooks = searchTerm => {
  return async (dispatch, getState, { axios }) => {
    const response = await axios.get(searchTerm);
    const books = response.data;
    const action = gotAllBooks(books);
    dispatch(action);
  };
};

// export const fetchStudents = () => {
//   return async (dispatch, getState, { axios }) => {
//     const response = await axios.get(`/api/students`);
//     const students = response.data;
//     const action = gotAllStudents(students);
//     dispatch(action);
//   };
// };

// export const fetchStudent = studentId => {
//   return async (dispatch, getState, { axios }) => {
//     const response = await axios.get(`/api/students/${studentId}`);
//     const student = response.data;
//     const action = gotSingleStudent(student);
//     dispatch(action);
//   };
// };

// ADDING STUDENT
// export const addStudent = student => {
//   return async (dispatch, getState, { axios }) => {
//     try {
//       const { data } = await axios.post("/api/students", student);
//       dispatch(gotAddedStudent(data));
//     } catch (err) {
//       console.log(err);
//     }
//   };
// };

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHED_BOOKS:
      return { ...state, books: action.books };
    // case FETCHED_STUDENTS:
    //   return { ...state, students: action.students };
    // case FETCHED_SINGLE_STUDENT:
    //   return { ...state, student: action.student };
    // case ADDED_STUDENT:
    //   return { ...state, student: action.student };

    default:
      return state;
  }
};

export default rootReducer;
