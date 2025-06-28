import { Router } from "express"
import { findRow, getEnvContent, hash, hashVerify, rowExists } from "./process";
import { EnvRow } from "./types";

export const getExpectedToken = (): string => {
	const env: EnvRow[] = getEnvContent();

	const env_email: string = findRow(env, "ADMIN_USERNAME").value;
	const env_password: string = findRow(env, "ADMIN_PASSWORD").value;

	const expected_token: string = hash(env_email + "_" + env_password);

	return expected_token;
}

const auth = Router();

/* The `auth.get("/", (request, response) => { ... })` function is handling a GET request to the root
endpoint ("/"). Here's a breakdown of what it's doing: */
auth.get("/", (request, response) => {
	const env: EnvRow[] = getEnvContent();

	response.setHeader("Content-Type", "application/json");

	if (rowExists(env, "ADMIN_USERNAME") && rowExists(env, "ADMIN_PASSWORD")) {
		response.status(200).json("Admin is defined!");
	}

	response.status(404).json("Admin is not defined!");
});


auth.post("/verify", (request, response) => {
	response.setHeader("Content-Type", "application/json");

	if (!request.body.token) {
		response.status(401).json({ message: "Invalid credentials" });

		return;
	}

	const token: string = request.body.token;
	const expected_token: string = getExpectedToken();

	if (token === expected_token) {
		response.status(200).json({ message: "Token is good" });
		
		return;
	}

	response.status(200).json({ message: "Invalid credential" });
});


/* The `auth.post("/login", (request, response) => { ... })` function is handling the POST request to
the "/login" endpoint. Here's a breakdown of what it's doing: */
auth.post("/login", (request, response) => {
	response.setHeader("Content-Type", "application/json");

	if (!request.body.username && !request.body.password) {
		response.status(401).json({ message: "Invalid credentials" });

		return;
	}

	const env: EnvRow[] = getEnvContent();

	const email: string = request.body.username;
	const password: string = request.body.password;

	if (rowExists(env, "ADMIN_USERNAME") && rowExists(env, "ADMIN_PASSWORD")) {
		const env_email: string = findRow(env, "ADMIN_USERNAME").value;
		const env_password: string = findRow(env, "ADMIN_PASSWORD").value;

		if (env_email === email && hashVerify(password, env_password)) {
			response.status(200).json({ token: hash(env_email + "_" + env_password) });
			
			return;
		}
	}

	response.status(401).json({ message: "Invalid credentials" });
});


export default auth;