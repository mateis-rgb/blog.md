import { DisplayArticleProps } from "../types";

import Link from "next/link";

const DisplayArticle: React.FC<DisplayArticleProps> = ({ posts }) => {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
			{posts.map((post: any) => (
				<div key={post.slug} className="border rounded-lg shadow-sm bg-white hover:shadow-md transition">						
					<div className="p-6">
						<h2 className="text-xl font-semibold text-gray-800 mb-2">{post.title}</h2>
						
						<p className="text-gray-600">{post.description}</p>

						<div className="mt-2 mb-4">
							{post.categories.map((category: string) => (
								<Link key={category} href={`/categories/${category}`} className="mr-2 text-sm text-blue-500 hover:underline">
									#{category}
								</Link>
							))}
						</div>
						
						<Link href={`/posts/${post.slug}`} className="text-blue-600 hover:text-blue-800 font-medium">
							Lire l'article
						</Link>
					</div>
				</div>
			))}
		</div>
	);
}

export default DisplayArticle;