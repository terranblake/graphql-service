module.exports = (Model, Type, { GraphQLString }) => ({
	type: Type,
	args: {
		id: { type: GraphQLString },
		name: { type: GraphQLString },
		state: { type: GraphQLString },
		address: { type: GraphQLString },
	},
	resolve(parent, args) {
		return Model
			.findById(args.id)
			.then(foundModel => {
				Object.keys(args).map(k => {
					foundModel[k] = args[k] || foundModel[k];
				});

				console.log({ foundModel });
				return foundModel.save();
			})
			.then(updatedModel => updatedModel)
			.catch(console.error)
	}
});