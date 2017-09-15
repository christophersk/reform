// ACTION TYPES
const SET_ENTITY_ID = 'SET_ENTITY_ID';

// ACTION CREATORS
export const setEntityId = entityId => ({
  type: SET_ENTITY_ID,
  entityId
})

// REDUCER
export default function reducer (entityId = '', action) {
  switch (action.type) {
    case SET_ENTITY_ID:
      return action.entityId;
    default:
      return entityId;
  }
}
