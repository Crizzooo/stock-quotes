import React, { Component } from 'react';

import './App.css';

class App extends Component {

  componentDidMount() {
    console.log('fetching API test');
    fetch('/api').then( (res) => res.text() ).then(console.log);
  }

  render() {
    return (
      <div className="App">
        Welcome to Stock Picker
      </div>
    );
  }
}

export default App;
