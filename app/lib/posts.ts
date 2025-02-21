import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { Category, Post, postJSONFile } from "../types"
import { v4 as uuid } from "uuid"
// import { marked } from "marked"

export const dynamic = "force-static";

const postsDirectory = path.join(path.resolve(), "app/content/posts");
const JSONFilePath = path.join(path.resolve(), "app/content/posts.json");

/**
 * The function `getJSON` reads a JSON file and returns its contents as an object with categories and posts arrays, or empty arrays if the file is empty.
 * 
 * @returns The `getJSON` function returns an object that contains either an empty array for categories and posts if the `allPostsJSONed` string is empty, or it parses the `allPostsJSONed` string into a JavaScript object.
 */
const getJSON = (): postJSONFile => {
	const allPostsJSONed: string = fs.readFileSync(JSONFilePath, "utf-8");

	return allPostsJSONed.length < 1 
		? { categories: [], posts: [] } 
		: JSON.parse(allPostsJSONed);
}

/**
 * @brief The function `scanPosts` reads and processes post files to update a JSON file with post data and categories.
 * 
 * @returns { boolean } It returns `true` if the scanning and processing of posts is successful, and it returns `false` if there are no filenames in the posts directory.
 */
export const scanPosts = (): boolean => {
	const filenames: string[] = fs.readdirSync(postsDirectory);
	const { posts, categories }: postJSONFile = getJSON();

	const newAllPosts: postJSONFile = {
		categories: categories,
		posts: posts
	}

	if (filenames.length === 0) return false;

	filenames.forEach((filename: string) => {
		const filePath: string = path.join(postsDirectory, filename);
		const fileContents: string = fs.readFileSync(filePath, "utf-8");
		const { data } = matter(fileContents);

		if (data.categories) {
			const tmpCat: string[] = data.categories;

			tmpCat.forEach((cat: string) => {
				if (!newAllPosts.categories.includes(cat)) {
					newAllPosts.categories.push(cat);
				}
			});
		}

		const newPost: Post = {
			id: uuid(),
			path: filePath,
			attributes: {
				title: data.title,
				date: data.date,
				categories: data.categories,
				description: data.description
			}
		}

		if (newAllPosts.posts.length === 0) {
			newAllPosts.posts.push(newPost)
		}

		newAllPosts.posts.forEach((post: Post) => {
			if (post.path !== filePath) {
				newAllPosts.posts.push(newPost);
			}
		});
	});

	fs.writeFileSync(JSONFilePath, JSON.stringify(newAllPosts), "utf-8");

	return true;
}


/**
 * This TypeScript function retrieves a post by its ID, reads its content from a file, processes it
 * into HTML, and returns the post with the HTML content.
 * @param {string} id - The `id` parameter is a string representing the unique identifier of the post
 * that you want to retrieve.
 * @returns The function `getPostById` returns a Promise that resolves to either a `Post` object if a
 * post with the specified `id` is found, or `null` if no post is found with that `id`.
 */
export const getPostById = (id: string): Post | null => {
	const { posts } = getJSON();

	const post: Post | undefined = posts.find((post: Post) => post.id === id);

	if (post === undefined) return null;

	const fileContents = fs.readFileSync(post.path, "utf-8");
	const { content } = matter(fileContents);

	// const contentHtml = marked.parse(content, { async: false });
	// post.attributes.content = contentHtml;


	post.attributes.content = content;

	return post;
}


/**
 * The function getAllPosts retrieves all posts asynchronously and returns them as an array.
 * @returns An array of Post objects is being returned.
 */
export const getAllPosts = (): Post[] => {
	const { posts } = getJSON();
	const allPosts: Post[] = [];

	posts.map(async (post: Post) => {
		const awaitedPost = getPostById(post.id)

		allPosts[allPosts.length] = awaitedPost!;
	});

	return allPosts;
}


/**
 * The function `getAllCategories` returns an array of Category objects obtained from a JSON data
 * source.
 * @returns The function `getAllCategories` returns an array of `Category` objects.
 */
export const getAllCategories = (): Category[] => {
	const { categories } = getJSON();

	return categories;
}


/**
 * The function `getPostsByCategory` filters all posts by a specific category.
 * @param {Category} category - The `category` parameter is a variable representing the category of
 * posts that you want to filter by. It is of type `Category`.
 * @returns The function `getPostsByCategory` is returning an array of posts filtered by the specified
 * category.
 */
export const getPostsByCategory = (category: Category) => {
	return getAllPosts().filter((post: Post) => post.attributes.categories.includes(category));
}
