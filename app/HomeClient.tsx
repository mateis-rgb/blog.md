"use client"

import { useState } from "react"
import { HomeClientProps, Option, Sort } from "./types"

import { IoSearch } from "react-icons/io5"
import DisplayArticle from "./components/DisplayArticle"
import { motion } from "framer-motion"
import Button from "./components/Button"
import Input from "./components/Input"
import Select from "./components/Select"

const HomeClient: React.FC<HomeClientProps> = ({ allPosts, allCategories }) => {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("default");
	const [sortOrder, setSortOrder] = useState<Sort>("recent");
	
	const [isSorted, setIsSorted] = useState(false);
	const [posts, setPosts] = useState(allPosts);

	const [isLoading, setIsLoading] = useState(false);


	const sortOrderOptions: Option<Sort>[] = [
		{ label: "Plus ancien", value: "ancient" },
		{ label: "Plus récent", value: "recent" }
	];

	const sortCategoryOptions: Option<string>[] = [];

	allCategories.forEach((category: any) => {
		sortCategoryOptions.push({ label: category, value: category })
	});

	const handleUpdate = (e: any) => {
		setIsLoading(true);

		if (selectedCategory === "default" && searchTerm === "" && sortOrder === "default") {
			setIsSorted(false);

			setPosts(allPosts);
		}
		else {
			setIsSorted(true);
			
			const filteredPosts = allPosts
				.filter((post: any) => {
					return post.title.toLowerCase().includes(searchTerm.toLowerCase()) && (selectedCategory === "default" || post.categories.includes(selectedCategory))
				})
				.sort((a: any, b: any) => sortOrder === "recent"
				? new Date(b.date).getTime() - new Date(a.date).getTime()
				: new Date(a.date).getTime() - new Date(b.date).getTime()
			);
			
			setPosts(filteredPosts);
		}

		setIsLoading(false);
	}

	return (
		<div className="p-6">
			{/* 🔍 Barre de recherche */}
			<Input
				type="text"
				placeholder="Rechercher un article..."
				onChange={(e) => setSearchTerm(e.target.value)}
				className="w-full p-2 border rounded-md mb-4"
				onKeyUp={(e) => e.key === "Enter" ? handleUpdate : "" }
			/>

			{/* 🏷️ Filtres */}
			<div className="flex flex-wrap gap-4 mb-6">
				{/* Sélection des catégories */}
				<Select
					defaultValue="Toutes les catégories"
					options={sortCategoryOptions}
					onChange={(e) => setSelectedCategory(e.target.value)}
				/>


				{/* Tri par date */}
				<Select 
					onChange={(e) => setSortOrder(e.target.value as Sort)} 
					options={sortOrderOptions} 
					defaultValue="Pas de tri" 
				/>

				<Button 
					loading={isLoading} 
					className="ml-auto" 
					onClick={handleUpdate} 
					icon={IoSearch}
				>Rechercher</Button>
			</div>

			{ isSorted && (<p className="text-gray-500 mb-4">{posts.length} article(s) trouvé(s)</p>) }
			
			<DisplayArticle posts={posts} />
		</div>
	);
}


export default HomeClient;
