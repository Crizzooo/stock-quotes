import React, { Component } from 'react';
import { connect } from 'react-redux';

import './css/index.css';
import './App.css';

import { StockSearch } from './Components/Search';
import StockSearchSelectors from './reducers/StockSearch/selectors';
import { startStockSearchRequest } from './reducers/StockSearch/reducer';

class App extends Component {

  onSearchChange(value) {
    this.props.startStockSearch(value);
  }

  render() {
    let { searchResults } = this.props;
    return (
      <div className="App">
        <StockSearch 
          results={searchResults}
          onSearchChange={ (val) => this.onSearchChange(val) }
          />
      </div>
    );
  }
}

function mapState(state) {
  return {
    searchResults: StockSearchSelectors.searchResults(state)
  };
}

function mapDispatch(dispatch) {
  return {
    startStockSearch: (val) => dispatch(startStockSearchRequest(val))
  }
}

export default connect(mapState, mapDispatch)(App);
