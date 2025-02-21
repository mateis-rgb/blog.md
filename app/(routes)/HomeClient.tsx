"use client"

import { KeyboardEvent, useState } from "react"
import { Category, HomeClientProps, Option, Post, Sort } from "@/app/types"

import { IoSearch } from "react-icons/io5"
import DisplayArticle from "@/app/components/DisplayArticle"
import Button from "@/app/components/Button"
import Input from "@/app/components/Input"
import Select from "@/app/components/Select"

const HomeClient: React.FC<HomeClientProps> = ({ allPosts, allCategories }) => {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("default");
	const [sortOrder, setSortOrder] = useState<Sort>("recent");
	
	const [isSorted, setIsSorted] = useState(false);
	const [posts, setPosts] = useState<Post[]>(allPosts);

	const [isLoading, setIsLoading] = useState(false);


	const sortOrderOptions: Option<Sort>[] = [
		{ label: "Plus ancien", value: "ancient" },
		{ label: "Plus récent", value: "recent" }
	];

	const sortCategoryOptions: Option<string>[] = [];

	allCategories.forEach((category: Category) => {
		sortCategoryOptions.push({ label: category, value: category })
	});

	const handleUpdate = () => {
		setIsLoading(true);

		if (selectedCategory === "default" && searchTerm === "" && sortOrder === "default") {
			setIsSorted(false);

			setPosts(allPosts);
		}
		else {
			setIsSorted(true);
			
			const filteredPosts = allPosts
				.filter((post: Post) => {
					return post.attributes.title.toLowerCase().includes(searchTerm.toLowerCase()) && (selectedCategory === "default" || post.attributes.categories.includes(selectedCategory))
				})
				.sort((a: Post, b: Post) => sortOrder === "recent"
				? new Date(b.attributes.date).getTime() - new Date(a.attributes.date).getTime()
				: new Date(a.attributes.date).getTime() - new Date(b.attributes.date).getTime()
			);
			
			setPosts(filteredPosts);
		}

		setIsLoading(false);
	}

	const handleKeyUp = (e: KeyboardEvent) => {
		if (e.key === "Enter") {
			handleUpdate()
		}
	}

	return (
		<div className="p-6">
			{/* 🔍 Barre de recherche */}
			<Input
				id="search"
				type="text"
				placeholder="Rechercher un article..."
				onChange={(e) => setSearchTerm(e.target.value)}
				className="w-full p-2 border rounded-md mb-4"
				onKeyUp={handleKeyUp}
				disabled={isLoading}
			/>

			{/* 🏷️ Filtres */}
			<div className="flex flex-wrap gap-4 mb-6">
				{/* Sélection des catégories */}
				<Select
					defaultValue="Toutes les catégories"
					options={sortCategoryOptions}
					onChange={(e) => setSelectedCategory(e.target.value)}
					disabled={isLoading}
				/>


				{/* Tri par date */}
				<Select 
					onChange={(e) => setSortOrder(e.target.value as Sort)} 
					options={sortOrderOptions} 
					defaultValue="Pas de tri" 
					disabled={isLoading}
				/>

				<Button 
					loading={isLoading} 
					className="ml-auto" 
					onClick={handleUpdate} 
					icon={IoSearch}
				>Rechercher</Button>
			</div>
			{isLoading ? (
				<div className="flex justify-center items-center h-32">
					<div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
				</div>
			) : (
				<>
					{ isSorted && (<p className="text-gray-500 mb-4">{posts.length} article(s) trouvé(s)</p>) }
				
					<DisplayArticle posts={posts} />
				</>
			)}
		</div>
	);
}


export default HomeClient;
