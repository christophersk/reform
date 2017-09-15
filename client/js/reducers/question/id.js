// ACTION TYPES
const SET_QUESTION_ID = 'SET_QUESTION_ID';

// ACTION CREATORS
export const setQuestionId = id => ({
  type: SET_QUESTION_ID,
  id
})

// REDUCER
export default function (id = '', action) {
  switch (action.type) {
    case SET_QUESTION_ID:
      return action.id
    default:
      return id;
  }
}
