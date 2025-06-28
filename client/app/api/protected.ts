import { generateOrGetSecretKey } from "@/client/app/lib/process"
import { NextApiRequest, NextApiResponse } from "next"
import jwt from "jsonwebtoken"

const SECRET_KEY: string = generateOrGetSecretKey();


const handler = (request: NextApiRequest, response: NextApiResponse) => {
	const token = request.headers.authorization?.split(" ")[1];

	if (!token) {
		return response.status(403).json({ message: "Token is missing" });
	}

	try {
		const decoded = jwt.verify(token, SECRET_KEY);

		return response.status(200).json({ message: 'This is a protected route', user: decoded });
	} 
	catch (error) {
		return response.status(403).json({ message: "Invalid token" });
	}
}

export default handler;
