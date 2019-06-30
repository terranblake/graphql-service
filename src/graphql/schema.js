const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLSchema
} = require('graphql');

const CompanyType = require('./CompanyType');

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		companies: {
			type: CompanyType,
			args: { id: { type: GraphQLString } },
			resolve(parent, args) {
				// logic for serving data
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery
});