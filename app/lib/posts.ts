import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"
import { Post, PostAttribute, postJSONFile } from "../types"
import { v4 as uuid } from "uuid";

export const dynamic = "force-static";

const postsDirectory = path.join(path.resolve(), "app/content/posts");
const JSONFilePath = path.join(path.resolve(), "app/content/posts.json");

/**
 * Read posts folder and write & format all in a json address file
 */
export const scanPosts = (): boolean => {
	const filenames: string[] = fs.readdirSync(postsDirectory);
	const allPostsJSONed: string = fs.readFileSync(JSONFilePath, "utf-8");

	let allPosts: postJSONFile = allPostsJSONed.length === 0 ? { categories: [], posts: [] } : JSON.parse(allPostsJSONed);

	const newAllPosts: postJSONFile = {
		categories: allPosts.categories,
		posts: allPosts.posts
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

export const getAllPosts = () => {
	const filenames = fs.readdirSync(postsDirectory);

	return filenames.map((filename) => {
		const filePath = path.join(postsDirectory, filename);
		const fileContents = fs.readFileSync(filePath, "utf-8");
		const { data, content } = matter(fileContents);

		return {
			slug: filename.replace(".md", ""),
			title: data.title || "Sans titre",
			date: data.date ? new Date(data.date).toISOString().split("T")[0] : "Date inconnue",
			categories: data.categories || [],
			description: data.description || "Article sans description",
			content
		};
	});
}


export const getAllCategories = (): string[] => {
	const post = getAllPosts();
	const categories = new Set<string>();

	post.forEach((post: any) => {
		post.categories.forEach((category: string) => {
			categories.add(category);
		});
	});

	return Array.from(categories);
}


export const getPostsByCategory = (category: string) => {
	return getAllPosts().filter((post: any) => post.categories.includes(category));
}


export const getPost = async (slug: string) => {
	const filePath = path.join(postsDirectory, `${slug}.md`);
	const fileContents = fs.readFileSync(filePath, "utf-8");
	const { data, content } = matter(fileContents);

	const processedContent = await remark().use(html).process(content);
	const contentHtml = processedContent.toString();

	return { 
		slug, 
		...data, 
		content: contentHtml 
	};
}
