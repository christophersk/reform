// REDUCER
import { combineReducers } from 'redux';
import id from './id';
import entityId from './entityId';
import name from './name';

export default combineReducers({ id, entityId, name })
