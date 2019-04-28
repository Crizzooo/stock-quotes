import StockQuotes from '../StockQuotes';
import Cache from '../../utils/Cache';
import SearchTree from '../../utils/SearchTree';

class SymbolCache {
	constructor() {
		this.cache = new Cache();
		this.symbolTree = null;
		this.companyTree = null;
	}

	async init() {
		let symbols;

		try {
			symbols = await StockQuotes.getSymbols();
		} catch (e) {
			console.error('Could not receive symbols from API!');
			throw e;
		}

		// add stock data to a cache by ticker and payload
		// As of now, we are not going to clear this cache ever. Its refreshed on server load,
		// but if it was a real application, maybe we would want to refresh once a day from a script
		symbols.forEach( (payload) => {
			const { symbol } = payload;
			this.cache.add({ key: symbol, val: payload }, { shouldClear: false });
		});

		this.symbolTree = new SearchTree(symbols, 'symbol');
		this.companyTree = new SearchTree(symbols, 'name');
	}

	getAllSymbols() {
		return this.cache.getAll();
	}

	find(searchTerm) {
		// If we have nothing to search by, just return all of the data in the cache
		// rather than needlessly recursing the search trees
		if (!searchTerm) {
			return Array.from(this.cache.values());
		}

		const foundSymbols = this.symbolTree.find(searchTerm);
		const foundCompanies = this.companyTree.find(searchTerm);

		// As we do not change any object references in our creation of the search tree
		// We can remove duplicates by converting to a set
		// There may be some performance considerations worth discussing here if given more time
		return Array.from(new Set([ ...foundSymbols, ...foundCompanies ]));
	}
}

/* By current requirements, there should only be one SymbolCache in the app
 * so let's use a singleton
 */
export default new SymbolCache();
