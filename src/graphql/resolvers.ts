import vault from "vault-api";

const path = "kv/user_service";

const getResolvers = () => {
	return {
		Mutation: {
			write_secret: async (root, param, ctx, info) => {
				let message: string;
				try {
					const old_secrets = await vault({
						method: "read",
						path,
					});
					const { key, value } = param;

					await vault({
						method: "write",
						path,
						data: {
							...old_secrets.data,
							[key]: value,
						},
					});
					message = "Success";
				} catch (e) {
					console.log(e.toJSON());
					message = "Fail";
				}
				return { message };
			},

			delete_secret: async (root, param, ctx, info) => {
				let message: string;
				try {
					const old_secrets = await vault({
						method: "read",
						path,
					});
					delete old_secrets.data[param.key];

					await vault({
						method: "write",
						path,
						data: old_secrets.data,
					});
					message = "Success";
				} catch (e) {
					console.log(e.toJSON());
					message = "Fail";
				}
				return { message };
			},
		},

		Query: {
			get_secrets: async () => {
				const response = await vault({
					method: "read",
					path,
				});

				return JSON.stringify(response.data);
			},
		},
	};
};
export { getResolvers };
