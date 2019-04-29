import Cache from '../../utils/Cache';
import { QUOTE_DATA_CACHE_TIME } from '../../config';

class QuoteDataCache {
	constructor() {
		this.cache = new Cache();
	}

	getCachedData(symbol) {
		const key = QuoteDataCache.normalizeCacheKey(symbol);
		if (this.cache.has(key)) {
			return this.cache.get(key);
		}
		return null;
	}

	addData(symbol, data) {
		const key = QuoteDataCache.normalizeCacheKey(symbol);
		this.cache.add(
			{ key, val: data },
			{ shouldClear: true, clearTimeout: QUOTE_DATA_CACHE_TIME },
		);
	}

	static normalizeCacheKey(symbol) {
		return symbol.toUpperCase();
	}
}

// This should only be used in our quote route
// so a singleton is fine for now
export default new QuoteDataCache();
