const config = require('config');
const hapi = require('hapi');
const mongoose = require('mongoose');

const { graphqlHapi, graphiqlHapi } = require('apollo-server-hapi');
const schema = require('./src/graphql/schema');

const { getConnectionParams } = require('./src/utils/mongo-helper');
const { user, password, host, name } = getConnectionParams();

const server = hapi.server({
	port: config.get('api.port'),
	host: 'localhost'
});

const creds = `${user}:${password}@`;
const connection = `mongodb://${password ? creds : ''}${host}/${name}`;

mongoose.connect(connection);
mongoose.connection.once('open', () => {
	const { host, port, name } = mongoose.connection;
	console.log(`mongodb running at\t${host}:${port}/${name}`);
});

const init = async () => {
	console.log({ env: process.env });

	// register hapi graphql plugins
	await server.register(require('./src/hapi-plugins/graphql'));

	server.route(require('./src/routes/process'));
	server.route(require('./src/routes/companies'));

	await server.start();
	console.log(`server running at\t${server.info.uri}`);
}

init();