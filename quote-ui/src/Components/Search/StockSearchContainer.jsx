import React, { useState } from 'react';

import { SearchBar } from '.';
import './Search.css';

export default function StockSearchContainer({ onSearchChange, results, onResultClick, searchVal }) {
    const [ showResults, setShowResults ] = useState(false);

    let displayResults = showResults;
    /* Require at least 2 characters before displaying the results bar
     * As a UX ehanncement, we may also want to display a different message 
     * informing the user to insert at least 2 characters.
     */
    if (!results.length && searchVal.length <  2) {
        displayResults = false;
    }

    return (<div className="search-container">
                <SearchBar 
                    onFocus={ () => setShowResults(true) }
                    onBlur={ () => setShowResults(false) }
                    onChange={ (val) => onSearchChange(val) }
                />
                { displayResults &&
                    <div className="search-results">
                       { results && results.map( (company) => {
                            let { symbol } = company;
                            return (<SearchResult company={company} key={symbol} onResultClick={ onResultClick } />)
                       })}
                       {
                           ( !results || !results.length ) &&
                           <i className="search-result-row">
                               No results found!
                           </i>
                       }
                    </div>
                }
            </div>);
}

function SearchResult({ company, onResultClick }) {
    let { symbol, name } = company;
    return (<div className="search-result-row" title={name} onClick={ () => {
        onResultClick(symbol) }
    }>
        <div className="search-result-symbol">{ symbol }</div>
        <div className="search-result-name"><i>{ name }</i></div>
    </div>);
}