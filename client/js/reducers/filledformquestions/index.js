import axios from 'axios';

// ACTION TYPES
const SET_FILLED_FORM_QUESTIONS = 'SET_FILLED_FORM_QUESTIONS';

// ACTION CREATORS
const setFilledFormQuestions = filledformquestions => ({
  type: SET_FILLED_FORM_QUESTIONS,
  filledformquestions
})

// REDUCER
export default function reducer (filledformquestions = [], action) {
  switch (action.type) {
    case SET_FILLED_FORM_QUESTIONS:
      return action.filledformquestions;
    default:
      return filledformquestions;
  }
}

// THUNK CREATORS
export const fetchFilledFormQuestions = filledformId => dispatch => {
  axios.get(`/api/filledforms/${filledformId}/filledformquestions`)
    .then(res => res.data)
    .then(filledformquestions => {
      dispatch(setFilledFormQuestions(filledformquestions));
    })
    .catch(console.error)
}
