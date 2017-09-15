import React from 'react';
import { connect } from 'react-redux';
import QuestionEntry from './QuestionEntry';
import { fetchQuestions } from '../reducers/questions';

class QuestionList extends React.Component {

  componentDidMount () {
    this.props.fetchQuestions();
  }

  render () {
    const questions = this.props.questions;
    return (
      <div className="container">
        {
          questions.map(question => <QuestionEntry key={question.id} {...question} />)
        }
      </div>
    );
  }
}

const mapState = (state, ownProps) => ({
  questions: state.questions
})

const mapDispatch = dispatch => ({
  fetchQuestions: () => dispatch(fetchQuestions()),
  fetchForms: () => dispatch(fetchForms())
})

export default connect(mapState, mapDispatch)(QuestionList);
