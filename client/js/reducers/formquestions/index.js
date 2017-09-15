import axios from 'axios';
import store from '../../store';

// ACTION TYPES
const SET_FORMQUESTIONS = 'SET_FORMQUESTIONS';
const ADD_FORMQUESTION = 'ADD_FORMQUESTION';
const REPLACE_FORM_QUESTION = 'REPLACE_FORM_QUESTION';

// ACTION CREATORS
const setFormQuestions = formquestions => ({
  type: SET_FORMQUESTIONS,
  formquestions
})

const addFormQuestion = formquestion => ({
  type: ADD_FORMQUESTION,
  formquestion
})

const replaceFormQuestion = formquestion => ({
  type: REPLACE_FORM_QUESTION,
  formquestion
})

// REDUCER
export default function reducer (formquestions = [], action) {
  switch (action.type) {
    case SET_FORMQUESTIONS:
      return action.formquestions;
    case ADD_FORMQUESTION:
      return [...formquestions, action.formquestion];
    case REPLACE_FORM_QUESTION:
      const indexToReplace = formquestions.findIndex(formquestion => formquestion.questionId === action.formquestion.questionId);
      return [...formquestions.slice(0, indexToReplace), action.formquestion, ...formquestions.slice(indexToReplace + 1)];
    default:
      return formquestions;
  }
}

// THUNK CREATORS
export const fetchFormQuestions = formId => dispatch => {
  console.log('fetchFormQuestions happening...');
  axios.get(`/api/forms/${formId}/formquestions`)
    .then(res => res.data)
    .then(formquestions => {
      console.log('formquestions are', formquestions);
      dispatch(setFormQuestions(formquestions));
    })
    .catch(console.error)
}

export const moveFormQuestion = (formId, questionId, order, direction) => dispatch => {
  const formLength = store.getState().formquestions.length;
  if ((order === 1 && direction === 'up') || (order === formLength && direction === 'down')) {
    console.log('edge of form, doing nothing');
    return;
  }
  axios.put(`/api/forms/${formId}/move/${questionId}/${direction}`, {})
    .then(res => res.data)
    .then(formquestions => {
      console.log('new order is', formquestions)
      // since formquestions were swapped, replace both entries in join table
      dispatch(replaceFormQuestion(formquestions[0]));
      dispatch(replaceFormQuestion(formquestions[1]));
    })
    .catch(console.error)
}

// fetch all of the forms for a given question
export const fetchQuestionForms = questionId => dispatch => {
  axios.get(`/api/questions/${questionId}/formquestions`)
    .then(res => res.data)
    .then(formquestions => dispatch(setFormQuestions(formquestions)))
    .catch(console.error)
}
