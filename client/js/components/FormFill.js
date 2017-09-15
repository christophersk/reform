import React from 'react';
import { connect } from 'react-redux';
import { setEntityId } from '../reducers/filledform/entityId';
import { setFilledFormId } from '../reducers/filledform/id';
import { fetchQuestionsByFilledFormId } from '../reducers/questions';
import { fetchFilledFormQuestions } from '../reducers/filledformquestions';
import { fetchFilledFormById, saveFilledForm } from '../reducers/filledform/thunks';
import { fetchAnswersByFilledFormId } from '../reducers/answers';
import AnswerQuestion from './AnswerQuestion';

class FormFill extends React.Component {
  constructor (props) {
    super(props);

    this.handleSaveForm = this.handleSaveForm.bind(this);
  }

  componentDidMount () {
    const { entityId, filledformId } = this.props.match.params;
    const { setEntityId, fetchQuestionsByFilledFormId, fetchFilledFormById, setFilledFormId, fetchFilledFormQuestions, fetchAnswersByFilledFormId } = this.props;
    setEntityId(entityId);
    setFilledFormId(filledformId);
    fetchFilledFormQuestions(filledformId);
    fetchQuestionsByFilledFormId(filledformId);
    fetchFilledFormById(filledformId);
    fetchAnswersByFilledFormId(filledformId);
  }

  handleSaveForm (e) {
    const { saveFilledForm, answers } = this.props;
    const { filledformId, entityId } = this.props.match.params;
    e.preventDefault();
    saveFilledForm(filledformId, answers, entityId);
  }

  render () {
    const { questions, filledformquestions, answers, filledform } = this.props;
    // console.log('formquestions are', formquestions)
    // console.log('formfill props are', this.props);
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            { filledform.name }
          </div>
        </div>
      {
        filledformquestions.sort((a, b) => a.order - b.order).map(filledformquestion => {
          const question = questions.find(question => question.id === filledformquestion.questionId);
          const answer = answers.find(answer => +answer.questionId === +filledformquestion.questionId) || {};
          console.log('answer is', answer)
          return <AnswerQuestion key={filledformquestion.questionId} question={question} answer={answer} filledformquestion={filledformquestion} />
        })
      }
      <button onClick={this.handleSaveForm} className="btn btn-primary">Save Form</button>
      </div>
    );
  }
}

const mapState = (state, ownProps) => ({
  filledform: state.filledform,
  filledformquestions: state.filledformquestions,
  questions: state.questions,
  answers: state.answers
})

const mapDispatch = dispatch => ({
  setEntityId: entityId => dispatch(setEntityId(entityId)),
  setFilledFormId: filledformId => dispatch(setFilledFormId(filledformId)),
  fetchQuestionsByFilledFormId: filledformId => dispatch(fetchQuestionsByFilledFormId(filledformId)),
  fetchFilledFormQuestions: filledformId => dispatch(fetchFilledFormQuestions(filledformId)),
  fetchFilledFormById: filledformId => dispatch(fetchFilledFormById(filledformId)),
  fetchAnswersByFilledFormId: filledformId => dispatch(fetchAnswersByFilledFormId(filledformId)),
  saveFilledForm: (filledformId, answers, entityId) => dispatch(saveFilledForm(filledformId, answers, entityId))
})

export default connect(mapState, mapDispatch)(FormFill);
