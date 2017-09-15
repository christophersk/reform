import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { createForm } from '../reducers/form/thunks';
import { createQuestion } from '../reducers/question/thunks';

function Navbar ({ createForm, createQuestion }) {

  return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">ReForm</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink to="/forms" className="nav-link">Forms</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/questions" className="nav-link">Questions</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/entities" className="nav-link">Entities</NavLink>
            </li>
          </ul>

          <ul className="navbar-nav ml-auto">
            <form onSubmit={createQuestion} className="form-inline my-2 my-lg-0">
              <input className="form-control mr-sm-2" type="submit" value="Add Question" />
            </form>
            <form onSubmit={createForm} className="form-inline my-2 my-lg-0">
              <input className="form-control mr-sm-2" type="submit" value="Create Form" />
            </form>
          </ul>
        </div>
      </nav>
  )
}

const mapState = (state, ownProps) => ({})

const mapDispatch = dispatch => ({
  createForm: e => {
    e.preventDefault();
    dispatch(createForm())
  },
  createQuestion: e => {
    e.preventDefault();
    dispatch(createQuestion())
  }
})

export default connect(mapState, mapDispatch)(Navbar);
