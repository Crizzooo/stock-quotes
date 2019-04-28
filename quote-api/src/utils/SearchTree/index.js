
export class SearchNode {
	constructor() {
		this.children = {};
		this.values = [];
	}

	addKey(key, row) {
		const characters = key.split('');
		let current = this;
		characters.forEach( (char) => {
			if (!current.children[char]) {
				current.children[char] = new SearchNode();
			}
			current = current.children[char];
		});
		current.values.push(row);
	}

	find(searchTerm) {
		// given a search term, i.e 'AA', we should return all matches
		// for 'AA' exactly, as well as any children with more characters
		// for each character in the term, we will visit the appropriate node
		// when there are no more characters, we will retur that node's values, as
		// well as the values of any further nested search strings
		const characters = searchTerm.split('');

		/* If we converted to a For Loop we could completely exit early
		 * rather than waiting to reduce all characters
		 */
		const startNode = characters.reduce( (node, character) => {
			if (!node) return null;
			const nextNode = node.children[character];
			return nextNode;
		}, this);

		// if the search term isnt in the tree, return no values
		if (!startNode) return [];

		return startNode.getAllChildren();
	}

	getAllChildren() {
		let values = [ ...this.values ];

		Object.keys(this.children).forEach( (key) => {
			values = [ ...values, ...this.children[key].getAllChildren() ];
		});

		return values;
	}
}


export default class SearchTree {
	constructor(data, cacheKeyProperty, options = {}) {
		const { normalizeCase = true } = options;
		this.normalizeCase = normalizeCase;
		this.tree = SearchTree.makeTree(data, cacheKeyProperty, options);
	}

	find(searchTerm) {
		let finalSearchTerm = searchTerm;
		if (this.normalizeCase) {
			finalSearchTerm = searchTerm.toUpperCase();
		}
		return this.tree.find(finalSearchTerm);
	}

	static makeTree(data, cacheKeyProperty, options = {}) {

		this.tree = data.reduce( (tree, row) => {
			let key = row[cacheKeyProperty];
			if (options.normalizeCase) {
				key = key.toUpperCase();
			}
			tree.addKey(key, row);
			return tree;
		}, new SearchNode());

		return this.tree;
	}
}
