import axios from 'axios';

// ACTION TYPES
const SET_QUESTIONS = 'SET_QUESTIONS';
const ADD_QUESTION = 'ADD_QUESTION';
const MOVE_FORM_QUESTION_UP = 'MOVE__FORM_QUESTION_UP'

// ACTION CREATORS
export const setQuestions = questions => ({
  type: SET_QUESTIONS,
  questions
})

export const addQuestion = question => ({
  type: ADD_QUESTION,
  question
})

// REDUCER
export default function reducer (questions = [], action) {
  switch (action.type) {
    case SET_QUESTIONS:
      return action.questions;
    case ADD_QUESTION:
      return [...questions, action.question];
    default:
      return questions;
  }
}

// THUNK CREATORS
export const fetchQuestionsByFormId = formId => dispatch => {
  //console.log('fetching questions...');
  axios.get(`/api/questions/form/${formId}`)
    .then(res => res.data)
    .then(questions => {
      //console.log('questions are', questions)
      dispatch(setQuestions(questions))
    })
    .catch(console.error);
}

export const fetchQuestionsByFilledFormId = filledformId => dispatch => {
  console.log('fetching the filled form\s questions...');
  axios.get(`/api/questions/filledform/${filledformId}`)
    .then(res => res.data)
    .then(questions => {
      console.log('filled form\s questions are', questions)
      dispatch(setQuestions(questions))
    })
    .catch(console.error);
}

export const fetchQuestions = () => dispatch => {
  axios.get('/api/questions')
    .then(res => res.data)
    .then(questions => dispatch(setQuestions(questions)))
    .catch(console.error);
}

export const fetchQuestionsByEntityId = entityId => dispatch => {
  axios.get(`/api/questions/${entityId}/`)
    .then(res => res.data)
    .then(questions => {
      console.log('entity questions are', questions)
      return dispatch(setQuestions(questions))
    })
    .catch(console.error)
}
