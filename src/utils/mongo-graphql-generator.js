const { join, resolve } = require('path');
const graphql = require('graphql');
const { readdirSync, lstatSync } = require('fs');

const isDirectory = (source) => lstatSync(source).isDirectory();

const getDirectories = (source) => readdirSync(source)
	.map((name) => join(source, name))
	.filter(isDirectory);
	
const getFiles = (source) => readdirSync(source)
	.map((name) => join(source, name))
	.filter(f => !isDirectory(f));

class MongoGraphQLGenerator {
	constructor(currentDirectory, mutationsDirectory, typesDirectory, modelsDirectory) {
		this.currentDirectory = currentDirectory;
		this.mutationsDirectory = mutationsDirectory;
		this.typesDirectory = typesDirectory;
		this.modelsDirectory = modelsDirectory;

		this.absoluteMutationsPath = resolve(this.currentDirectory, this.mutationsDirectory);
		this.absoluteTypesPath = resolve(this.currentDirectory, this.typesDirectory);
		this.absoluteModelsPath = resolve(this.currentDirectory, this.modelsDirectory);

		this.mutationFolders = getDirectories(this.absoluteMutationsPath)
			.map(f => f.split('/')
				.pop());

		this.modelsLoaded = {};
		getFiles(this.absoluteModelsPath)
			.filter(f => require(f).modelName)
			.forEach(f => this.modelsLoaded[require(f).modelName] = f);

		this.typesLoaded = {};
		getFiles(this.absoluteTypesPath)
			.filter(f => Object.keys(this.modelsLoaded).includes(f.split('/').pop().split('.')[0]))
			.forEach(f => this.typesLoaded[f.split('/').pop().split('.')[0]] = f);

		this.modelMutationsToLoad = {};
		this.mutationFolders
			.filter(f => Object.keys(this.modelsLoaded).includes(f))
			.map(m => this.modelMutationsToLoad[m] = getFiles(`${this.absoluteMutationsPath}/${m}`));

		console.log(this);
	}

	mutations() {
		this.mutations = {};
		Object.keys(this.modelMutationsToLoad).map(m =>
			this.modelMutationsToLoad[m].forEach(v =>
				this.mutations[v.split('/').pop().split('.')[0]] =
					require(v)(
						require(this.modelsLoaded[m]),
						require(this.typesLoaded[m]),
						graphql
					)
			));

		console.log({ mutations: this.mutations });
		return this.mutations;
	}
}

module.exports = MongoGraphQLGenerator;