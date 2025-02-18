import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(path.resolve(), "app/content/posts");

export const getAllPosts = () => {
	const filenames = fs.readdirSync(postsDirectory);

	return filenames.map((filename) => {
		const filePath = path.join(postsDirectory, filename);
		const fileContents = fs.readFileSync(filePath, "utf-8");
		const { data } = matter(fileContents);

		return {
			slug: filename.replace(".md", ""),
			...data,
		};
	});
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
