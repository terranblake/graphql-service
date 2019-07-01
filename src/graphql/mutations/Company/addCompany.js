module.exports = (Model, Type, { GraphQLString }) => ({
	type: Type,
		args: {
		name: { type: GraphQLString },
		sic: { type: GraphQLString },
		ticker: { type: GraphQLString },
		cik: { type: GraphQLString },
		exchange: { type: GraphQLString },
		state: { type: GraphQLString },
		address: { type: GraphQLString },
	},
	resolve(parent, args) {
		const newCompany = new Model(args);
		return newCompany.save();
	}
});