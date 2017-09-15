import axios from 'axios';
import history from '../../history';
import { setFilledFormName } from './name';
import { setFilledFormId } from './id';

// THUNK CREATORS
export const createFilledForm = (formId, entityId, name) => dispatch => {
  console.log('createFilledForm running...');
  axios.post('/api/filledforms', {formId, entityId, name})
    .then(res => res.data)
    .then(filledform => {
      console.log('created filled form is', filledform);
      history.push(`/entities/${filledform.entityId}/filledform/${filledform.id}`)
    })
    .catch(console.error)
}

export const saveFilledForm = (filledformId, answers, entityId) => dispatch => {
  axios.put(`/api/filledforms/${filledformId}`, { answers })
    .then(res => {
      if (res.status === 200) {
        alert('All your form\'s base are belong to the database.');
        history.push(`/entities/${entityId}`)
      }
    })
    .catch(console.error)
}

export const fetchFilledFormById = filledformId => dispatch => {
  axios.get(`/api/filledforms/${filledformId}`)
    .then(res => res.data)
    .then(filledform => {
      dispatch(setFilledFormName(filledform.name))
      dispatch(setFilledFormId(filledform.id))
    })
}
