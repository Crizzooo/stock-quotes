import React, { useState } from 'react';

const searchStyle = {
    minHeight: '20px',
    borderRadius: '5px 0px 0px 0px',
    border: '1px solid grey',
    padding: '3px',
    paddingLeft: '5px',
    flex: '1'
};

const buttonStyle = {
    display: 'flex',
    background: 'blue',
    borderRadius: '0px 5px 0px 0px',
    alignItems: 'center',
    padding: '5px',
    color: 'white',
    cursor: 'pointer'
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
                   onBlur={ () => onBlur() }
                   />
            <div style={buttonStyle}>
                Search
            </div>
        </div> 
    );

    function handleChange(val) {
        setSearchVal(val);
        if (onChange) {
            onChange(val);
        }
    }
}