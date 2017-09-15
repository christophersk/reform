import axios from 'axios';
import history from '../../history';
import { setFormName } from './name';
import { setFormId } from './id';

// THUNK CREATORS
export const createForm = () => dispatch => {
  axios.post('/api/forms')
    .then(res => res.data)
    .then(form => {
      console.log('new form is', form);
      dispatch(setFormName(form.name))
      dispatch(setFormId(form.id))
      history.push(`/forms/edit/${form.id}/add-question`)
    })
    .catch(console.error)
}

export const fetchFormById = formId => dispatch => {
  axios.get(`/api/forms/${formId}`)
    .then(res => res.data)
    .then(form => {
      dispatch(setFormName(form.name))
      dispatch(setFormId(form.id))
    })
}

export const saveFormName = (formId, name) => dispatch => {
  axios.put(`/api/forms/${formId}`, { name })
    .catch(console.error);
}
