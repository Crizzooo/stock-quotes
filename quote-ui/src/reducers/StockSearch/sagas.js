import { takeEvery, call, put, select } from 'redux-saga/effects';
import SearchActions from './actions';
import { getSearchResults } from '../../requests';
import { updateStockSearchResults, updateSearchValue } from './reducer';
import StockSearchSelectors from './selectors';

export function *fetchStockSearchRequest(action) {
    let { payload: searchVal } = action;

    // update current search value in store for selecting results
    yield put(updateSearchValue(searchVal));

    /* We dont want to fetch or display results if there is no search value
     * and we want to wait until at least 2 characters have been entered
     * Otherwise the results set will be too large and slow to render ( unless we enhance with React Virtualize )
     */
    if (!searchVal || searchVal.length < 2) return;

    let currentResults = yield select(StockSearchSelectors.resultCache);
    if (searchVal in currentResults) {
        /* if result is already in store,
         *  we dont have to do anything. Let the selectors do their work on search value change
         */
        yield currentResults[searchVal];
        return;
    }

    try {
        const searchResults = yield call(getSearchResults, searchVal);
        yield put(updateStockSearchResults(searchVal, searchResults));
    } catch (e) {
        /* For the sake of this test app, I'm opting to not display anything to the user on search failure
         * I'd like to discuss the best practice to handle this.
         */
        console.error('error: ', e);
        yield 1;
    }
}

export default function *fetchStockSearch() {
    yield takeEvery(SearchActions.SEARCH_REQUESTED, fetchStockSearchRequest);
}