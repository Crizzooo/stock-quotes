export function getSearchResults(searchVal) {
    const searchRoute = `/api/stocks/symbols/${searchVal}`;
    return fetch(`${searchRoute}`)
            .then( (res) => res.json() );
}