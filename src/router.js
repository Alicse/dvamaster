import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, Link, IndexRedirect } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Users from './routes/Users';
import Login from './routes/Login';
import Main from './routes/Main';
import Error from './routes/error';

export default function({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={Main}>
        <IndexRedirect to="error"/>
        <Route path="error" component={Error}/>
      </Route>
      <Route path="/users" component={Users}/>
      <Route path="/login" component={Login}/>
    </Router>
  );
};
