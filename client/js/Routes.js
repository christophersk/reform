import React from 'react';
import { connect } from 'react-redux';
import { Router } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import history from './history';
import Root from './components/Root';
import FormBuilder from './components/FormBuilder';
import QuestionAdd from './components/QuestionAdd';
import FormList from './components/FormList';
import QuestionList from './components/QuestionList';
import EntityList from './components/EntityList';
import EntityPage from './components/EntityPage';
import FormFill from './components/FormFill';

export default class Routes extends React.Component {

  render () {
    console.log('routes loaded')
    return (
      <Router history={history}>
        <Root>
          <Switch>
            <Route exact path="/forms" component={ FormList } />
            <Route exact path="/questions" component={ QuestionList } />
            <Route exact path="/entities" component={ EntityList } />
            <Route exact path="/entities/:entityId" component={ EntityPage } />
            <Route exact path="/entities/:entityId/filledform/:filledformId" component={ FormFill } />
            <Route path="/forms/edit/:formId" component={ FormBuilder } />
            <Route path="/forms/edit/:formId/add-question" component={ QuestionAdd } />
            <Route path="/questions/edit" component={ QuestionAdd } />
          </Switch>
        </Root>
      </Router>
    );
  }
}
