import { getAllCategories, getAllPosts } from "./lib/posts";
import HomeClient from "./HomeClient";

export const dynamic = "force-static";

const Home = () => {
	const allPosts = getAllPosts();
	const allCategories = getAllCategories();

	return <HomeClient allPosts={allPosts} allCategories={allCategories} />
}


export default Home;
