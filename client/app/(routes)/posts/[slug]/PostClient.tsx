"use client"

import { Post } from "@/app/types"
import rehypeRaw from "rehype-raw"
import remarkGfm from "remark-gfm"

import Link from "next/link"
import { HiOutlineDownload } from "react-icons/hi"
import ReactMarkdown from "react-markdown"
import Button from "@/app/components/Button"
import CodeBlock from "@/app/components/CodeBlock"

interface PostClientProps {
	post: Post;
}

const PostClient: React.FC<PostClientProps> = ({ post }) => {
	const handleDownload = () => {
		const blob = new Blob([
			`---\ntitle: "${post.attributes.title}"\ndescription: "${post.attributes.description}"\ndate: "${new Date(post.attributes.date).toISOString()}"\n---\n\n${post.attributes.content}`,
		], { 
			type: "text/markdown"
		});

		const link = document.createElement("a");

		link.href = URL.createObjectURL(blob);
		link.download = `${post.attributes.title.replace(/\s+/g, "-").toLowerCase()}.md`;
		link.click();
	}

	return (
		<div className="max-w-4xl mx-auto px-4 py-8">
			<div className="grid grid-cols-4">
				<div className="col-span-3">
					<h1 className="text-3xl font-bold text-gray-800 dark:text-white">{post.attributes.title}</h1>
					
					<p className="text-gray-500 dark:text-gray-400 text-sm mb-2">{ post.attributes.description }</p>

					<p className="text-gray-500 dark:text-gray-400 text-sm">{ new Date(post.attributes.date).toLocaleDateString() }</p>

					{/* 🔹 Affichage des catégories */}
					<div className="mt-2 mb-8">
						{post.attributes.categories.map((category: string) => (
							<Link key={category} href={`/categories/${category}`} className="mr-2 text-sm text-blue-500 hover:underline">
								#{category}
							</Link>
						))}
					</div>
				</div>

				<Button 
					className="w-fit h-fit"
					onClick={handleDownload}
					icon={HiOutlineDownload}
				>Télécharger l'article</Button>
			</div>


			<hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />

			<div className="prose max-w-none dark:text-white">
				<ReactMarkdown
					children={post.attributes.content}
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

export default PostClient;