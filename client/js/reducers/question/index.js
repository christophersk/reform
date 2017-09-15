import { combineReducers } from 'redux';
import questionType from './questionType'
import content from './content';
import id from './id';

export default combineReducers({ id, questionType, content })
