import React, { Component } from 'react';

import './css/index.css';
import './App.css';

import { SearchContainer } from './Components/Search';

class App extends Component {

  componentDidMount() {
    console.log('fetching API test');
    fetch('/api').then( (res) => res.text() ).then(console.log);
  }

  onSearchChange(value) {
    console.log('new value: ', value);
  }

  render() {
    return (
      <div className="App">
        <SearchContainer onSearchChange={ (val) => this.onSearchChange(val) }/>
      </div>
    );
  }
}

export default App;
