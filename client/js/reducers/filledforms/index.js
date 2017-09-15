import axios from 'axios';

// ACTION TYPES
const SET_FILLED_FORMS = 'SET_FILLED_FORMS';

// ACTION CREATORS
export const setFilledForms = filledforms => ({
  type: SET_FILLED_FORMS,
  filledforms
})


// REDUCER
export default function reducer (filledforms = [], action) {
  switch (action.type) {
    case SET_FILLED_FORMS:
      return action.filledforms;
    default:
      return filledforms;
  }
}

// THUNK CREATORS
export const fetchFilledFormsByEntityId = entityId => dispatch => {
  console.log('fetching filled forms...');
  axios.get(`/api/filledforms/byentity/${entityId}`)
    .then(res => res.data)
    .then(filledforms => {
      console.log('filledforms are', filledforms)
      dispatch(setFilledForms(filledforms))
    })
    .catch(console.error);
}
