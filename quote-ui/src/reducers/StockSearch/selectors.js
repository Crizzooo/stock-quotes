import { createSelector } from 'reselect';

const selectSearchResultCache = (state) => state.stockSearch.resultCache;
const selectSearchValue = (state) => state.stockSearch.searchVal;

const selectSearchResults = createSelector(
    selectSearchValue,
    selectSearchResultCache,
    (searchVal, resultCache) => {
        /* We may still be searching for results for GOOG, but have cached results for GOO
         * Rather than show no data, we should check the cache for previously entered search results
         * to show in the meantime ad create a smoother results experience.
         * This also handles the case where someone searches GOOGLE, which has no appropriate symbols.
         * We could still show the results of GOOGL, which will have a match.
         */
        let cachedData = resultCache[searchVal];
        // If there is nothing in the cache yet, or this string is too specific, lets try shorter versions of the search
        while (!cachedData || !cachedData.length) {
            searchVal = searchVal.slice(0, searchVal.length - 1);
            if (!searchVal.length) return [];
            cachedData = resultCache[searchVal];
        }

        if (!cachedData) return [];

        return cachedData.sort( (row1, row2) => {
            return row1['symbol'] < row2['symbol'] ? -1 : 1;
        });
    }
);

export default {
    resultCache: selectSearchResultCache,
    searchVal: selectSearchValue,
    searchResults: selectSearchResults
};