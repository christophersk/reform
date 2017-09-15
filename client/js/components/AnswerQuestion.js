import React from 'react';
import { connect } from 'react-redux';
import { setAnswer } from '../reducers/answers';

class AnswerQuestion extends React.Component {
  constructor (props) {
    super(props);

    this.handleAnswerChange = this.handleAnswerChange.bind(this);
  }

  componentDidMount () {
  }

  handleAnswerChange (e) {
    const { setAnswer, question } = this.props;
    const content = e.target.value;
    e.preventDefault();
    setAnswer(question.id, content);
  }

  render () {
    // console.log('AnswerQuestion props are', this.props);
    const { question, answer, filledformquestion } = this.props;
    console.log('in answer is', answer)
    return (
      <div className="row">
        <div className="col-1">
          { filledformquestion.order }
        </div>
        <div className="col-11">
          { question && question.content }
        </div>
        <input type="text" value={answer.content} onChange={this.handleAnswerChange} className="form-control" />
      </div>
    );
  }
}

const mapState = (state, ownProps) => ({
  answers: state.answers
})

const mapDispatch = dispatch => ({
  setAnswer: (questionId, content) => dispatch(setAnswer(questionId, content))
})

export default connect(mapState, mapDispatch)(AnswerQuestion);
