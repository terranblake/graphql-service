const { inspect } = require('util');

module.exports = {
	method: 'GET',
	path: '/process',
	handler: (request, reply) => {
		const query = request.query;
		const _process = Object.keys(query).length > 0
			? { _process: Object.keys(query).map(q => { return { [q]: process[q] }}) }
			: process;

		return inspect(_process, false, 5);
	}
};