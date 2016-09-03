import React from 'react';
import { Router, Route, IndexRoute, Redirect, browserHistory } from 'react-router';

import Main from '../components/Main';
import HomeContainer from '../containers/HomeContainer';
import ResultContainer from '../containers/ResultContainer';

import About from '../components/About';
import Changelog from '../components/Changelog';

var routes = (
    <Router history={browserHistory}>
        <Route path='/' component={Main}>
            <IndexRoute component={HomeContainer} />
            <Route path="/:region/:player" component={ResultContainer} />
            <Route path="/about" component={About} />
            <Route path="/changelog" component={Changelog} />
            <Redirect from="*" to="/" />
        </Route>
    </Router>

);

export default routes;
