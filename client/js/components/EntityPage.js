import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchForms } from '../reducers/forms';
import { fetchFilledFormsByEntityId } from '../reducers/filledforms';
import { createFilledForm, editFilledForm } from '../reducers/filledform/thunks';
import { fetchAnswersByEntityId } from '../reducers/answers';
import { fetchQuestionsByEntityId } from '../reducers/questions';

class EntityPage extends React.Component {

  componentDidMount () {
    const { fetchForms, fetchFilledFormsByEntityId, fetchAnswersByEntityId, fetchQuestionsByEntityId } = this.props;
    const { entityId } = this.props.match.params;
    console.log('entityId is', entityId);
    fetchForms();
    fetchFilledFormsByEntityId(entityId);
    fetchAnswersByEntityId(entityId);
    fetchQuestionsByEntityId(entityId);
  }

  render () {
    const { forms, filledforms, createFilledForm, answers, questions } = this.props;
    const entityId = this.props.match.params.entityId;
    return (
      <div className="container">
        <div className="row">
          <div className="col-6">
            <h4>Fill Out A New Form</h4>
            {
              forms.map(form => {
                return (
                  <div><button key={form.id} onClick={() => createFilledForm(form.id, entityId, form.name)} className="btn btn-secondary">Fill New {form.name}</button></div>
                );
              })
            }
            <br/>
          </div>
          <div className="col-6">
            <h4>Answers (Most Recent)</h4>
            { !answers.length && 'No questions have been answered. Fill out a form!'}
            {
              answers.map(answer => {
                let question = questions.find(question => question.id === answer.questionId);
                return (
                  <div key={answer.id}>
                  <b>{question && question.content}:</b> <NavLink to={`/entities/${entityId}/filledform/${answer.filledformId}`} >{answer.content}</NavLink>
                  </div>
                );
              })
            }
          </div>
          <div className="col-6">
          <h4>View Or Edit An Existing Form</h4>
          { !filledforms.length && 'No filled-out forms. Fill out a form!'}
          {
            filledforms && filledforms.map(filledform => {
              return (
                <div><NavLink to={`/entities/${entityId}/filledform/${filledform.id}`} key={filledform.id}>{filledform.name}</NavLink></div>
              )
            })
          }
          </div>
        </div>
      </div>
    );
  }
}

const mapState = (state, ownProps) => ({
  forms: state.forms,
  filledforms: state.filledforms,
  answers: state.answers,
  questions: state.questions
})

const mapDispatch = dispatch => ({
  fetchForms: () => dispatch(fetchForms()),
  fetchFilledFormsByEntityId: entityId => dispatch(fetchFilledFormsByEntityId(entityId)),
  createFilledForm: (formId, entityId, formName) => dispatch(createFilledForm(formId, entityId, formName)),
  editFilledForm: filledformId => dispatch(editFilledForm(filledformId)),
  fetchAnswersByEntityId: entityId => dispatch(fetchAnswersByEntityId(entityId)),
  fetchQuestionsByEntityId: entityId => dispatch(fetchQuestionsByEntityId(entityId))
})

export default connect(mapState, mapDispatch)(EntityPage)

// <NavLink to={`/entities/${entityId}/form/${form.id}`} key={form.id} onClick={this.createFilledForm}>{form.name}</NavLink>


// {
//   filledforms.map(filledform => {
//     return (
//       <button key={filledform.id} onClick={() => editFilledForm(filledform.id)} >view/edit {filledform.name}</button>
//     );
//   })
// }
