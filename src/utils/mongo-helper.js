const config = require('config');

const dbBase = 'db';
const connectionParams = ['user', 'password', 'host', 'name'];

module.exports.getConnectionParams = () => {
	return connectionParams.reduce((accumulator, param) => {
		configParam = [dbBase, param].join('.');
		accumulator[param] = config.has(configParam) ? config.get(configParam) : undefined;
		return accumulator;
	}, {});
}