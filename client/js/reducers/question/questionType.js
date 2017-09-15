// ACTION TYPES
const SET_QUESTION_TYPE = 'SET_QUESTION_TYPE';

// ACTION CREATORS
export const setQuestionType = (questionType) => ({
  type: SET_QUESTION_TYPE,
  questionType
})

// REDUCER
export default function (questionType = '', action) {
  switch (action.type) {
    case SET_QUESTION_TYPE:
      return action.questionType
    default:
      return questionType;
  }
}
