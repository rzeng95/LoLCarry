import { combineReducers } from 'redux';

import currentGame from './currentGame';
import challengerList from './ChallengerList';

export default combineReducers({
    currentGame,
    challengerList
});
