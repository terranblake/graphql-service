const {
	GraphQLObjectType,
	GraphQLString,
} = require('graphql');

const CompanyType = new GraphQLObjectType({
	name: 'Company',
	fields: () => ({
		name: { type: GraphQLString },
		sic: { type: GraphQLString },
		ticker: { type: GraphQLString },
		cik: { type: GraphQLString },
		exchange: { type: GraphQLString },
		state: { type: GraphQLString },
		address: { type: GraphQLString },
	})
});

module.exports = CompanyType;