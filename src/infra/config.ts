import { config } from "dotenv";
import path from "path";

/**
 * .env
 */
const envFilePath = path.join(
	__dirname,
	`../../env/.env.${process.env.NODE_ENV}`
);
console.log({ envFilePath });
config({ path: envFilePath });

["NODE_ENV", "GRAPHQL_PORT", "VAULT_ADDR", "VAULT_TOKEN"].forEach((el) => {
	if (!process.env[el]) {
		throw new Error(`${el} is required`);
	}
});

export const { NODE_ENV, GRAPHQL_PORT, VAULT_ADDR, VAULT_TOKEN } = process.env;
