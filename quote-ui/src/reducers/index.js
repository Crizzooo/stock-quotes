import { combineReducers } from 'redux';

import StockSearchReducer from './StockSearch/';

export default combineReducers({
    stockSearch: StockSearchReducer
});