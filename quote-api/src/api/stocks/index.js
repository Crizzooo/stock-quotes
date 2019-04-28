import express from 'express';
import StockQuotes from '../../services/StockQuotes';
import SymbolCache from '../../services/SymbolCache';

const stocksRouter = express.Router();

stocksRouter.use( (req, res, next) => {
	console.log('hit api/stocks');
	next();
});

stocksRouter.get('/quotes/:symbol', (req, res, next) => {
	// verify is symbol
	// handle if not in symbol cache

	// visit cache and grab symbol
	// if not in cache, call getSymbol
	// add to cache, send
	next();
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
