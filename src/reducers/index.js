import {combineReducers} from 'redux';

import cards from './listCards';
import card from './currentCard';
import responseObj from './responseObj';

export default combineReducers({
    cards,
    card,
    responseObj
});
