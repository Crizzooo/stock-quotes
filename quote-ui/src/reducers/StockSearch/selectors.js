import { createSelector } from 'reselect';

const selectSearchResultCache = (state) => state.stockSearch.resultCache;
const selectSearchValue = (state) => state.stockSearch.searchVal;

const selectSearchResults = createSelector(
    selectSearchValue,
    selectSearchResultCache,
    (searchVal, resultCache) => {
        if (!resultCache[searchVal]) return [];
        return resultCache[searchVal].sort( (row1, row2) => {
            return row1['symbol'] < row2['symbol'] ? -1 : 1;
        });
    }
);

export default {
    resultCache: selectSearchResultCache,
    searchVal: selectSearchValue,
    searchResults: selectSearchResults
};