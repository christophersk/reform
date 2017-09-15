import React from 'react';
import { connect } from 'react-redux';
import { setQuestionType } from '../reducers/question/questionType';
import { setQuestionContent } from '../reducers/question/content';
import { saveQuestion } from '../reducers/question/thunks';

class QuestionAdd extends React.Component {
  constructor (props) {
    super(props);

    this.handleQuestionTypeClick = this.handleQuestionTypeClick.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
  }

  componentDidMount () {
    this.props.setQuestionType('text');
  }

  handleQuestionTypeClick (e) {
    e.preventDefault();
    this.props.setQuestionType(e.target.value);
  }

  handleSaveClick(e) {
    e.preventDefault();
    const { formId, saveQuestion, parent } = this.props;
    console.log('parent is', parent)
    saveQuestion(parent, formId);
  }

  render () {
    const { setQuestionType, setQuestionContent, questionType } = this.props;
    return (
        <div className="row">
          <div className="col-3">
              Type of question:
          </div>
          <div className="col-9">
            <button onClick={this.handleQuestionTypeClick} value="text" className={questionType === 'text' ? 'btn btn-primary' : 'btn btn-secondary'}>
              Text
            </button>
            <button onClick={this.handleQuestionTypeClick} value="radio" className={questionType === 'radio' ? 'btn btn-primary' : 'btn btn-secondary'}>Radio</button>
            <button onClick={this.handleQuestionTypeClick} value="checkbox" className={questionType === 'checkbox' ? 'btn btn-primary' : 'btn btn-secondary'}>Checkbox</button>
          </div>
            <div className="col-3">
              <label htmlFor="content" className="control-label">Question:</label>
            </div>
            <div className="col-9">
              <input onChange={e => setQuestionContent(e.target.value)} type="text" name="content" className="form-control"/>
            </div>
            <div className="col-12">
              <button onClick={this.handleSaveClick} >Save Question</button>
            </div>
        </div>
    );
  }
}

const mapState = (state, ownProps) => ({
  questionType: state.question.questionType
});

const mapDispatch = dispatch => ({
  setQuestionType: questionType => {
    dispatch(setQuestionType(questionType))
  },
  setQuestionContent: content => dispatch(setQuestionContent(content)),
  saveQuestion: (parent, formId) => {
    dispatch(saveQuestion(parent, formId));
  }
})

export default connect(mapState, mapDispatch)(QuestionAdd);
