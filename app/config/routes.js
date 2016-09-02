import React from 'react';
import { Router, Route, IndexRoute, Redirect, browserHistory } from 'react-router';

import Main from '../components/Main';
import HomeContainer from '../containers/HomeContainer';
import ResultContainer from '../containers/ResultContainer';

var routes = (
    <Router history={browserHistory}>
        <Route path='/' component={Main}>
            <IndexRoute component={HomeContainer} />
            <Route path="/:region/:player" component={ResultContainer} />
            <Redirect from="*" to="/" />
        </Route>
    </Router>

);

export default routes;
