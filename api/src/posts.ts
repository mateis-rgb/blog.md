import { Router } from "express";
import { getAllPosts, getPostById, scanPosts } from "./lib/posts";
import { Post } from "./types";

const posts = Router();

/* This code snippet defines a route handler for a GET request to "/scan" on the posts router. When
this route is accessed, it calls the `scanPosts` function to perform a scan operation. */
posts.get("/scan", (request, response) => {
	const scan: boolean = scanPosts();

	response.setHeader("Content-Type", "application/json");

	if (scan === true) {
		response.status(200).json("[Scan]: OK!");
		
		return;
	}

	response.status(500).json("[Scan]: Not OK!");
});


posts.get("/all", (request, response) => {
	const posts: Post[] = getAllPosts();

	response.setHeader("Content-Type", "application/json");
	response.status(200).json(posts);
});


/* This code snippet defines a route handler for a GET request to "/:id" on the posts router. When this
route is accessed with a specific post ID parameter in the URL, it retrieves the ID from the request
parameters. */
posts.get("/:id", (request, response) => {
	const id: string = request.params.id;

	response.setHeader("Content-Type", "application/json");

	if (id) {
		const post = getPostById(id);

		if (post === null) {			
			response.status(400).json("[ERROR]: Post id not exist");

			return;
		}

		response.status(200).json(post);

		return;
	}

	response.status(500).json("[ERROR]: Internal Server Error");
});


export default posts;