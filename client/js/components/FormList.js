import React from 'react';
import { connect } from 'react-redux';
import FormEntry from './FormEntry';
import { fetchForms } from '../reducers/forms';

class FormList extends React.Component {

  componentDidMount () {
    this.props.fetchForms();
  }

  render () {
    const { forms } = this.props;
    return (
      <div className="container">
        { forms.map(form => <FormEntry {...form} key={form.id} />)}
      </div>
    );
  }
}

const mapState = (state, ownProps) => ({
  forms: state.forms,
  formquestions: state.formquestions
})

const mapDispatch = dispatch => ({
  fetchForms: () => dispatch(fetchForms())
})

export default connect(mapState, mapDispatch)(FormList);
