import { notFound } from "next/navigation"
import { getPostById } from "@/app/lib/posts"

import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import CodeBlock from "@/app/components/CodeBlock"
import Link from "next/link"
import { Post } from "@/app/types"
import Button from "@/app/components/Button"
import { HiOutlineDownload } from "react-icons/hi"
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