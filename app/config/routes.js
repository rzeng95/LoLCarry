import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import Main from '../components/Main';
import Home from '../components/Home';
import Result from '../components/Result';

var routes = (
    <Router history={browserHistory}>
        <Route path='/' component={Main}>
            <IndexRoute component={Home} />
            <Route path="/:region/:player" component={Result} />
        </Route>
    </Router>

);

export default routes;
