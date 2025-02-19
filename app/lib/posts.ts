import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"

export const dynamic = "force-static";

const postsDirectory = path.join(path.resolve(), "app/content/posts");

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
