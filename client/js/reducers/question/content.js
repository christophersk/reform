// ACTION TYPES
const SET_QUESTION_CONTENT = 'SET_QUESTION_CONTENT';

// ACTION CREATORS
export const setQuestionContent = content => ({
  type: SET_QUESTION_CONTENT,
  content
})

// REDUCER
export default function (content = '', action) {
  switch (action.type) {
    case SET_QUESTION_CONTENT:
      return action.content
    default:
      return content;
  }
}
