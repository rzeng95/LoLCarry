import reducer from '../reducers/index'

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

const configureStore = (initialState) => {
    const middleware = [ thunk ];

    const store = createStore(reducer, initialState, compose(
    applyMiddleware(...middleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
    ));
    //store.dispatch({type: 'increase'})
    return store;

}

export default configureStore;
