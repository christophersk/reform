import axios from 'axios';

// ACTION TYPES
const SET_FORMS = 'SET_FORMS';
const ADD_FORM = 'ADD_FORM';

// ACTION CREATORS
export const setForms = forms => ({
  type: SET_FORMS,
  forms
})

export const addForm = form => ({
  type: ADD_FORM,
  form
})

// REDUCER
export default function reducer (forms = [], action) {
  switch (action.type) {
    case SET_FORMS:
      return action.forms
    case ADD_FORM:
      return [...forms, action.question];
    default:
      return forms;
  }
}

// THUNK CREATORS
export const fetchForms = () => dispatch => {
  console.log('fetching forms...');
  axios.get(`/api/forms/`)
    .then(res => res.data)
    .then(forms => {
      console.log('forms are', forms)
      dispatch(setForms(forms))
    })
    .catch(console.error);
}
