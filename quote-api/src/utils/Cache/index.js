// Cache class is a wrapper around the Javascript Map class
// - It supports the ability to clear entities from the cache after a set interval
class Cache {
	constructor() {
		this.cache = new Map();
	}

	has(key) {
		return this.cache.has(key);
	}

	get(key) {
		return this.cache.get(key);
	}

	getAll() {
		return this.entries();
	}

	add( { key, val } = {}, { shouldClear = true, clearTimeout = 5000 } = {}) {
		this.set(key, val);
		if (shouldClear) {
			setTimeout( () => {
				this.delete(key);
			}, clearTimeout);
		}
	}

	addAll(entities = [], options = {}) {
		entities.forEach( (entity) => {
			this.add(entity, options);
		});
	}

	delete(key) {
		return this.cache.delete(key);
	}

	clear() {
		this.cache.clear();
	}

	entries() {
		return Array.from(this.cache.entries());
	}

	forEach(callback, thisArg) {
		this.cache.forEach(callback, thisArg);
	}

	keys() {
		return Array.from(this.cache.keys());
	}

	set(key, val) {
		this.cache.set(key, val);
	}

	values() {
		return Array.from(this.cache.values());
	}
}

export default Cache;
