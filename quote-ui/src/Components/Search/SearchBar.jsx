import React, { useState } from 'react';

const searchStyle = {
    minHeight: '20px',
    borderRadius: '5px 5px 0px 0px',
    border: '1px solid grey',
    padding: '3px',
    paddingLeft: '5px',
    flex: '1'
};

export default function SearchBar({ onFocus, onBlur, onChange }) {
    const [ searchVal, setSearchVal ] = useState('');

    return (
        <div className="row search-row">
            <input type="text" 
                   style={searchStyle}
                   placeholder="Search for a Stock by Company or Symbol"
                   value={searchVal} 
                   onChange={ (e) => handleChange(e.target.value) } 
                   onFocus={ () => onFocus() }
                   onBlur={ () => { 
                       /* onBlur is also fired when we click a search result row
                        * Which hides the search results and the click is never registered.
                        * This is a temporary hacky fix, to give any click handlers  time
                        * to process their clicks before the input is hidden.
                        * There is probably a better way to have designed the hiding of the
                        * dropdown results if given more time for development.
                        */
                       setTimeout( () => onBlur(), 250 ) 
                    }
                   }
                   />
        </div> 
    );

    function handleChange(val) {
        setSearchVal(val);
        if (onChange) {
            onChange(val);
        }
    }
}