import React, { useState } from 'react';

import { SearchBar } from '.';

export default function StockSearchContainer({ onSearchChange, results }) {
    const [ showResults, setShowResults ] = useState(false);

    let displayResults = showResults;
    if (!results.length) {
        displayResults = false;
    }

    // TODO - we could add a hook that when you hit enter
    // it will automatically load the current search value

    return (<div className="search-container">
                <SearchBar 
                    onFocus={ () => setShowResults(true) }
                    onBlur={ () => setShowResults(true) }
                    onChange={ (val) => onSearchChange(val) }
                />
                { displayResults &&
                    <div className="search-results">
                       { results && results.map( (company) => <SearchResult company={company} key={company.symbol} /> )}
                    </div>
                }
            </div>);
}

function SearchResult({ company }) {
    let { symbol, name } = company;
    return (<div className="search-result-row" title={name}>
        <div className="search-result-symbol">{ symbol }</div>
        <div className="search-result-name"><i>{ name }</i></div>
    </div>);
}