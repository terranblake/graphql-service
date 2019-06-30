const Company = require('../models/companies');

module.exports = [{
	method: 'GET',
	path: `/companies`,
	handler: (_request, _reply) => {
		return Company.find();
	}
}];