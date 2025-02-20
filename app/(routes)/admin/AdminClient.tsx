"use client"

import { useState } from "react"
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { redirect } from "next/navigation";

import ReactMarkdown from "react-markdown"
import CodeBlock from "@/app/components/CodeBlock";

interface AdminClientProps {
	posts: any[]
}

const AdminClient: React.FC<AdminClientProps> = ({ posts }) => {
	const [post, setPost] = useState<any>(null);

	const showPost = (target: any, show: boolean) => {
		if (show === true) setPost(target);
		if (show === false) setPost(null);
	}

	const handleEdit = (post: any) => {
		localStorage.setItem("draftTitle", post.title);
		localStorage.setItem("draftContent", post.content);
		localStorage.setItem("draftDescription", post.description);

		redirect(`/admin/edit/${post.slug}`);
	}

	return (
		<section className="p-6">
			<h1 className="text-3xl font-bold mb-6">Tous les articles</h1>

			<div className="grid grid-cols-3 gap-4">
				<div className="grid grid-cols-1 gap-4">
					{posts.map((post) => {
						return (
							<div 
								onMouseEnter={() => showPost(post, true)} 
								onMouseLeave={() => showPost(post, false)} 
								key={post.slug} 
								onClick={() => handleEdit(post)}
								className="p-4 h-fit cursor-pointer border rounded-lg shadow-sm bg-white hover:shadow-md transition"
							>
								<h2 className="text-xl font-semibold group-hover:text-blue-600">
									{post.title}
								</h2>
							</div>
						);
					})}
				</div>

				{post === null ? ("") : (
					<div className="col-span-2">
						<div className="w-full h-96 p-4 border rounded-md overflow-auto bg-gray-50 dark:bg-gray-800 transition-all">
							<h2 className="text-lg font-semibold">📜 Aperçu</h2>

							<hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />

							<ReactMarkdown
								className="prose dark:prose-invert"
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
				)}
			</div>
		</section>
	);
}

export default AdminClient;