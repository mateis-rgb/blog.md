import { getAllPosts, getPostById, scanPosts } from "@/app/lib/posts"

import AdminClient from "./AdminClient";

const AdminPage = async () => {
	const posts = getAllPosts();

	return <AdminClient posts={posts} />;
}

export default AdminPage;
