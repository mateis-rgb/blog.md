import DisplayArticle from "@/app/components/DisplayArticle";
import { getPostsByCategory } from "@/app/lib/posts"
import Link from "next/link";

const CategoryPage = async ({ params }: { params: Promise<{ category: string }> }) => {
	const resolvedParams = await params;
	const posts = await getPostsByCategory(decodeURIComponent(resolvedParams.category));

	return (
		<section className="p-6">
			<h1 className="text-3xl font-bold mb-4">Articles dans "{await resolvedParams.category}"</h1>
			
			{posts.length === 0 ? (
				<p className="mt-4 text-gray-500">Aucun article dans cette catégorie.</p>
			) : (
				<DisplayArticle posts={posts} />
			)}
		</section>
	  );
}

export default CategoryPage;