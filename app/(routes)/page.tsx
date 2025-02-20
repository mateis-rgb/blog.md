import { getAllCategories, getAllPosts } from "@/app/lib/posts";
import HomeClient from "@/app/(routes)/HomeClient";

export const dynamic = "force-static";

const Home = () => {
	const allPosts = getAllPosts();
	const allCategories = getAllCategories();

	return <HomeClient allPosts={allPosts} allCategories={allCategories} />
}


export default Home;
