import { NextApiRequest, NextApiResponse } from "next"

const GET = (request: NextApiRequest, response: NextApiResponse) => {
	return response.status(200).json({ message: "toto" });
} 