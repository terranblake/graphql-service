module.exports = [
	// graphql interface
	{
		plugin: graphiqlHapi,
		options: {
			path: '/graphiql',
			graphiqlOptions: { endpointUrl: 'graphql' },
			route: { cors: true },
		},
	},
	// graphql
	{
		plugin: graphqlHapi,
		options: {
			path: '/graphql',
			graphqlOptions: { schema },
			route: { cors: true },
		},
	}
]