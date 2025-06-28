import { Router } from "express";
import { getAllCategories } from "./lib/posts";
import { getExpectedToken } from "./auth";

const categories = Router();

/* This code snippet defines a route handler for the GET request to the "/all" endpoint on the
categories router. When a GET request is made to this endpoint, the getAllCategories function is
called to retrieve all categories. The response header is set to "Content-Type: application/json" to
indicate that the response will be in JSON format. Finally, a 200 status code is set, and the
categories are sent back as a JSON response using response.json(categories). */
categories.get("/all", (request, response) => {
	const categories = getAllCategories();

	response.setHeader("Content-Type", "application/json");
	response.status(200).json(categories);
});

categories.post("/add", (request, response) => {
	response.setHeader("Content-Type", "application/json");

	if (!request.body.token) {
		response.status(401).json({ message: "Invalid credentials" });

		return;
	}

	const token: string = request.body.token;
	const expected_token: string = getExpectedToken();

	if (token === expected_token) {
		

		response.status(200).json({ message: "Add OK!" });
		
		return;
	}

	response.status(200).json({ message: "Invalid credential" });
});

export default categories;