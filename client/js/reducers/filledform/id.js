// ACTION TYPES
const SET_FILLED_FORM_ID = 'SET_FILLED_FORM_ID';

// ACTION CREATORS
export const setFilledFormId = id => ({
  type: SET_FILLED_FORM_ID,
  id
})

// REDUCER
export default function reducer (id = '', action) {
  switch (action.type) {
    case SET_FILLED_FORM_ID:
      return action.id;
    default:
      return id;
  }
}
