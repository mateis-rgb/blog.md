import Link from "next/link";
import { getAllCategories, getPostsByCategory } from "@/app/lib/posts"

const CategoriesPage = () => {
	const categories = getAllCategories();

	return (
		<section className="p-6">
			<h1 className="text-3xl font-bold mb-6">Tous les articles</h1>

			<div className="grid grid-cols-2 gap-4">

				<div className="grid grid-cols-1 gap-4">
					{categories.map((category) => {
						const postCount = getPostsByCategory(category).length;

						return (
							<Link key={category} href={`/categories/${category}`} className="group">
								<div className="p-4 border rounded-lg shadow-sm bg-white hover:shadow-md transition">
									<h2 className="text-xl font-semibold group-hover:text-blue-600">
										{category}
									</h2>
									
									<p className="text-gray-500 text-sm">{postCount} article(s)</p>
								</div>
							</Link>
						);
					})}
				</div>
			</div>
		</section>
	);
}

export default CategoriesPage;