import { combineReducers } from 'redux';

import currentGame from './currentGame';
import challengerList from './challengerList';

export default combineReducers({
    currentGame,
    challengerList
});
