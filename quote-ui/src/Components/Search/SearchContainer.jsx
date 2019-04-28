import React, { useState } from 'react';

import { SearchBar } from '.';

export default function SearchContainer({ onSearchChange }) {
    const [ showResults, setShowResults ] = useState(false);

    return (<div className="search-container">
                <SearchBar 
                    onFocus={ () => setShowResults(true) }
                    onBlur={ () => setShowResults(false) }
                    onChange={ (val) => onSearchChange(val) }
                />
                { showResults &&
                    <div className="search-results">
                        <div className="search-result-row">
                            AAPL
                        </div>
                        <div className="search-result-row">
                            GOOG
                        </div>
                    </div>
                }
            </div>);
}