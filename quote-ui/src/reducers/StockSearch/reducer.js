import StockActions from './actions';

export const startStockSearchRequest = (searchVal) => {
    return {
        type: StockActions.SEARCH_REQUESTED,
        payload: searchVal
    };
}

export const updateStockSearchResults = (searchVal, results) => {
    return  {
        type: StockActions.UPDATE_SEARCH_RESULTS,
        payload: {
            searchVal,
            results
        }
    };
}

export const updateSearchValue = (searchVal) => {
    return {
        type: StockActions.UPDATE_SEARCH_VALUE,
        payload: searchVal
    }
}

const initialState = {
    resultCache: {

    },
    searchVal: ''
};
    
export default (state = initialState, action) => {
    let newState = { ...state };

    switch (action.type) {

        case StockActions.UPDATE_SEARCH_VALUE: {
            let { payload: searchVal } = action;
            newState.searchVal = searchVal.toUpperCase();
            return newState;
        }

        case StockActions.UPDATE_SEARCH_RESULTS: {
            let { searchVal, results } = action.payload;
            newState.resultCache = { ...newState.resultCache };
            newState.resultCache[searchVal.toUpperCase()] = results;
            return newState;
        }

        default: {
            return newState;
        }
    }
}