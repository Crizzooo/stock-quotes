import express from 'express';
import StockQuotes from '../../services/StockQuotes';
import SymbolCache from '../../services/SymbolCache';

const stocksRouter = express.Router();

stocksRouter.get('/quotes/:symbol', async (req, res) => {
	const { symbol } = req.params;
	const match = SymbolCache.findSymbol(symbol);

	/* If it's not in our cache ( which should be updated with IEX )
	 * we can skip the API Call and tell the frontend we could not find it.
	 */
	if (!match) {
		res.send({
			data: null,
			error: {
				message: `${symbol} could not be found!`,
			},
		});
		return;
	}

	try {
		const [ quoteData, chartData ] = await Promise.all( [
			StockQuotes.getQuote(symbol),
			StockQuotes.getChart(symbol)
		]);

		res.send({
			data: {
				quote: quoteData,
				chart: chartData,
			},
		});
	} catch (e) {
		// In a production evironment, we would want to do more than log this error to the console
		console.error('Error occurred when requesting quote data.');
		console.error(e);
		res.send({
			data: null,
			error: {
				message: 'An error occurred while requesting quote data'
			}
		});
	}
});

stocksRouter.get('/symbols/:searchString', (req, res, next) => {
	try {
		// search symbol cache by company or symbol
		const searchTerm = req.params.searchString;
		const results = SymbolCache.find(searchTerm);
		res.send(results);
	} catch (e) {
		next(e);
	}
});

stocksRouter.get('/symbols', (req, res, next) => {
	try {
		const symbols = SymbolCache.getAllSymbols();
		res.send(symbols);
	} catch (e) {
		next(e);
	}
});

stocksRouter.get('/', (req, res) => {
	// We could enhance this to send back the list of available routes
	res.send(`You've hit the Stocks API Entry Point!`);
});

export default stocksRouter;
