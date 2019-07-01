module.exports = (Model, Type, { GraphQLString }) => ({
	type: Type,
	args: {
		id: { type: GraphQLString },
		name: { type: GraphQLString },
		sic: { type: GraphQLString },
		ticker: { type: GraphQLString },
		cik: { type: GraphQLString },
		exchange: { type: GraphQLString },
		state: { type: GraphQLString },
		address: { type: GraphQLString },
	},
	resolve(parent, args) {
		return Model
			.findOneAndDelete({ _id: args.id })
			.exec()
			.then(foundModel => foundModel.remove())
			.then(removedModel => removedModel)
			.catch(console.error)
	}
});