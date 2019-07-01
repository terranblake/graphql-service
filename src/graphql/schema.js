const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLSchema
} = require('graphql');

const CompanyType = require('./types/Company');
const Company = require('../models/companies');

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		company: {
			type: CompanyType,
			args: { id: { type: GraphQLString } },
			resolve(parent, args) {
				return Company.findById(args.id);
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: require('./mutations'),
});