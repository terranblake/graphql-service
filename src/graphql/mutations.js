const { GraphQLObjectType } = require('graphql');

const MongoGraphQLGenerator = require('../utils/mongo-graphql-generator');
const fieldGenerator = new MongoGraphQLGenerator(__dirname, './mutations', './types', '../models');
const fields = fieldGenerator.mutations();

const Mutations = new GraphQLObjectType({
	name: 'Mutation',
	fields
});

module.exports = Mutations;