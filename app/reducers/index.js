import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'

import currentGame from './currentGame';
import challengerList from './challengerList';

export default combineReducers({
    currentGame,
    challengerList,
    routing: routerReducer
});
