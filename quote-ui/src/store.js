import rootReducer from './reducers';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';

import { StockSearchSaga } from './reducers/StockSearch';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    rootReducer,
    applyMiddleware(
        sagaMiddleware, 
        /* we could turn logger off in production, but for this application it is useful
         * for insight into the state changes
         */ 
        createLogger({ collapsed: true }))
);

sagaMiddleware.run(StockSearchSaga);

export default store;