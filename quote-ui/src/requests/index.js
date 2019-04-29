export function getSearchResults(searchVal) {
    const searchRoute = `/api/stocks/symbols/${searchVal}`;
    return fetch(`${searchRoute}`)
            .then( (res) => res.json() );
}

export function getQuote(symbol) {
    if (!symbol) {
        throw new Error('Symbol String not provided to getQuote!');
    }
    const searchRoute = `/api/stocks/quotes/${symbol}`;
    return fetch(`${searchRoute}`)
            .then( (res) => res.json() )
            .then( ({ error, data }) => {
                if (error) {
                    throw new Error(`Could not fetch ${symbol}`);
                }
                return data;
            });
}