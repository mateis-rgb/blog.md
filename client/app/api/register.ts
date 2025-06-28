import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import Cors from 'cors'
import Joi from 'joi'
import { generateOrGetSecretKey, getEnvContent, hash, rowExists, setEnvContent } from '@/client/app/lib/process'
import { runMiddleware } from '@/client/app/lib/auth'
import { EnvRow } from '@/client/app/types'

const cors = Cors({
	methods: ['POST'],
	origin: 'http://localhost:3000',
});

const SECRET_KEY = generateOrGetSecretKey();

const schema = Joi.object({
	username: Joi.string().required(),
	password: Joi.string().min(6).required(),
});


/**
 * The function is a handler for a POST request that validates input, generates a JWT token, and
 * returns it in the response.
 * @param {NextApiRequest} request - The `request` parameter in the code snippet refers to the incoming
 * HTTP request in a Next.js API route. It contains information about the request such as headers,
 * body, method, and query parameters. In this handler function, it is being used to access the request
 * method (`request.method`) and request
 * @param {NextApiResponse} response - The `response` parameter in the code snippet refers to the
 * Next.js `NextApiResponse` object. This object represents the HTTP response that will be sent back to
 * the client from the API route. It provides methods and properties to set headers, status codes, and
 * send data back to the client in various
 * @returns If the request method is 'POST' and the request body passes validation, a JWT token is
 * generated and returned with a status of 201. If the request method is not 'POST', a status of 405
 * with an error message indicating the method not allowed is returned.
 */
const handler = async (request: NextApiRequest, response: NextApiResponse) => {
	await runMiddleware(request, response, cors);

	if (request.method === 'POST') {
		const { error } = schema.validate(request.body);

		if (error) {
			return response.status(400).json({ message: error.details[0].message });
		}

		const { username, password } = request.body;
		const env: EnvRow[] = getEnvContent();

		if (rowExists(env, "ADMIN_USERNAME") || rowExists(env, "ADMIN_PASSWORD")) {
			return response.status(401).json({ message: "Unauthorized route" });
		}
		
		env.push({
			key: "ADMIN_USERNAME",
			value: username
		});

		env.push({
			key: "ADMIN_PASSWORD",
			value: hash(password)
		});

		setEnvContent(env);

		const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });

		return response.status(201).json({ token });
	}

	response.setHeader('Allow', ['POST']);
	response.status(405).end(`Method ${request.method} Not Allowed`);
}

export default handler;
