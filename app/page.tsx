import { getAllPosts } from "./lib/posts";

import Link from "next/link"

const Home = () => {
	const posts = getAllPosts();

	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold">Blog</h1>

			<ul className="mt-4">
				{posts.map((post: any) => (
					<li key={post.slug} className="mt-2">
						<Link href={`/posts/${post.slug}`} className="text-blue-500 hover:underline">
							{post.title}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}


export default Home;
