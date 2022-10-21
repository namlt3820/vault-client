import { gql } from "apollo-server";

const typeDefs = gql`
	scalar JSON

	type Query {
		get_secrets: JSON
	}

	type CommonResponse {
		message: String!
	}

	type Mutation {
		write_secret(key: String!, value: String!): CommonResponse
		delete_secret(key: String!): CommonResponse
	}
`;

export { typeDefs };
