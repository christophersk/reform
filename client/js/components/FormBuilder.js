import React from 'react';
import { connect } from 'react-redux';
import QuestionAdd from './QuestionAdd';
import QuestionEdit from './QuestionEdit';
import { setFormName } from '../reducers/form/name';
import { saveFormName } from '../reducers/form/thunks';
import { fetchQuestionsByFormId } from '../reducers/questions';
import { fetchFormQuestions } from '../reducers/formquestions';

class FormBuilder extends React.Component {

  componentDidMount () {
    const formId = this.props.match.params.formId;
    const { fetchQuestionsByFormId, fetchFormQuestions } = this.props;
    fetchQuestionsByFormId(formId);
    fetchFormQuestions(formId);
  }

  render () {
    const { questions, formquestions, name, setFormName, saveFormName } = this.props;
    const formId = this.props.match.params.formId;
    console.log('questions are in component', questions)
    return (
      <div className="container">
        <div className="row">
          <div className="col-3">
            <label htmlFor="form-name" className="form-label">Form Name:</label>
          </div>
          <div className="col-6">
            <input type="text" value={name} onChange={setFormName} name="form-name" className="form-control" />
          </div>
          <div className="col-3">
            <button onClick={() => saveFormName(formId, name)} className="btn btn-primary">Save Name</button>
          </div>
          <div className="col-12">
            <hr />
          </div>
        </div>
        {
          formquestions.sort((a, b) => a.order - b.order).map(formquestion => {
            const question = questions.find(question => question.id === formquestion.questionId);
            return <QuestionEdit key={question.id} {...question} formquestion={formquestion} formId={formId} />
          })
        }
        <div className="col-12">
          <hr />
        </div>
        <QuestionAdd formId={this.props.match.params.formId} parent="form" />
      </div>
    );
  }
}

const mapState = (state, ownProps) => ({
  name: state.form.name,
  questions: state.questions,
  formquestions: state.formquestions
})

const mapDispatch = dispatch => ({
  setFormName: e => dispatch(setFormName(e.target.value)),
  fetchQuestionsByFormId: formId => {
    console.log('getFormQuestions triggered, formId is', formId);
    dispatch(fetchQuestionsByFormId(formId));
  },
  fetchFormQuestions: formId => {
    console.log('fetchFormQuestions triggered');
    dispatch(fetchFormQuestions(formId));
  },
  saveFormName: (formId, name) => dispatch(saveFormName(formId, name))
})

export default connect(mapState, mapDispatch)(FormBuilder)


// {
//   questions.sort((a, b) => a.formquestion.order - b.formquestion.order).map(question => <QuestionEdit key={question.id} {...question} /> )
// }
