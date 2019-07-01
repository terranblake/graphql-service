const config = require('config');
const Koa = require('koa');
const app = new Koa();
const mount = require('koa-mount');
const graphqlHTTP = require('koa-graphql');

require('./src/utils/mongo');

app.use(async (ctx, next) => {
	await next();
	const rt = ctx.response.get('X-Response-Time');
	console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

app.use(async (ctx, next) => {
	const start = Date.now();
	await next();
	const ms = Date.now() - start;
	ctx.set('X-Response-Time', `${ms}ms`);
});

app.use(mount('/graphql', graphqlHTTP({
	schema: require('./src/graphql/schema'),
	graphiql: true
})));

app.listen(config.get('server.port'));

app.on('error', console.error);