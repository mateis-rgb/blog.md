import { getPost } from "../../lib/posts";

const PostPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
	const resolvedParams = await params;

	const post: any = await getPost(resolvedParams.slug);

	if (!resolvedParams.slug) {
		return <p>[ERROR]: Something went wrong.</p>
	}

	return (
		<article className="p-6">
			<h1 className="text-3xl font-bold">{post.title}</h1>
			<p className="text-gray-500">{post.date}</p>
			<div className="mt-4 prose" dangerouslySetInnerHTML={{ __html: post.content }} />
		</article>
	);
}

export default PostPage;