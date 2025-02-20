import { getAllPosts, scanPosts } from "@/app/lib/posts"

import AdminClient from "./AdminClient";

const AdminPage = () => {
	const posts = getAllPosts();

	const scanPost: boolean = scanPosts();
	
	return <AdminClient posts={posts} />;
}

export default AdminPage;
