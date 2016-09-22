import React from 'react';
import { Router, Route, IndexRoute, Redirect, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import Main from '../components/Main';
import ChallengerListContainer from '../containers/ChallengerListContainer';
import CurrentTableContainer from '../containers/CurrentTableContainer';

import About from '../components/About';
import Changelog from '../components/Changelog';

import configureStore from '../stores/configureStore';
const store = configureStore();

var routes = (
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path='/' component={Main}>
                <IndexRoute component={ChallengerListContainer} />
                <Route path="/:region/:player" component={CurrentTableContainer} />
                <Route path="/about" component={About} />
                <Route path="/changelog" component={Changelog} />
                <Redirect from="*" to="/" />
            </Route>
        </Router>
    </Provider>
);

export default routes;
