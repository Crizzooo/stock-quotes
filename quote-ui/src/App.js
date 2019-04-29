import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router';

import './css/index.css';
import './App.css';

import Header from './Components/Header';
import Quote from './Components/Quote';

class App extends Component {

  render() {
    return (
      <div className="App">
            <Route path="/" component={Header} />
            <Route path="/quotes/:symbol" component={Quote} />
      </div>
    );
  }
}

function mapState(state) {
  return {

  };
}

function mapDispatch(dispatch) {
  return {

  }
}

export default connect(mapState, mapDispatch)(App);
