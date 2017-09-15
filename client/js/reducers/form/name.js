// ACTION TYPES
const SET_FORM_NAME = 'SET_FORM_NAME';

// ACTION CREATORS
export const setFormName = name => ({
  type: SET_FORM_NAME,
  name
})

// REDUCER
export default function reducer (name = '', action) {
  switch (action.type) {
    case SET_FORM_NAME:
      return action.name;
    default:
      return name;
  }
}
