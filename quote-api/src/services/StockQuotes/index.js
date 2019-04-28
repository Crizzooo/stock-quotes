import axios from 'axios';

class StockQuotes {
	constructor() {
		this.api = "https://api.iextrading.com/1.0";
	}

	async getSymbols() {
		const apiRoute = `${this.api}/ref-data/symbols`;
		const { data: symbols } = await axios.get(apiRoute);
		return symbols;
	}

	async getQuote(symbol) {
		StockQuotes.requireSymbol('symbol');
		const apiRoute = `${this.api}/stock/${symbol}/quote`;
		const { data: quote } = await axios.get(apiRoute);
		return quote;
	}

	// Get Chart Data for Symbol
	// @params
	// symbol - string of equity ticket
	// options (opt)
	//    range - string of available ranges from API: https://iextrading.com/developer/docs/#chart
	//            defaults to 1m chart
	async getChart(symbol, { range = '1m' } = {}) {
		StockQuotes.requireSymbol('symbol');
		const apiRoute = `${this.api}/stock/${symbol}/chart/${range}`;
		const { data: chartData } = await axios.get(apiRoute);
		return chartData;
	}

	static requireSymbol(symbol) {
		if (!symbol || typeof symbol != 'string') {
			throw new Error('Symbol is not defined, or is not a valid string');
		}
	}
}

// export a singleton as there will not be different states throughout the application
export default new StockQuotes();
