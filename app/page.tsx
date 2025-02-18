import { getAllPosts } from "./lib/posts";

import Link from "next/link"

const Home = () => {
	const posts = getAllPosts();

	return (
		<div className="p-6">
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{posts.map((post: any) => (
					<div key={post.slug} className="bg-white shadow-2xl rounded-lg overflow-hidden">						
						<div className="p-6">
							<h2 className="text-xl font-semibold text-gray-800 mb-2">{post.title}</h2>
							
							<p className="text-gray-600 mb-4">{post.description}</p>
							
							<Link href={`/posts/${post.slug}`} className="text-blue-600 hover:text-blue-800 font-medium">
								Lire l'article
							</Link>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}


export default Home;
