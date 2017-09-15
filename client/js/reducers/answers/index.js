import axios from 'axios';

// ACTION TYPES
const SET_ANSWERS = 'SET_ANSWERS';
const SET_ANSWER = 'SET_ANSWER';

// ACTION CREATORS
export const setAnswers = answers => ({
  type: SET_ANSWERS,
  answers
})

export const setAnswer = (questionId, content) => ({
  type: SET_ANSWER,
  questionId,
  content
})

// REDUCER
export default function reducer (answers = [], action) {
  switch (action.type) {
    case SET_ANSWERS:
      return action.answers;
    case SET_ANSWER:
      const indexToReplace = answers.findIndex(answer => answer.questionId === action.questionId);
      console.log('questionId to replace is', indexToReplace)
      const questionId = action.questionId;
      const content = action.content;
      let newAnswers;
      if (indexToReplace !== -1) {
        newAnswers = [...answers.slice(0, indexToReplace), { questionId, content }, ...answers.slice(indexToReplace + 1)];
      } else {
        newAnswers = [...answers, {questionId, content}];
      }
      console.log('newAnswers are', newAnswers)
      return newAnswers;
    default:
      return answers;
  }
}

// THUNK CREATORS
export const fetchAnswersByFilledFormId = filledformId => dispatch => {
  axios.get(`/api/filledforms/${filledformId}/answers`)
    .then(res => res.data)
    .then(answers => dispatch(setAnswers(answers)))
    .catch(console.error)
}

export const fetchAnswersByEntityId = entityId => dispatch => {
  axios.get(`/api/answers/${entityId}/`)
    .then(res => res.data)
    .then(answers => {
      console.log('entity answers are', answers)
      return dispatch(setAnswers(answers))
    })
    .catch(console.error)
}
