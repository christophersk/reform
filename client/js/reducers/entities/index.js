import axios from 'axios';

// ACTION TYPES
const SET_ENTITIES = 'SET_ENTITIES';

// ACTION CREATORS
export const setEntities = entities => ({
  type: SET_ENTITIES,
  entities
})

// REDUCER
export default function reducer (entities = [], action) {
  switch (action.type) {
    case SET_ENTITIES:
      return action.entities;
    default:
      return entities;
  }
}

// THUNK CREATORS
export const fetchEntities = () => dispatch => {
  axios.get('/api/entities')
    .then(res => res.data)
    .then(entities => dispatch(setEntities(entities)))
    .catch(console.error)
}
