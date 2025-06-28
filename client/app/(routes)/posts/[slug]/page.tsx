import { notFound } from "next/navigation"
import { getPostById } from "@/app/lib/posts"

import { Post } from "@/app/types"
import PostClient from "./PostClient"

const PostPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
	const resolvedParams = await params;

	if (!resolvedParams.slug) {
		return <p>[ERROR]: Something went wrong.</p>
	}

	const post: Post | null = getPostById(resolvedParams.slug);

	if (!post) {
		notFound();
	}

	return <PostClient post={post} />;
}

export default PostPage;