import axios from 'axios';
import history from '../../history';
import { setQuestionId } from './id';
import { setQuestionContent } from './content';
import { setQuestionType } from './questionType';
import { addQuestion, fetchQuestionsByFormId } from '../questions';
import { fetchFormQuestions } from '../formquestions';
import store from '../../store';

// THUNK CREATORS
export const createQuestion = newQuestion => dispatch => {
  axios.post('/api/questions', newQuestion)
    .then(res => res.data)
    .then(question => {
      dispatch(setQuestionId(question.id))
    })
    .then(() => history.push('/questions/edit'))
    .catch(console.error)
}

export const editQuestion = (questionId, modifiedQuestion) => dispatch => {
  axios.post(`/api/questions/${questionId}`, modifiedQuestion)
    .then(res => res.data)
    .then(question => {
      dispatch(setQuestionId(question.id));
      dispatch(setQuestionContent(question.content));
      dispatch(setQuestionType(question.questionType));
    })
}

export const saveQuestion = (parent, parentId) => dispatch => {
  const state = store.getState();
  const order = state.questions.length + 1;
  let question = state.question;
  if (parent === 'form') {
    question = Object.assign({}, question, { formId: parentId, order });
  }
  axios.post(`/api/questions`, question)
    .then(res => res.data)
    .then(question => {
      // dispatch(addQuestion(question));
      // do the below until I can enable websockets:
      dispatch(fetchQuestionsByFormId(parentId));
      dispatch(fetchFormQuestions(parentId));

    })
    .catch(console.error);
}
