import React from 'react';
import { connect } from 'react-redux';

class QuestionEntry extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      edit: false
    }
  }

  handleEditClick () {
    this.setState({ edit: true });
  }

  render () {
    return (
      <div className="row">
        <div className="col-1">
          <button onClick="" >Edit</button>
        </div>
        <div className="col-11">
          {this.props.content}
        </div>
        <div className="col-10 ml-auto">
          <hr />
        </div>
        {
          this.state.edit &&
          <div className="col-11 ml-auto">

          </div>
        }
      </div>
    )
  }
}

const mapState = (state, ownProps) => ({
  formquestions: state.formquestions,
  forms: state.forms
});
const mapDispatch = dispatch => ({

})

export default connect(mapState, mapDispatch)(QuestionEntry);
