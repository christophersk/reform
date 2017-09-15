import { combineReducers } from 'redux';
import question from './question';
import form from './form';
import questions from './questions';
import forms from './forms';
import formquestions from './formquestions';
import filledformquestions from './filledformquestions';
import entities from './entities';
import answers from './answers';
import filledform from './filledform';
import filledforms from './filledforms';

export default combineReducers({ question, form, questions, forms, formquestions, entities, answers, filledform, filledformquestions, filledforms })
