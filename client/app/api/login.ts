import { findRow, generateOrGetSecretKey, getEnvContent, hashVerify, rowExists } from "@/client/app/lib/process"
import { EnvRow } from "@/client/app/types"
import { NextApiRequest, NextApiResponse } from "next"
import jwt from "jsonwebtoken"
import Cors from "cors"
import Joi from "joi"
import { runMiddleware } from "@/client/app/lib/auth"

const cors = Cors({
	methods: ["POST"],
	origin: "http://localhost:3000"
});

const SECRET_KEY: string = generateOrGetSecretKey();

const scheme = Joi.object({
	username: Joi.string().required(),
	password: Joi.string().min(6).required()
});


/**
 * The function handles a POST request, validates credentials, generates a JWT token for
 * authentication, and returns appropriate responses based on the request.
 * @param {NextApiRequest} request - The `request` parameter in your code snippet represents the
 * incoming HTTP request in a Next.js API route. It contains information about the request such as
 * headers, body, method, and query parameters. You can access properties like `request.method` to
 * determine the HTTP method used (e.g., GET,
 * @param {NextApiResponse} response - The `response` parameter in the code snippet refers to the
 * Next.js `NextApiResponse` object. This object represents the HTTP response that will be sent back to
 * the client from the API route. It provides methods and properties to set headers, status codes, and
 * send data back to the client.
 * @returns If the request method is "POST" and the credentials provided in the request body match the
 * admin username and password stored in the environment variables, a JWT token is generated and
 * returned with a status code of 200. If the credentials do not match or are missing, a status code of
 * 401 with a message "Invalid credentials" is returned. If the request method is not "POST", a status
 */
const handler = async (request: NextApiRequest, response: NextApiResponse) => {
	await runMiddleware(request, response, cors);

	if (request.method === "POST") {
		const { error } = scheme.validate(request.body);

		if (error) {
			return response.status(400).json({ message: error.details[0].message });
		}

		const { username, password } = request.body;
		
		const env: EnvRow[] = getEnvContent();

		if (rowExists(env, "ADMIN_USERNAME") && rowExists(env, "ADMIN_PASSWORD")) {
			const env_email: string = findRow(env, "ADMIN_USERNAME").value;
			const env_password: string = findRow(env, "ADMIN_PASSWORD").value;
			
			if (username === env_email && hashVerify(password, env_password)) {
				const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });

				return response.status(200).json(token);
			}
		}

		return response.status(401).json({ message: "Invalid credentials" });
	}

	response.setHeader("Allow", ["POST"]);
	response.status(405).end(`Method ${request.method} Not Allowed`);
}

export default handler;