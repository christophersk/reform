import React from 'react';
import { connect } from 'react-redux';
import { moveFormQuestion } from '../reducers/formquestions';

function QuestionEdit (props) {
  const formId = props.formId;
  console.log('questionEdit props are', props)
  const questionId = props.id;
  const order = props.formquestion.order;
  return (
    <div className="row">
      <div className="col-1">
        <i onClick={() => props.moveFormQuestion(formId, questionId, order, 'up')} className="fa fa-chevron-up" aria-hidden="true"></i><br />
        <i onClick={() => props.moveFormQuestion(formId, questionId, order, 'down')} className="fa fa-chevron-down" aria-hidden="true"></i>
      </div>
      <div className="col-1">
        {order}
      </div>
      <div className="col-10">
        {props.content}
      </div>
      <div className="col-10 ml-auto">
        <hr />
      </div>
    </div>
  );
}

const mapState = (state, ownProps) => ({})

const mapDispatch = dispatch => ({
  moveFormQuestion: (formId, questionId, order, direction) => dispatch(moveFormQuestion(formId, questionId, order, direction))
})

export default connect(mapState, mapDispatch)(QuestionEdit)
