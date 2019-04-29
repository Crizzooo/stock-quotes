import React, { Component } from 'react';
import { connect } from 'react-redux';

import { StockSearch } from '../Search';
import StockSearchSelectors from '../../reducers/StockSearch/selectors';
import { startStockSearchRequest } from '../../reducers/StockSearch/reducer';

class Header extends Component {

  onSearchChange(value) {
    this.props.startStockSearch(value);
  }

  onSearchEnter(symbol) {
      this.props.history.push(`/quotes/${symbol}`);
  }

  render() {
    let { searchResults, searchVal } = this.props;
    return (
        <div id="header">
          <h1>Quote Finder</h1>
          <StockSearch 
            results={searchResults}
            onSearchChange={ (val) => this.onSearchChange(val) }
            onResultClick={  (val) => this.onSearchEnter(val) }
            searchVal={ searchVal }
            />
        </div>
    );
  }
}

function mapState(state) {
  return {
    searchResults: StockSearchSelectors.searchResults(state),
    searchVal: StockSearchSelectors.searchVal(state)
  };
}

function mapDispatch(dispatch) {
  return {
    startStockSearch: (val) => dispatch(startStockSearchRequest(val))
  }
}

export default connect(mapState, mapDispatch)(Header);
