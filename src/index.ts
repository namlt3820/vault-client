import {
	ApolloServerPluginLandingPageGraphQLPlayground,
	ApolloServerPluginLandingPageDisabled,
} from "apollo-server-core";
import { ApolloServer } from "apollo-server";
import { typeDefs } from "./graphql/typeDefs";
import { getResolvers } from "./graphql/resolvers";
import { GRAPHQL_PORT } from "./infra/config";

const initApolloServer = async () => {
	try {
		const server = new ApolloServer({
			typeDefs,
			resolvers: getResolvers(),
			debug: true,
			plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
			context: (req) => req,
		});

		const { url } = await server.listen({ port: GRAPHQL_PORT });
		console.log(`🚀 Apollo server ready at ${url}`);
	} catch (e) {
		throw e;
	}
};

const start = async () => {
	try {
		await Promise.all([initApolloServer()]);
	} catch (e) {
		throw e;
	}
};
start();
