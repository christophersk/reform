// ACTION TYPES
const SET_FILLED_FORM_NAME = 'SET_FILLED_FORM_NAME';

// ACTION CREATORS
export const setFilledFormName = name => ({
  type: SET_FILLED_FORM_NAME,
  name
})

// REDUCER
export default function reducer (name = '', action) {
  switch (action.type) {
    case SET_FILLED_FORM_NAME:
      return action.name;
    default:
      return name;
  }
}
