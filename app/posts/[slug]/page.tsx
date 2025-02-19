import { notFound } from "next/navigation"
import { getPost } from "../../lib/posts"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import CodeBlock from "@/app/components/CodeBlock"
import Link from "next/link"

const PostPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
	const resolvedParams = await params;
	
	if (!resolvedParams.slug) {
		return <p>[ERROR]: Something went wrong.</p>
	}

	const post: any = await getPost(resolvedParams.slug);

	if (!post) {
		notFound();
	}

	return (
		<div className="max-w-4xl mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold text-gray-800 mb-4">{post.title}</h1>
			
			<p className="text-gray-500 text-sm">{ new Date(post.date).toLocaleDateString() }</p>

			{/* 🔹 Affichage des catégories */}
			<div className="mt-2 mb-8">
				{post.categories.map((category: string) => (
					<Link key={category} href={`/categories/${category}`} className="mr-2 text-sm text-blue-500 hover:underline">
						#{category}
					</Link>
				))}
			</div>

			<div className="prose max-w-none">
				<ReactMarkdown
					children={post.content}
					remarkPlugins={[remarkGfm]}
					rehypePlugins={[rehypeRaw]}
					components={{
						code({ node, className, children, ...props }) {
							const language = className?.replace(/language-/, "") || "plaintext";

							return (
								<CodeBlock language={language} value={String(children)} {...props} />
							);
						},
					}}
				/>
			</div>
		</div>
	);
}

export default PostPage;