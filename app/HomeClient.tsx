"use client"

import { ChangeEventHandler, useState } from "react";

import Link from "next/link"
import { IoSearch } from "react-icons/io5"
import DisplayArticle from "./components/DisplayArticle";

type Sort = "recent" | "ancient";

interface HomeClientProps {
	allPosts: any;
	allCategories: any;
}

const HomeClient: React.FC<HomeClientProps> = ({ allPosts, allCategories }) => {
	const [sortedPosts, setSortedPost] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("Toutes");
	const [sortOrder, setSortOrder] = useState<Sort>("recent");

	const handleUpdate = (e: any) => {
		const filteredPosts = allPosts
			.filter((post: any) => {
				return post.title.toLowerCase().includes(searchTerm.toLowerCase()) && (selectedCategory === "Toutes" || post.categories.includes(selectedCategory))
			})
			.sort((a: any, b: any) => sortOrder === "recent"
				? new Date(b.date).getTime() - new Date(a.date).getTime()
				: new Date(a.date).getTime() - new Date(b.date).getTime()
		);

		console.log(filteredPosts);

		setSortedPost(filteredPosts);
	}

	return (
		<div className="p-6">
			{/* 🔍 Barre de recherche */}
			<input
				type="text"
				placeholder="Rechercher un article..."
				onChange={(e) => setSearchTerm(e.target.value)}
				className="w-full p-2 border rounded-md mb-4"
			/>

			{/* 🏷️ Filtres */}
			<div className="flex flex-wrap gap-4 mb-6">
				{/* Sélection des catégories */}
				<select
					value={selectedCategory}
					onKeyUp={(e) => e.key === "Enter" ? handleUpdate : "" }
					onChange={(e) => setSelectedCategory(e.target.value)}
					className="p-2 border rounded-md"
				>
					<option value="Toutes">Toutes les catégories</option>
					
					{allCategories.map((category: any) => (
						<option key={category} value={category}>{category}</option>
					))}
				</select>

				{/* Tri par date */}
				<select
					value={sortOrder}
					onChange={(e) => setSortOrder(e.target.value as Sort)}
					className="p-2 border rounded-md"
				>
					<option value={"recent" as Sort}>Plus récent</option>
					<option value={"ancient" as Sort}>Plus ancien</option>
				</select>

				<button 
					className="flex items-center justify-center p-2 border rounded-md ml-auto text-white bg-blue-500 hover:bg-blue-600 transition" 
					onClick={handleUpdate}
				>
					<IoSearch className="text-white mr-2" />
					Rechercher
				</button>
			</div>

			{ sortedPosts.length === 0 ? (
				<DisplayArticle posts={allPosts} />
			) : (
				<>
					<p className="text-gray-500 mb-4">{sortedPosts.length} article(s) trouvé(s)</p>
					
					<DisplayArticle posts={sortedPosts} />
				</>
			) }
		</div>
	);
}


export default HomeClient;
