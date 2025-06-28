export type Category = string;

export type PostAttribute = {
	title: string;
	date: string;
	categories: Category[];
	description: string;
	content?: string;
}

export type Post = {
	id: string;
	path: string
	attributes: PostAttribute;
}

export type postJSONFile = {
	categories: Category[];
	posts: Post[];
}

export type EnvKey = "ADMIN_USERNAME" | "ADMIN_PASSWORD" | "HASH_SECRET";

export type EnvRow = { 
	key: EnvKey; 
	value: string; 
}