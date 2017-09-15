// ACTION TYPES
const SET_FORM_ID = 'SET_FORM_ID';

// ACTION CREATORS
export const setFormId = id => ({
  type: SET_FORM_ID,
  id
})

// REDUCER
export default function reducer (id = '', action) {
  switch (action.type) {
    case SET_FORM_ID:
      return action.id;
    default:
      return id;
  }
}
