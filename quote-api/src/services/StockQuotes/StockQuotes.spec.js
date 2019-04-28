import StockQuotes from '.';

StockQuotes.getSymbols()
	.then( (symbols) => {
		console.log('symbols: ', symbols.length);
	})
	.catch( err => console.error(err) );

StockQuotes.getQuote('AAPL')
	.then((quote) => {
		console.log('Quote: ', quote);
	})
	.catch( err => console.error(err) );

StockQuotes.getChart('AAPL')
	.then( (quote) => {
		console.log('Sample Chart data: ', quote[0]);
	})
	.catch( err => console.error(err) );