import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getQuote } from '../../requests';
import QuoteInfo from './QuoteInfo';
import QuoteChart from './QuoteChart';

import './quotes.css';

class SymbolQuote extends Component {

    constructor(props) {
        super();
        
        this.initialState = {
            symbol: '',
            loading: false,
            quote: null,
            chart: null,
            error: null
        };

        this.state = {
            ...this.initialState
        };
    }

    componentDidMount() {
        this.loadSymbol();
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params['symbol'] === prevProps.match.params['symbol']) {
            return false;
        }
        this.loadSymbol();
    }

    async loadSymbol() {
        let { symbol } = this.props.match.params;
        this.setState({ ...this.initialState, symbol, loading: true });
        try {
            let { quote, chart } = await getQuote(symbol);
            this.setState({
                loading: false,
                quote,
                chart,
                error: null
            });
        } catch (e) {
            this.setState({
                loading: false,
                error: e
            });
            console.error(e);
        }
    }

    render() {
        let { loading, error, quote, chart } = this.state;
        let { symbol } = this.props.match.params;
        return (
            <div id="quote-display">
                <h1 id="quote-header">Quote</h1>
                { loading &&
                    <span>Loading...</span>
                }
                {
                    error &&
                    <span>Error fetching data for {symbol} or {symbol} is not supported.</span>
                }
                {
                    quote && <QuoteInfo quote={quote} />
                }
                {
                    chart && <QuoteChart data={chart} />
                }
            </div>
        );
    }
}

function mapState(state) {
  return {};
}

function mapDispatch(dispatch) {
  return {};
}

export default connect(mapState, mapDispatch)(SymbolQuote);
